# Tesla Model Y Finder

A tool to find good deals on used Tesla Model Y vehicles (2022-2025) with reasonable prices and low mileage.

## Web Interface

**[View the Live Demo](https://tddg.github.io/ai-raft/)**

The web interface provides an easy way to search and filter Tesla Model Y listings directly in your browser.

## Features

### Web Interface
- Interactive search with real-time filtering
- Beautiful dark theme with responsive design
- Filter by year, price, mileage, and source
- Sort by deal score, price, mileage, or year
- Detailed listing view with all specifications
- Export results to JSON

### CLI Tool
- Searches multiple used car websites simultaneously
- Filters by year range (2022-2025)
- Sorts by price and mileage to find the best deals
- Calculates a "deal score" based on price-to-mileage ratio
- Beautiful terminal output with Rich formatting

## Supported Sources

- **Cars.com** - Major used car marketplace
- **CarGurus** - Car shopping website with dealer reviews
- **Autotrader** - Popular automotive marketplace
- **Carvana** - Online used car retailer

## Installation

```bash
# Clone the repository
git clone <repo-url>
cd ai-raft

# Install dependencies
pip install -r requirements.txt
```

## Usage

```bash
# Basic search with defaults
python -m tesla_finder

# Custom search parameters
python -m tesla_finder --min-year 2023 --max-year 2024 --max-price 45000 --max-mileage 30000

# Search specific sources only
python -m tesla_finder --sources cargurus,carvana

# Output to JSON file
python -m tesla_finder --output results.json
```

## Command Line Options

| Option | Description | Default |
|--------|-------------|---------|
| `--min-year` | Minimum model year | 2022 |
| `--max-year` | Maximum model year | 2025 |
| `--max-price` | Maximum price in USD | 50000 |
| `--max-mileage` | Maximum mileage | 50000 |
| `--sources` | Comma-separated list of sources | all |
| `--output` | Output file path (JSON format) | None |
| `--limit` | Maximum results per source | 20 |

## Deal Score

The tool calculates a "deal score" for each listing based on:
- Price relative to market average
- Mileage relative to vehicle age
- Overall value proposition

Higher scores indicate better deals.

## License

MIT License
