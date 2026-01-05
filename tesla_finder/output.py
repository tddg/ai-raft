"""
Output formatting for Tesla Model Y finder results.
"""

import json
from typing import List

from rich.console import Console
from rich.panel import Panel
from rich.table import Table
from rich.text import Text

from .models import CarListing


class OutputFormatter:
    """Format and display Tesla Model Y search results."""

    def __init__(self):
        self.console = Console()

    def print_results(
        self,
        listings: List[CarListing],
        show_stats: bool = True,
        title: str = "Tesla Model Y Search Results",
    ) -> None:
        """
        Print search results in a formatted table.

        Args:
            listings: List of CarListing objects to display
            show_stats: Whether to show summary statistics
            title: Title for the results panel
        """
        if not listings:
            self.console.print(
                Panel("[yellow]No listings found matching your criteria.[/yellow]")
            )
            return

        # Create main results table
        table = Table(
            title=title,
            show_header=True,
            header_style="bold cyan",
            border_style="blue",
        )

        table.add_column("#", style="dim", width=3)
        table.add_column("Year", justify="center", width=6)
        table.add_column("Trim", width=20)
        table.add_column("Price", justify="right", width=10)
        table.add_column("Mileage", justify="right", width=10)
        table.add_column("Score", justify="center", width=7)
        table.add_column("Location", width=18)
        table.add_column("Source", width=10)

        for i, listing in enumerate(listings, 1):
            # Color-code deal score
            score = listing.deal_score
            if score >= 70:
                score_style = "bold green"
            elif score >= 50:
                score_style = "yellow"
            else:
                score_style = "red"

            # Format price and mileage
            price_str = f"${listing.price:,}"
            mileage_str = f"{listing.mileage:,} mi"

            table.add_row(
                str(i),
                str(listing.year),
                listing.trim or "Standard",
                price_str,
                mileage_str,
                Text(f"{score:.1f}", style=score_style),
                listing.location or "N/A",
                listing.source,
            )

        self.console.print(table)

        if show_stats:
            self._print_statistics(listings)

    def _print_statistics(self, listings: List[CarListing]) -> None:
        """Print summary statistics for the listings."""
        from .search import TeslaFinder

        stats = TeslaFinder.get_statistics(listings)

        stats_text = (
            f"[bold]Summary Statistics[/bold]\n"
            f"Total Listings: [cyan]{stats['count']}[/cyan]\n"
            f"Price Range: [green]${stats['min_price']:,}[/green] - "
            f"[red]${stats['max_price']:,}[/red] "
            f"(avg: [yellow]${stats['avg_price']:,}[/yellow])\n"
            f"Mileage Range: [green]{stats['min_mileage']:,}[/green] - "
            f"[red]{stats['max_mileage']:,}[/red] miles "
            f"(avg: [yellow]{stats['avg_mileage']:,}[/yellow])\n"
            f"Average Deal Score: [cyan]{stats['avg_deal_score']}[/cyan]/100"
        )

        self.console.print(Panel(stats_text, border_style="green"))

    def print_detailed_listing(self, listing: CarListing, index: int = 1) -> None:
        """
        Print a detailed view of a single listing.

        Args:
            listing: The CarListing to display
            index: The listing number
        """
        # Determine deal score color
        score = listing.deal_score
        if score >= 70:
            score_color = "green"
            score_label = "Great Deal!"
        elif score >= 50:
            score_color = "yellow"
            score_label = "Good Deal"
        else:
            score_color = "red"
            score_label = "Average"

        details = (
            f"[bold cyan]{listing.title}[/bold cyan]\n\n"
            f"[bold]Price:[/bold] [green]${listing.price:,}[/green]\n"
            f"[bold]Mileage:[/bold] {listing.mileage:,} miles\n"
            f"[bold]Year:[/bold] {listing.year}\n"
            f"[bold]Trim:[/bold] {listing.trim or 'N/A'}\n"
            f"[bold]Color:[/bold] {listing.color or 'N/A'}\n"
            f"[bold]Location:[/bold] {listing.location or 'N/A'}\n"
            f"[bold]Dealer:[/bold] {listing.dealer_name or 'N/A'}\n"
            f"[bold]VIN:[/bold] {listing.vin or 'N/A'}\n"
            f"[bold]Source:[/bold] {listing.source}\n\n"
            f"[bold]Deal Score:[/bold] [{score_color}]{score:.1f}/100 - {score_label}[/{score_color}]\n"
            f"[bold]URL:[/bold] [link={listing.url}]{listing.url}[/link]"
        )

        self.console.print(
            Panel(
                details,
                title=f"Listing #{index}",
                border_style=score_color,
            )
        )

    def print_best_deals(
        self, listings: List[CarListing], top_n: int = 5
    ) -> None:
        """
        Print the top N best deals with detailed information.

        Args:
            listings: List of all listings
            top_n: Number of top deals to show
        """
        from .search import TeslaFinder

        best_deals = TeslaFinder.get_best_deals(listings, top_n)

        self.console.print(
            f"\n[bold green]Top {len(best_deals)} Best Deals[/bold green]\n"
        )

        for i, listing in enumerate(best_deals, 1):
            self.print_detailed_listing(listing, i)
            self.console.print()

    def save_to_json(self, listings: List[CarListing], filepath: str) -> None:
        """
        Save listings to a JSON file.

        Args:
            listings: List of CarListing objects
            filepath: Path to output file
        """
        data = {
            "count": len(listings),
            "listings": [l.to_dict() for l in listings],
        }

        with open(filepath, "w") as f:
            json.dump(data, f, indent=2, default=str)

        self.console.print(f"[green]Results saved to {filepath}[/green]")

    def print_sources_info(self, sources: List[str]) -> None:
        """Print information about which sources will be searched."""
        source_list = ", ".join(sources)
        self.console.print(
            f"[dim]Searching sources: {source_list}[/dim]\n"
        )
