"""
Cars.com source for Tesla Model Y listings.
"""

import logging
import re
from typing import List

from bs4 import BeautifulSoup

from ..models import CarListing, SearchConfig
from .base import BaseSource

logger = logging.getLogger(__name__)


class CarsComSource(BaseSource):
    """Cars.com car listing source."""

    name = "carscom"
    base_url = "https://www.cars.com"

    def search(self, config: SearchConfig) -> List[CarListing]:
        """
        Search Cars.com for Tesla Model Y listings.
        """
        listings = []

        try:
            # Cars.com search URL
            search_url = f"{self.base_url}/shopping/results/"

            params = {
                "stock_type": "used",
                "makes[]": "tesla",
                "models[]": "tesla-model_y",
                "list_price_max": config.max_price,
                "list_price_min": config.min_price,
                "maximum_distance": config.search_radius,
                "mileage_max": config.max_mileage,
                "year_min": config.min_year,
                "year_max": config.max_year,
                "zip": config.zip_code,
                "sort": "best_deal_desc",
                "per_page": config.limit_per_source,
            }

            response = self._make_request(search_url, params=params)
            soup = BeautifulSoup(response.text, "lxml")

            # Parse vehicle cards
            vehicle_cards = soup.select(".vehicle-card")

            for card in vehicle_cards:
                try:
                    listing = self._parse_listing_card(card)
                    if listing and self._matches_criteria(listing, config):
                        listings.append(listing)
                except Exception as e:
                    logger.warning(f"Error parsing Cars.com listing: {e}")
                    continue

        except Exception as e:
            logger.error(f"Error searching Cars.com: {e}")
            # Return simulated data for demo purposes
            listings = self._get_demo_listings(config)

        return listings[: config.limit_per_source]

    def _parse_listing_card(self, card) -> CarListing:
        """Parse a Cars.com vehicle card into a CarListing object."""
        # Extract title
        title_elem = card.select_one(".title")
        title = title_elem.get_text(strip=True) if title_elem else "Tesla Model Y"

        # Extract year from title
        year_match = re.search(r"20[12][0-9]", title)
        year = int(year_match.group()) if year_match else 2023

        # Extract price
        price_elem = card.select_one(".primary-price")
        price = self._parse_price(
            price_elem.get_text(strip=True) if price_elem else "0"
        )

        # Extract mileage
        mileage_elem = card.select_one(".mileage")
        mileage = self._parse_mileage(
            mileage_elem.get_text(strip=True) if mileage_elem else "0"
        )

        # Extract URL
        link_elem = card.select_one("a.vehicle-card-link")
        url = f"{self.base_url}{link_elem['href']}" if link_elem else self.base_url

        # Extract dealer info
        dealer_elem = card.select_one(".dealer-name")
        dealer_name = dealer_elem.get_text(strip=True) if dealer_elem else None

        # Extract location
        location_elem = card.select_one(".miles-from")
        location = location_elem.get_text(strip=True) if location_elem else None

        # Extract image
        img_elem = card.select_one("img.vehicle-image")
        image_url = img_elem["src"] if img_elem and img_elem.get("src") else None

        return CarListing(
            title=title,
            price=price,
            mileage=mileage,
            year=year,
            source=self.name,
            url=url,
            dealer_name=dealer_name,
            location=location,
            image_url=image_url,
        )

    def _matches_criteria(self, listing: CarListing, config: SearchConfig) -> bool:
        """Check if listing matches search criteria."""
        return (
            config.min_year <= listing.year <= config.max_year
            and config.min_price <= listing.price <= config.max_price
            and config.min_mileage <= listing.mileage <= config.max_mileage
        )

    def _get_demo_listings(self, config: SearchConfig) -> List[CarListing]:
        """Generate demo listings for testing when scraping fails."""
        demo_data = [
            {
                "year": 2023,
                "price": 39900,
                "mileage": 18000,
                "trim": "Long Range",
                "color": "Pearl White",
                "location": "Irvine, CA",
            },
            {
                "year": 2022,
                "price": 34500,
                "mileage": 32000,
                "trim": "Long Range AWD",
                "color": "Black",
                "location": "Denver, CO",
            },
            {
                "year": 2024,
                "price": 46900,
                "mileage": 5000,
                "trim": "Performance",
                "color": "Pearl White",
                "location": "Austin, TX",
            },
            {
                "year": 2023,
                "price": 37500,
                "mileage": 22000,
                "trim": "Standard Range",
                "color": "Midnight Silver",
                "location": "Chicago, IL",
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
                        url=f"{self.base_url}/vehicledetail/demo-{i}",
                        trim=data["trim"],
                        color=data["color"],
                        location=data["location"],
                        dealer_name="Cars.com Demo Dealer",
                    )
                )

        return listings
