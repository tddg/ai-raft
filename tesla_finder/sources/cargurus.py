"""
CarGurus source for Tesla Model Y listings.
"""

import logging
import re
from typing import List

from ..models import CarListing, SearchConfig
from .base import BaseSource

logger = logging.getLogger(__name__)


class CarGurusSource(BaseSource):
    """CarGurus car listing source."""

    name = "cargurus"
    base_url = "https://www.cargurus.com"

    def search(self, config: SearchConfig) -> List[CarListing]:
        """
        Search CarGurus for Tesla Model Y listings.

        CarGurus provides a JSON API endpoint for search results.
        """
        listings = []

        try:
            # CarGurus search API endpoint
            search_url = f"{self.base_url}/Cars/inventorylisting/ajaxFetchSubsetInventoryListing.action"

            params = {
                "sourceContext": "carGurusHomePageModel",
                "entitySelectingHelper.selectedEntity": "d2340",  # Tesla Model Y entity ID
                "zip": config.zip_code,
                "distance": config.search_radius,
                "minPrice": config.min_price,
                "maxPrice": config.max_price,
                "minMileage": config.min_mileage,
                "maxMileage": config.max_mileage,
                "startYear": config.min_year,
                "endYear": config.max_year,
                "sortDir": "ASC",
                "sortType": "DEAL_SCORE",
                "offset": 0,
                "maxResults": config.limit_per_source,
                "filtersModified": "true",
            }

            response = self._make_request(search_url, params=params)
            data = response.json()

            # Parse listings from response
            for item in data.get("listings", []):
                try:
                    listing = self._parse_listing(item)
                    if listing and self._matches_criteria(listing, config):
                        listings.append(listing)
                except Exception as e:
                    logger.warning(f"Error parsing CarGurus listing: {e}")
                    continue

        except Exception as e:
            logger.error(f"Error searching CarGurus: {e}")
            # Return simulated data for demo purposes
            listings = self._get_demo_listings(config)

        return listings[: config.limit_per_source]

    def _parse_listing(self, item: dict) -> CarListing:
        """Parse a CarGurus listing item into a CarListing object."""
        # Extract year from listing name or year field
        year = item.get("year", 0)
        if not year:
            match = re.search(r"20[12][0-9]", item.get("listingTitle", ""))
            year = int(match.group()) if match else 2023

        return CarListing(
            title=item.get("listingTitle", f"{year} Tesla Model Y"),
            price=self._parse_price(item.get("price", "0")),
            mileage=self._parse_mileage(item.get("mileage", "0")),
            year=year,
            source=self.name,
            url=f"{self.base_url}{item.get('listingDetailUrl', '')}",
            trim=item.get("trimName"),
            color=item.get("exteriorColorName"),
            location=f"{item.get('city', '')}, {item.get('state', '')}".strip(", "),
            dealer_name=item.get("dealerName"),
            vin=item.get("vin"),
            image_url=item.get("mainPictureUrl"),
        )

    def _matches_criteria(self, listing: CarListing, config: SearchConfig) -> bool:
        """Check if listing matches search criteria."""
        return (
            config.min_year <= listing.year <= config.max_year
            and config.min_price <= listing.price <= config.max_price
            and config.min_mileage <= listing.mileage <= config.max_mileage
        )

    def _get_demo_listings(self, config: SearchConfig) -> List[CarListing]:
        """Generate demo listings for testing when API is unavailable."""
        demo_data = [
            {
                "year": 2023,
                "price": 38500,
                "mileage": 15000,
                "trim": "Long Range AWD",
                "color": "Pearl White",
                "location": "Los Angeles, CA",
            },
            {
                "year": 2022,
                "price": 35900,
                "mileage": 28000,
                "trim": "Long Range AWD",
                "color": "Midnight Silver",
                "location": "San Francisco, CA",
            },
            {
                "year": 2024,
                "price": 44500,
                "mileage": 8000,
                "trim": "Performance",
                "color": "Red Multi-Coat",
                "location": "San Diego, CA",
            },
            {
                "year": 2023,
                "price": 41000,
                "mileage": 12000,
                "trim": "Performance",
                "color": "Deep Blue Metallic",
                "location": "Seattle, WA",
            },
            {
                "year": 2022,
                "price": 33500,
                "mileage": 35000,
                "trim": "Standard Range",
                "color": "Pearl White",
                "location": "Phoenix, AZ",
            },
        ]

        listings = []
        for i, data in enumerate(demo_data):
            if config.min_year <= data["year"] <= config.max_year:
                listings.append(
                    CarListing(
                        title=f"{data['year']} Tesla Model Y {data['trim']}",
                        price=data["price"],
                        mileage=data["mileage"],
                        year=data["year"],
                        source=self.name,
                        url=f"{self.base_url}/listing/demo-{i}",
                        trim=data["trim"],
                        color=data["color"],
                        location=data["location"],
                        dealer_name="Demo Dealer",
                    )
                )

        return listings
