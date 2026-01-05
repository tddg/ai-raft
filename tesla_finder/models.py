"""
Data models for Tesla Model Y listings.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional


@dataclass
class CarListing:
    """Represents a single car listing from any source."""

    # Required fields
    title: str
    price: int
    mileage: int
    year: int
    source: str
    url: str

    # Optional fields
    trim: Optional[str] = None
    color: Optional[str] = None
    location: Optional[str] = None
    dealer_name: Optional[str] = None
    vin: Optional[str] = None
    image_url: Optional[str] = None

    # Computed fields
    deal_score: float = field(default=0.0)
    fetched_at: datetime = field(default_factory=datetime.now)

    def __post_init__(self):
        """Calculate deal score after initialization."""
        self.deal_score = self.calculate_deal_score()

    def calculate_deal_score(self) -> float:
        """
        Calculate a deal score based on price and mileage.

        Higher scores indicate better deals.
        Score is based on:
        - Price per mile (lower is better)
        - Age-adjusted mileage (lower than expected is better)
        - Overall price relative to typical market prices

        Returns:
            float: Deal score from 0-100
        """
        # Baseline assumptions for Tesla Model Y
        avg_price_per_year = {
            2022: 38000,
            2023: 42000,
            2024: 46000,
            2025: 50000,
        }

        # Expected mileage per year (avg 12,000 miles/year)
        current_year = datetime.now().year
        expected_mileage = (current_year - self.year + 1) * 12000

        # Price score (0-50 points): how much below market price
        expected_price = avg_price_per_year.get(self.year, 40000)
        price_ratio = self.price / expected_price
        price_score = max(0, min(50, (1.5 - price_ratio) * 50))

        # Mileage score (0-50 points): how much below expected mileage
        mileage_ratio = self.mileage / max(expected_mileage, 1)
        mileage_score = max(0, min(50, (1.5 - mileage_ratio) * 50))

        return round(price_score + mileage_score, 1)

    def to_dict(self) -> dict:
        """Convert listing to dictionary for JSON serialization."""
        return {
            "title": self.title,
            "price": self.price,
            "mileage": self.mileage,
            "year": self.year,
            "trim": self.trim,
            "color": self.color,
            "location": self.location,
            "dealer_name": self.dealer_name,
            "source": self.source,
            "url": self.url,
            "vin": self.vin,
            "image_url": self.image_url,
            "deal_score": self.deal_score,
            "fetched_at": self.fetched_at.isoformat(),
        }

    def __str__(self) -> str:
        return f"{self.year} Tesla Model Y - ${self.price:,} - {self.mileage:,} miles"


@dataclass
class SearchConfig:
    """Configuration for a Tesla Model Y search."""

    min_year: int = 2022
    max_year: int = 2025
    max_price: int = 50000
    min_price: int = 0
    max_mileage: int = 50000
    min_mileage: int = 0
    zip_code: str = "90210"  # Default to Beverly Hills for demo
    search_radius: int = 100  # miles
    limit_per_source: int = 20

    def validate(self) -> bool:
        """Validate search configuration."""
        if self.min_year > self.max_year:
            raise ValueError("min_year cannot be greater than max_year")
        if self.min_price > self.max_price:
            raise ValueError("min_price cannot be greater than max_price")
        if self.min_mileage > self.max_mileage:
            raise ValueError("min_mileage cannot be greater than max_mileage")
        if not (2018 <= self.min_year <= 2026):
            raise ValueError("min_year must be between 2018 and 2026")
        if not (2018 <= self.max_year <= 2026):
            raise ValueError("max_year must be between 2018 and 2026")
        return True
