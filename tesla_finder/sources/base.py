"""
Base class for car listing sources.
"""

import logging
from abc import ABC, abstractmethod
from typing import List

import requests

from ..models import CarListing, SearchConfig

logger = logging.getLogger(__name__)


class BaseSource(ABC):
    """Abstract base class for car listing sources."""

    name: str = "base"
    base_url: str = ""

    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update(
            {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "application/json, text/html, */*",
                "Accept-Language": "en-US,en;q=0.9",
            }
        )

    @abstractmethod
    def search(self, config: SearchConfig) -> List[CarListing]:
        """
        Search for Tesla Model Y listings.

        Args:
            config: Search configuration parameters

        Returns:
            List of CarListing objects
        """
        pass

    def _make_request(
        self, url: str, params: dict = None, headers: dict = None
    ) -> requests.Response:
        """
        Make an HTTP request with error handling.

        Args:
            url: URL to request
            params: Query parameters
            headers: Additional headers

        Returns:
            Response object
        """
        try:
            response = self.session.get(
                url, params=params, headers=headers, timeout=30
            )
            response.raise_for_status()
            return response
        except requests.exceptions.RequestException as e:
            logger.error(f"Error fetching from {self.name}: {e}")
            raise

    def _parse_price(self, price_str: str) -> int:
        """
        Parse price string to integer.

        Args:
            price_str: Price string like "$45,000" or "45000"

        Returns:
            Integer price value
        """
        if not price_str:
            return 0
        # Remove currency symbols, commas, and whitespace
        cleaned = "".join(c for c in str(price_str) if c.isdigit())
        return int(cleaned) if cleaned else 0

    def _parse_mileage(self, mileage_str: str) -> int:
        """
        Parse mileage string to integer.

        Args:
            mileage_str: Mileage string like "25,000 miles" or "25000"

        Returns:
            Integer mileage value
        """
        if not mileage_str:
            return 0
        # Remove commas, "miles" text, and whitespace
        cleaned = "".join(c for c in str(mileage_str) if c.isdigit())
        return int(cleaned) if cleaned else 0
