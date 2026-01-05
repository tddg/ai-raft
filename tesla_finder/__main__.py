"""
CLI entry point for Tesla Model Y finder.
"""

import argparse
import logging
import sys

from rich.console import Console
from rich.logging import RichHandler

from .models import SearchConfig
from .output import OutputFormatter
from .search import TeslaFinder
from .sources import SOURCES


def setup_logging(verbose: bool = False) -> None:
    """Set up logging configuration."""
    level = logging.DEBUG if verbose else logging.WARNING
    logging.basicConfig(
        level=level,
        format="%(message)s",
        handlers=[RichHandler(rich_tracebacks=True, show_path=False)],
    )


def parse_args() -> argparse.Namespace:
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description="Find great deals on used Tesla Model Y vehicles (2022-2025)",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  python -m tesla_finder
  python -m tesla_finder --max-price 40000 --max-mileage 30000
  python -m tesla_finder --min-year 2023 --sources cargurus,carvana
  python -m tesla_finder --output results.json --top 10
        """,
    )

    # Year filters
    parser.add_argument(
        "--min-year",
        type=int,
        default=2022,
        help="Minimum model year (default: 2022)",
    )
    parser.add_argument(
        "--max-year",
        type=int,
        default=2025,
        help="Maximum model year (default: 2025)",
    )

    # Price filters
    parser.add_argument(
        "--min-price",
        type=int,
        default=0,
        help="Minimum price in USD (default: 0)",
    )
    parser.add_argument(
        "--max-price",
        type=int,
        default=50000,
        help="Maximum price in USD (default: 50000)",
    )

    # Mileage filters
    parser.add_argument(
        "--min-mileage",
        type=int,
        default=0,
        help="Minimum mileage (default: 0)",
    )
    parser.add_argument(
        "--max-mileage",
        type=int,
        default=50000,
        help="Maximum mileage (default: 50000)",
    )

    # Location
    parser.add_argument(
        "--zip",
        type=str,
        default="90210",
        help="ZIP code for location-based search (default: 90210)",
    )
    parser.add_argument(
        "--radius",
        type=int,
        default=100,
        help="Search radius in miles (default: 100)",
    )

    # Sources
    parser.add_argument(
        "--sources",
        type=str,
        default=None,
        help=f"Comma-separated list of sources (available: {', '.join(SOURCES.keys())})",
    )

    # Output options
    parser.add_argument(
        "--output",
        "-o",
        type=str,
        default=None,
        help="Output file path for JSON results",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=20,
        help="Maximum results per source (default: 20)",
    )
    parser.add_argument(
        "--top",
        type=int,
        default=5,
        help="Number of top deals to show in detail (default: 5)",
    )

    # Sorting
    parser.add_argument(
        "--sort",
        type=str,
        choices=["score", "price", "mileage", "year"],
        default="score",
        help="Sort results by (default: score)",
    )
    parser.add_argument(
        "--desc",
        action="store_true",
        help="Sort in descending order",
    )

    # Other options
    parser.add_argument(
        "--verbose",
        "-v",
        action="store_true",
        help="Enable verbose logging",
    )
    parser.add_argument(
        "--no-stats",
        action="store_true",
        help="Don't show summary statistics",
    )
    parser.add_argument(
        "--list-sources",
        action="store_true",
        help="List available sources and exit",
    )

    return parser.parse_args()


def main() -> int:
    """Main entry point for the CLI."""
    args = parse_args()
    console = Console()

    # Handle --list-sources
    if args.list_sources:
        console.print("\n[bold]Available Sources:[/bold]")
        for name in SOURCES.keys():
            console.print(f"  - {name}")
        console.print()
        return 0

    setup_logging(args.verbose)

    # Parse sources
    sources = None
    if args.sources:
        sources = [s.strip().lower() for s in args.sources.split(",")]
        invalid_sources = [s for s in sources if s not in SOURCES]
        if invalid_sources:
            console.print(
                f"[red]Error: Invalid sources: {', '.join(invalid_sources)}[/red]"
            )
            console.print(f"[dim]Available: {', '.join(SOURCES.keys())}[/dim]")
            return 1

    # Create search configuration
    try:
        config = SearchConfig(
            min_year=args.min_year,
            max_year=args.max_year,
            min_price=args.min_price,
            max_price=args.max_price,
            min_mileage=args.min_mileage,
            max_mileage=args.max_mileage,
            zip_code=args.zip,
            search_radius=args.radius,
            limit_per_source=args.limit,
        )
        config.validate()
    except ValueError as e:
        console.print(f"[red]Configuration error: {e}[/red]")
        return 1

    # Print header
    console.print(
        "\n[bold blue]Tesla Model Y Finder[/bold blue] "
        "[dim]- Finding great deals on used Tesla Model Y vehicles[/dim]\n"
    )

    # Print search parameters
    console.print(
        f"[dim]Search Parameters: "
        f"Years {config.min_year}-{config.max_year}, "
        f"Price ${config.min_price:,}-${config.max_price:,}, "
        f"Mileage {config.min_mileage:,}-{config.max_mileage:,} mi, "
        f"ZIP {config.zip_code}, Radius {config.search_radius} mi[/dim]\n"
    )

    # Initialize finder and formatter
    finder = TeslaFinder(sources=sources)
    formatter = OutputFormatter()

    # Print sources being searched
    formatter.print_sources_info(finder.source_names)

    # Perform search
    console.print("[yellow]Searching for listings...[/yellow]\n")

    try:
        listings = finder.search(config)
    except Exception as e:
        console.print(f"[red]Search error: {e}[/red]")
        return 1

    if not listings:
        console.print(
            "[yellow]No listings found. Try adjusting your search criteria.[/yellow]"
        )
        return 0

    # Sort results
    if args.sort == "score":
        listings = finder.sort_by_deal_score(listings)
    elif args.sort == "price":
        listings = finder.sort_by_price(listings, ascending=not args.desc)
    elif args.sort == "mileage":
        listings = finder.sort_by_mileage(listings, ascending=not args.desc)
    elif args.sort == "year":
        listings = finder.sort_by_year(listings, ascending=args.desc)

    # Print results
    formatter.print_results(listings, show_stats=not args.no_stats)

    # Print top deals in detail
    if args.top > 0:
        formatter.print_best_deals(listings, args.top)

    # Save to file if requested
    if args.output:
        formatter.save_to_json(listings, args.output)

    return 0


if __name__ == "__main__":
    sys.exit(main())
