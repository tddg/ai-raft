"""
Car listing sources for Tesla Model Y search.
"""

from .base import BaseSource
from .cargurus import CarGurusSource
from .carscom import CarsComSource
from .autotrader import AutotraderSource
from .carvana import CarvanaSource

# Registry of all available sources
SOURCES = {
    "cargurus": CarGurusSource,
    "carscom": CarsComSource,
    "autotrader": AutotraderSource,
    "carvana": CarvanaSource,
}

__all__ = [
    "BaseSource",
    "CarGurusSource",
    "CarsComSource",
    "AutotraderSource",
    "CarvanaSource",
    "SOURCES",
]
