"""
Main search orchestrator for Tesla Model Y finder.
"""

import logging
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Optional

from .models import CarListing, SearchConfig
from .sources import SOURCES, BaseSource

logger = logging.getLogger(__name__)


class TeslaFinder:
    """Main class for searching Tesla Model Y listings across multiple sources."""

    def __init__(self, sources: Optional[List[str]] = None):
        """
        Initialize the Tesla finder.

        Args:
            sources: List of source names to use. If None, uses all available sources.
        """
        self.source_names = sources or list(SOURCES.keys())
        self.sources: List[BaseSource] = []

        for name in self.source_names:
            if name in SOURCES:
                self.sources.append(SOURCES[name]())
            else:
                logger.warning(f"Unknown source: {name}")

    def search(self, config: SearchConfig) -> List[CarListing]:
        """
        Search all configured sources for Tesla Model Y listings.

        Args:
            config: Search configuration parameters

        Returns:
            Combined list of CarListing objects from all sources
        """
        config.validate()

        all_listings: List[CarListing] = []

        # Search sources in parallel for speed
        with ThreadPoolExecutor(max_workers=len(self.sources)) as executor:
            future_to_source = {
                executor.submit(self._search_source, source, config): source
                for source in self.sources
            }

            for future in as_completed(future_to_source):
                source = future_to_source[future]
                try:
                    listings = future.result()
                    all_listings.extend(listings)
                    logger.info(f"Found {len(listings)} listings from {source.name}")
                except Exception as e:
                    logger.error(f"Error searching {source.name}: {e}")

        return all_listings

    def _search_source(
        self, source: BaseSource, config: SearchConfig
    ) -> List[CarListing]:
        """
        Search a single source for listings.

        Args:
            source: The source to search
            config: Search configuration

        Returns:
            List of CarListing objects from this source
        """
        try:
            return source.search(config)
        except Exception as e:
            logger.error(f"Error searching {source.name}: {e}")
            return []

    @staticmethod
    def sort_by_deal_score(listings: List[CarListing]) -> List[CarListing]:
        """Sort listings by deal score (best deals first)."""
        return sorted(listings, key=lambda x: x.deal_score, reverse=True)

    @staticmethod
    def sort_by_price(listings: List[CarListing], ascending: bool = True) -> List[CarListing]:
        """Sort listings by price."""
        return sorted(listings, key=lambda x: x.price, reverse=not ascending)

    @staticmethod
    def sort_by_mileage(listings: List[CarListing], ascending: bool = True) -> List[CarListing]:
        """Sort listings by mileage."""
        return sorted(listings, key=lambda x: x.mileage, reverse=not ascending)

    @staticmethod
    def sort_by_year(listings: List[CarListing], ascending: bool = False) -> List[CarListing]:
        """Sort listings by year (newest first by default)."""
        return sorted(listings, key=lambda x: x.year, reverse=not ascending)

    @staticmethod
    def filter_by_deal_score(
        listings: List[CarListing], min_score: float = 50.0
    ) -> List[CarListing]:
        """Filter listings to only include those with deal score above threshold."""
        return [l for l in listings if l.deal_score >= min_score]

    @staticmethod
    def get_best_deals(
        listings: List[CarListing], top_n: int = 10
    ) -> List[CarListing]:
        """Get the top N best deals based on deal score."""
        sorted_listings = TeslaFinder.sort_by_deal_score(listings)
        return sorted_listings[:top_n]

    @staticmethod
    def get_statistics(listings: List[CarListing]) -> dict:
        """
        Calculate statistics for a list of listings.

        Returns:
            Dictionary with price and mileage statistics
        """
        if not listings:
            return {
                "count": 0,
                "avg_price": 0,
                "min_price": 0,
                "max_price": 0,
                "avg_mileage": 0,
                "min_mileage": 0,
                "max_mileage": 0,
                "avg_deal_score": 0,
            }

        prices = [l.price for l in listings]
        mileages = [l.mileage for l in listings]
        scores = [l.deal_score for l in listings]

        return {
            "count": len(listings),
            "avg_price": round(sum(prices) / len(prices)),
            "min_price": min(prices),
            "max_price": max(prices),
            "avg_mileage": round(sum(mileages) / len(mileages)),
            "min_mileage": min(mileages),
            "max_mileage": max(mileages),
            "avg_deal_score": round(sum(scores) / len(scores), 1),
        }
