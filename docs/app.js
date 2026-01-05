// Tesla Model Y Finder - Web Application

// Demo listing data (simulating data from multiple sources)
const demoListings = [
    // CarGurus listings
    {
        id: 1,
        title: "2023 Tesla Model Y Long Range AWD",
        price: 38500,
        mileage: 15000,
        year: 2023,
        trim: "Long Range AWD",
        color: "Pearl White Multi-Coat",
        location: "Los Angeles, CA",
        dealer: "Tesla Certified Pre-Owned",
        source: "cargurus",
        vin: "5YJYGDEE1MF123456",
        features: ["Autopilot", "Premium Interior", "19\" Gemini Wheels"]
    },
    {
        id: 2,
        title: "2022 Tesla Model Y Long Range AWD",
        price: 35900,
        mileage: 28000,
        year: 2022,
        trim: "Long Range AWD",
        color: "Midnight Silver Metallic",
        location: "San Francisco, CA",
        dealer: "Bay Area Tesla",
        source: "cargurus",
        vin: "5YJYGDEE1LF234567",
        features: ["Autopilot", "Black Interior", "Tow Hitch"]
    },
    {
        id: 3,
        title: "2024 Tesla Model Y Performance AWD",
        price: 44500,
        mileage: 8000,
        year: 2024,
        trim: "Performance",
        color: "Red Multi-Coat",
        location: "San Diego, CA",
        dealer: "SoCal EV Motors",
        source: "cargurus",
        vin: "5YJYGDEF1RF345678",
        features: ["Full Self-Driving", "Performance Package", "21\" Überturbine Wheels"]
    },
    // Cars.com listings
    {
        id: 4,
        title: "2023 Tesla Model Y Performance",
        price: 41000,
        mileage: 12000,
        year: 2023,
        trim: "Performance",
        color: "Deep Blue Metallic",
        location: "Seattle, WA",
        dealer: "Northwest Auto Group",
        source: "carscom",
        vin: "5YJYGDEF1MF456789",
        features: ["Autopilot", "White Interior", "Performance Brakes"]
    },
    {
        id: 5,
        title: "2022 Tesla Model Y Standard Range",
        price: 33500,
        mileage: 35000,
        year: 2022,
        trim: "Standard Range RWD",
        color: "Pearl White Multi-Coat",
        location: "Phoenix, AZ",
        dealer: "Desert Sun Motors",
        source: "carscom",
        vin: "5YJYGDEE1LF567890",
        features: ["Autopilot", "Black Interior"]
    },
    {
        id: 6,
        title: "2023 Tesla Model Y Long Range",
        price: 39900,
        mileage: 18000,
        year: 2023,
        trim: "Long Range AWD",
        color: "Quicksilver",
        location: "Irvine, CA",
        dealer: "OC Tesla Center",
        source: "carscom",
        vin: "5YJYGDEE1MF678901",
        features: ["Autopilot", "Premium Audio", "Panoramic Roof"]
    },
    // Autotrader listings
    {
        id: 7,
        title: "2024 Tesla Model Y Long Range AWD",
        price: 48500,
        mileage: 3000,
        year: 2024,
        trim: "Long Range AWD",
        color: "Pearl White Multi-Coat",
        location: "Miami, FL",
        dealer: "Florida EV Dealership",
        source: "autotrader",
        vin: "5YJYGDEE1RF789012",
        features: ["Full Self-Driving Capability", "Premium Connectivity", "Matrix Headlights"]
    },
    {
        id: 8,
        title: "2023 Tesla Model Y Standard Range RWD",
        price: 36900,
        mileage: 19000,
        year: 2023,
        trim: "Standard Range RWD",
        color: "Midnight Silver Metallic",
        location: "Atlanta, GA",
        dealer: "Peach State Auto",
        source: "autotrader",
        vin: "5YJYGDEE1MF890123",
        features: ["Autopilot", "Black Interior", "18\" Aero Wheels"]
    },
    {
        id: 9,
        title: "2022 Tesla Model Y Long Range",
        price: 32900,
        mileage: 41000,
        year: 2022,
        trim: "Long Range AWD",
        color: "Black",
        location: "Houston, TX",
        dealer: "Lone Star Motors",
        source: "autotrader",
        vin: "5YJYGDEE1LF901234",
        features: ["Autopilot", "Premium Interior"]
    },
    // Carvana listings
    {
        id: 10,
        title: "2023 Tesla Model Y Long Range AWD",
        price: 41200,
        mileage: 11000,
        year: 2023,
        trim: "Long Range AWD",
        color: "Pearl White Multi-Coat",
        location: "Carvana Delivery",
        dealer: "Carvana",
        source: "carvana",
        vin: "5YJYGDEE1MF012345",
        features: ["Autopilot", "Premium Interior", "7-Day Return Policy"]
    },
    {
        id: 11,
        title: "2022 Tesla Model Y Long Range AWD",
        price: 35800,
        mileage: 29000,
        year: 2022,
        trim: "Long Range AWD",
        color: "Midnight Silver Metallic",
        location: "Carvana Delivery",
        dealer: "Carvana",
        source: "carvana",
        vin: "5YJYGDEE1LF123456",
        features: ["Autopilot", "Black Interior", "360-Point Inspection"]
    },
    {
        id: 12,
        title: "2024 Tesla Model Y Performance AWD",
        price: 47200,
        mileage: 6000,
        year: 2024,
        trim: "Performance",
        color: "Ultra Red",
        location: "Carvana Delivery",
        dealer: "Carvana",
        source: "carvana",
        vin: "5YJYGDEF1RF234567",
        features: ["Full Self-Driving", "Performance Package", "Carbon Fiber Spoiler"]
    },
    {
        id: 13,
        title: "2023 Tesla Model Y Standard Range RWD",
        price: 37500,
        mileage: 16000,
        year: 2023,
        trim: "Standard Range RWD",
        color: "Deep Blue Metallic",
        location: "Carvana Delivery",
        dealer: "Carvana",
        source: "carvana",
        vin: "5YJYGDEE1MF345678",
        features: ["Autopilot", "White Interior"]
    },
    {
        id: 14,
        title: "2022 Tesla Model Y Long Range AWD",
        price: 34200,
        mileage: 38000,
        year: 2022,
        trim: "Long Range AWD",
        color: "Deep Blue Metallic",
        location: "Carvana Delivery",
        dealer: "Carvana",
        source: "carvana",
        vin: "5YJYGDEE1LF456789",
        features: ["Autopilot", "Premium Audio"]
    },
    {
        id: 15,
        title: "2024 Tesla Model Y Long Range AWD",
        price: 44800,
        mileage: 9000,
        year: 2024,
        trim: "Long Range AWD",
        color: "Pearl White Multi-Coat",
        location: "Carvana Delivery",
        dealer: "Carvana",
        source: "carvana",
        vin: "5YJYGDEE1RF567890",
        features: ["Full Self-Driving Capability", "Premium Connectivity"]
    },
    // Additional listings
    {
        id: 16,
        title: "2023 Tesla Model Y Long Range AWD",
        price: 40500,
        mileage: 14000,
        year: 2023,
        trim: "Long Range AWD",
        color: "Midnight Silver Metallic",
        location: "Portland, OR",
        dealer: "Pacific NW Tesla",
        source: "cargurus",
        vin: "5YJYGDEE1MF678901",
        features: ["Autopilot", "Premium Interior", "All-Weather Package"]
    },
    {
        id: 17,
        title: "2022 Tesla Model Y Performance",
        price: 38500,
        mileage: 25000,
        year: 2022,
        trim: "Performance",
        color: "Red Multi-Coat",
        location: "Denver, CO",
        dealer: "Mile High Motors",
        source: "autotrader",
        vin: "5YJYGDEF1LF789012",
        features: ["Autopilot", "Performance Wheels", "Track Mode"]
    },
    {
        id: 18,
        title: "2024 Tesla Model Y Standard Range RWD",
        price: 42000,
        mileage: 5000,
        year: 2024,
        trim: "Standard Range RWD",
        color: "Quicksilver",
        location: "Austin, TX",
        dealer: "Austin EV Center",
        source: "carscom",
        vin: "5YJYGDEE1RF890123",
        features: ["Autopilot", "Premium Audio", "Glass Roof"]
    },
    {
        id: 19,
        title: "2023 Tesla Model Y Performance",
        price: 43500,
        mileage: 10000,
        year: 2023,
        trim: "Performance",
        color: "Black",
        location: "Chicago, IL",
        dealer: "Windy City Auto",
        source: "cargurus",
        vin: "5YJYGDEF1MF901234",
        features: ["Full Self-Driving", "Performance Package", "Red Calipers"]
    },
    {
        id: 20,
        title: "2022 Tesla Model Y Long Range AWD",
        price: 36500,
        mileage: 32000,
        year: 2022,
        trim: "Long Range AWD",
        color: "Pearl White Multi-Coat",
        location: "Boston, MA",
        dealer: "New England EV",
        source: "carvana",
        vin: "5YJYGDEE1LF012345",
        features: ["Autopilot", "Premium Interior", "Winter Tires Included"]
    }
];

// Calculate deal score for a listing
function calculateDealScore(listing) {
    const avgPriceByYear = {
        2022: 38000,
        2023: 42000,
        2024: 46000,
        2025: 50000
    };

    const currentYear = new Date().getFullYear();
    const expectedMileage = (currentYear - listing.year + 1) * 12000;
    const expectedPrice = avgPriceByYear[listing.year] || 40000;

    // Price score (0-50): how much below expected price
    const priceRatio = listing.price / expectedPrice;
    const priceScore = Math.max(0, Math.min(50, (1.5 - priceRatio) * 50));

    // Mileage score (0-50): how much below expected mileage
    const mileageRatio = listing.mileage / Math.max(expectedMileage, 1);
    const mileageScore = Math.max(0, Math.min(50, (1.5 - mileageRatio) * 50));

    return Math.round((priceScore + mileageScore) * 10) / 10;
}

// Add deal scores to all listings
demoListings.forEach(listing => {
    listing.dealScore = calculateDealScore(listing);
});

// DOM Elements
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');
const loadingOverlay = document.getElementById('loadingOverlay');
const statsSection = document.getElementById('statsSection');
const exportBtn = document.getElementById('exportBtn');
const listingModal = document.getElementById('listingModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

// Filter elements
const minYearSelect = document.getElementById('minYear');
const maxYearSelect = document.getElementById('maxYear');
const maxPriceSelect = document.getElementById('maxPrice');
const maxMileageSelect = document.getElementById('maxMileage');
const sortBySelect = document.getElementById('sortBy');
const sourceSelect = document.getElementById('source');

// Current filtered listings (for export)
let currentListings = [];

// Search function
function searchListings() {
    // Show loading
    loadingOverlay.style.display = 'flex';

    // Get filter values
    const filters = {
        minYear: parseInt(minYearSelect.value),
        maxYear: parseInt(maxYearSelect.value),
        maxPrice: parseInt(maxPriceSelect.value),
        maxMileage: parseInt(maxMileageSelect.value),
        sortBy: sortBySelect.value,
        source: sourceSelect.value
    };

    // Simulate network delay
    setTimeout(() => {
        // Filter listings
        let filtered = demoListings.filter(listing => {
            if (listing.year < filters.minYear || listing.year > filters.maxYear) return false;
            if (listing.price > filters.maxPrice) return false;
            if (listing.mileage > filters.maxMileage) return false;
            if (filters.source !== 'all' && listing.source !== filters.source) return false;
            return true;
        });

        // Sort listings
        switch (filters.sortBy) {
            case 'score':
                filtered.sort((a, b) => b.dealScore - a.dealScore);
                break;
            case 'price-asc':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'mileage-asc':
                filtered.sort((a, b) => a.mileage - b.mileage);
                break;
            case 'year-desc':
                filtered.sort((a, b) => b.year - a.year);
                break;
        }

        currentListings = filtered;

        // Update UI
        renderResults(filtered);
        updateStats(filtered);
        exportBtn.style.display = filtered.length > 0 ? 'flex' : 'none';

        // Hide loading
        loadingOverlay.style.display = 'none';
    }, 800);
}

// Render results
function renderResults(listings) {
    if (listings.length === 0) {
        resultsContainer.innerHTML = `
            <div class="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M8 15s1.5 2 4 2 4-2 4-2"></path>
                    <line x1="9" y1="9" x2="9.01" y2="9"></line>
                    <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
                <p>No listings found matching your criteria. Try adjusting your filters.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = listings.map(listing => createListingCard(listing)).join('');

    // Add click handlers
    document.querySelectorAll('.listing-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const listing = listings.find(l => l.id === id);
            if (listing) showModal(listing);
        });
    });
}

// Create listing card HTML
function createListingCard(listing) {
    const scoreClass = listing.dealScore >= 70 ? 'great' : listing.dealScore >= 50 ? 'good' : 'average';
    const badgeText = listing.dealScore >= 70 ? 'Great Deal!' : listing.dealScore >= 50 ? 'Good Deal' : 'Fair Price';

    const sourceNames = {
        cargurus: 'CarGurus',
        carscom: 'Cars.com',
        autotrader: 'Autotrader',
        carvana: 'Carvana'
    };

    return `
        <div class="listing-card" data-id="${listing.id}">
            <div class="listing-image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8c0 .1-.1.2-.1.3v4c0 .6.4 1 1 1h2"/>
                    <circle cx="7" cy="17" r="2"></circle>
                    <path d="M9 17h6"></path>
                    <circle cx="17" cy="17" r="2"></circle>
                </svg>
                <span class="listing-badge badge-${scoreClass}">${badgeText}</span>
            </div>
            <div class="listing-content">
                <h3 class="listing-title">${listing.title}</h3>
                <div class="listing-details">
                    <div class="detail-item">
                        <span class="detail-label">Price</span>
                        <span class="detail-value price">$${listing.price.toLocaleString()}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Mileage</span>
                        <span class="detail-value">${listing.mileage.toLocaleString()} mi</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Color</span>
                        <span class="detail-value">${listing.color}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Location</span>
                        <span class="detail-value">${listing.location}</span>
                    </div>
                </div>
                <div class="listing-footer">
                    <span class="listing-source">${sourceNames[listing.source]}</span>
                    <div class="listing-score">
                        <span class="score-label">Score:</span>
                        <span class="score-value score-${scoreClass}">${listing.dealScore}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Update statistics
function updateStats(listings) {
    if (listings.length === 0) {
        document.getElementById('totalListings').textContent = '0';
        document.getElementById('avgPrice').textContent = '$0';
        document.getElementById('avgMileage').textContent = '0';
        document.getElementById('avgScore').textContent = '0';
        return;
    }

    const avgPrice = Math.round(listings.reduce((sum, l) => sum + l.price, 0) / listings.length);
    const avgMileage = Math.round(listings.reduce((sum, l) => sum + l.mileage, 0) / listings.length);
    const avgScore = Math.round(listings.reduce((sum, l) => sum + l.dealScore, 0) / listings.length * 10) / 10;

    document.getElementById('totalListings').textContent = listings.length;
    document.getElementById('avgPrice').textContent = `$${avgPrice.toLocaleString()}`;
    document.getElementById('avgMileage').textContent = avgMileage.toLocaleString();
    document.getElementById('avgScore').textContent = avgScore;
}

// Show modal with listing details
function showModal(listing) {
    const scoreClass = listing.dealScore >= 70 ? 'great' : listing.dealScore >= 50 ? 'good' : 'average';
    const scoreLabel = listing.dealScore >= 70 ? 'Great Deal!' : listing.dealScore >= 50 ? 'Good Deal' : 'Fair Price';

    const sourceNames = {
        cargurus: 'CarGurus',
        carscom: 'Cars.com',
        autotrader: 'Autotrader',
        carvana: 'Carvana'
    };

    const sourceUrls = {
        cargurus: 'https://www.cargurus.com',
        carscom: 'https://www.cars.com',
        autotrader: 'https://www.autotrader.com',
        carvana: 'https://www.carvana.com'
    };

    modalBody.innerHTML = `
        <div class="modal-body">
            <div class="modal-header">
                <h2 class="modal-title">${listing.title}</h2>
                <p class="modal-subtitle">${listing.dealer} • ${listing.location}</p>
            </div>
            <div class="modal-details">
                <div class="modal-detail-row">
                    <span class="modal-detail-label">Price</span>
                    <span class="modal-detail-value" style="color: var(--success);">$${listing.price.toLocaleString()}</span>
                </div>
                <div class="modal-detail-row">
                    <span class="modal-detail-label">Mileage</span>
                    <span class="modal-detail-value">${listing.mileage.toLocaleString()} miles</span>
                </div>
                <div class="modal-detail-row">
                    <span class="modal-detail-label">Year</span>
                    <span class="modal-detail-value">${listing.year}</span>
                </div>
                <div class="modal-detail-row">
                    <span class="modal-detail-label">Trim</span>
                    <span class="modal-detail-value">${listing.trim}</span>
                </div>
                <div class="modal-detail-row">
                    <span class="modal-detail-label">Color</span>
                    <span class="modal-detail-value">${listing.color}</span>
                </div>
                <div class="modal-detail-row">
                    <span class="modal-detail-label">VIN</span>
                    <span class="modal-detail-value">${listing.vin}</span>
                </div>
                <div class="modal-detail-row">
                    <span class="modal-detail-label">Features</span>
                    <span class="modal-detail-value">${listing.features.join(', ')}</span>
                </div>
                <div class="modal-detail-row">
                    <span class="modal-detail-label">Source</span>
                    <span class="modal-detail-value">${sourceNames[listing.source]}</span>
                </div>
            </div>
            <div class="modal-score">
                <div class="modal-score-value score-${scoreClass}">${listing.dealScore}/100</div>
                <div class="modal-score-label">Deal Score - ${scoreLabel}</div>
            </div>
            <a href="${sourceUrls[listing.source]}" target="_blank" rel="noopener noreferrer" class="modal-link">
                View on ${sourceNames[listing.source]} →
            </a>
        </div>
    `;

    listingModal.style.display = 'flex';
}

// Export to JSON
function exportToJson() {
    const data = {
        exported_at: new Date().toISOString(),
        count: currentListings.length,
        listings: currentListings.map(l => ({
            title: l.title,
            price: l.price,
            mileage: l.mileage,
            year: l.year,
            trim: l.trim,
            color: l.color,
            location: l.location,
            dealer: l.dealer,
            source: l.source,
            vin: l.vin,
            features: l.features,
            deal_score: l.dealScore
        }))
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tesla-model-y-listings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Event listeners
searchBtn.addEventListener('click', searchListings);

exportBtn.addEventListener('click', exportToJson);

modalClose.addEventListener('click', () => {
    listingModal.style.display = 'none';
});

listingModal.addEventListener('click', (e) => {
    if (e.target === listingModal) {
        listingModal.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && listingModal.style.display === 'flex') {
        listingModal.style.display = 'none';
    }
});

// Initialize with a search on page load
document.addEventListener('DOMContentLoaded', () => {
    searchListings();
});
