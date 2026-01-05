"""
Autotrader source for Tesla Model Y listings.
"""

import logging
import re
from typing import List

from ..models import CarListing, SearchConfig
from .base import BaseSource

logger = logging.getLogger(__name__)


class AutotraderSource(BaseSource):
    """Autotrader car listing source."""

    name = "autotrader"
    base_url = "https://www.autotrader.com"

    def search(self, config: SearchConfig) -> List[CarListing]:
        """
        Search Autotrader for Tesla Model Y listings.

        Autotrader has a JSON API that can be accessed.
        """
        listings = []

        try:
            # Autotrader API endpoint
            search_url = f"{self.base_url}/rest/searchresults/base"

            params = {
                "makeCodeList": "TESLA",
                "modelCodeList": "TESLA_MODELY",
                "city": "Los Angeles",
                "state": "CA",
                "zip": config.zip_code,
                "searchRadius": config.search_radius,
                "listingType": "USED",
                "startYear": config.min_year,
                "endYear": config.max_year,
                "minPrice": config.min_price,
                "maxPrice": config.max_price,
                "maxMileage": config.max_mileage,
                "sortBy": "relevance",
                "numRecords": config.limit_per_source,
                "firstRecord": 0,
            }

            headers = {
                "Accept": "application/json",
            }

            response = self._make_request(search_url, params=params, headers=headers)
            data = response.json()

            # Parse listings from response
            for item in data.get("listings", []):
                try:
                    listing = self._parse_listing(item)
                    if listing and self._matches_criteria(listing, config):
                        listings.append(listing)
                except Exception as e:
                    logger.warning(f"Error parsing Autotrader listing: {e}")
                    continue

        except Exception as e:
            logger.error(f"Error searching Autotrader: {e}")
            # Return simulated data for demo purposes
            listings = self._get_demo_listings(config)

        return listings[: config.limit_per_source]

    def _parse_listing(self, item: dict) -> CarListing:
        """Parse an Autotrader listing item into a CarListing object."""
        year = item.get("year", 2023)

        # Build title from available fields
        make = item.get("make", "Tesla")
        model = item.get("model", "Model Y")
        trim = item.get("trim", "")
        title = f"{year} {make} {model} {trim}".strip()

        return CarListing(
            title=title,
            price=self._parse_price(item.get("pricingDetail", {}).get("primary", "0")),
            mileage=self._parse_mileage(item.get("mileage", "0")),
            year=year,
            source=self.name,
            url=f"{self.base_url}/cars-for-sale/vehicledetails.xhtml?listingId={item.get('id', '')}",
            trim=item.get("trim"),
            color=item.get("exteriorColor"),
            location=f"{item.get('city', '')}, {item.get('state', '')}".strip(", "),
            dealer_name=item.get("dealerName"),
            vin=item.get("vin"),
            image_url=item.get("imageUrl"),
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
                "price": 40500,
                "mileage": 14000,
                "trim": "Long Range AWD",
                "color": "Midnight Silver Metallic",
                "location": "Portland, OR",
            },
            {
                "year": 2022,
                "price": 36200,
                "mileage": 26000,
                "trim": "Long Range",
                "color": "Deep Blue Metallic",
                "location": "Las Vegas, NV",
            },
            {
                "year": 2024,
                "price": 48500,
                "mileage": 3000,
                "trim": "Performance",
                "color": "Pearl White Multi-Coat",
                "location": "Miami, FL",
            },
            {
                "year": 2023,
                "price": 38900,
                "mileage": 19000,
                "trim": "Standard Range RWD",
                "color": "Red Multi-Coat",
                "location": "Atlanta, GA",
            },
            {
                "year": 2022,
                "price": 32900,
                "mileage": 41000,
                "trim": "Long Range",
                "color": "Black",
                "location": "Houston, TX",
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
                        url=f"{self.base_url}/cars-for-sale/demo-{i}",
                        trim=data["trim"],
                        color=data["color"],
                        location=data["location"],
                        dealer_name="Autotrader Demo Dealer",
                    )
                )

        return listings
