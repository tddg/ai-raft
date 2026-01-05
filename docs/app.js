// Tesla Model Y Finder - Web Application

// ZIP code to coordinates mapping (major US cities)
const zipCoordinates = {
    // California
    "90210": { lat: 34.0901, lng: -118.4065, city: "Beverly Hills, CA" },
    "90001": { lat: 33.9425, lng: -118.2551, city: "Los Angeles, CA" },
    "94102": { lat: 37.7749, lng: -122.4194, city: "San Francisco, CA" },
    "92101": { lat: 32.7157, lng: -117.1611, city: "San Diego, CA" },
    "92602": { lat: 33.7175, lng: -117.7947, city: "Irvine, CA" },
    // Other states
    "98101": { lat: 47.6062, lng: -122.3321, city: "Seattle, WA" },
    "85001": { lat: 33.4484, lng: -112.0740, city: "Phoenix, AZ" },
    "97201": { lat: 45.5152, lng: -122.6784, city: "Portland, OR" },
    "89101": { lat: 36.1699, lng: -115.1398, city: "Las Vegas, NV" },
    "80201": { lat: 39.7392, lng: -104.9903, city: "Denver, CO" },
    "78201": { lat: 29.4241, lng: -98.4936, city: "San Antonio, TX" },
    "77001": { lat: 29.7604, lng: -95.3698, city: "Houston, TX" },
    "73301": { lat: 30.2672, lng: -97.7431, city: "Austin, TX" },
    "75201": { lat: 32.7767, lng: -96.7970, city: "Dallas, TX" },
    "33101": { lat: 25.7617, lng: -80.1918, city: "Miami, FL" },
    "30301": { lat: 33.7490, lng: -84.3880, city: "Atlanta, GA" },
    "60601": { lat: 41.8781, lng: -87.6298, city: "Chicago, IL" },
    "02101": { lat: 42.3601, lng: -71.0589, city: "Boston, MA" },
    "10001": { lat: 40.7128, lng: -74.0060, city: "New York, NY" },
};

// Demo listing data with coordinates
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
        coordinates: { lat: 34.0522, lng: -118.2437 },
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
        coordinates: { lat: 37.7749, lng: -122.4194 },
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
        coordinates: { lat: 32.7157, lng: -117.1611 },
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
        coordinates: { lat: 47.6062, lng: -122.3321 },
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
        coordinates: { lat: 33.4484, lng: -112.0740 },
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
        coordinates: { lat: 33.6846, lng: -117.8265 },
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
        coordinates: { lat: 25.7617, lng: -80.1918 },
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
        coordinates: { lat: 33.7490, lng: -84.3880 },
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
        coordinates: { lat: 29.7604, lng: -95.3698 },
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
        location: "Denver, CO",
        coordinates: { lat: 39.7392, lng: -104.9903 },
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
        location: "Las Vegas, NV",
        coordinates: { lat: 36.1699, lng: -115.1398 },
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
        location: "Austin, TX",
        coordinates: { lat: 30.2672, lng: -97.7431 },
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
        location: "Chicago, IL",
        coordinates: { lat: 41.8781, lng: -87.6298 },
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
        location: "New York, NY",
        coordinates: { lat: 40.7128, lng: -74.0060 },
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
        location: "Boston, MA",
        coordinates: { lat: 42.3601, lng: -71.0589 },
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
        coordinates: { lat: 45.5152, lng: -122.6784 },
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
        coordinates: { lat: 39.7392, lng: -104.9903 },
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
        coordinates: { lat: 30.2672, lng: -97.7431 },
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
        coordinates: { lat: 41.8781, lng: -87.6298 },
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
        coordinates: { lat: 42.3601, lng: -71.0589 },
        dealer: "New England EV",
        source: "carvana",
        vin: "5YJYGDEE1LF012345",
        features: ["Autopilot", "Premium Interior", "Winter Tires Included"]
    }
];

// User location state
let userLocation = null;

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

    const priceRatio = listing.price / expectedPrice;
    const priceScore = Math.max(0, Math.min(50, (1.5 - priceRatio) * 50));

    const mileageRatio = listing.mileage / Math.max(expectedMileage, 1);
    const mileageScore = Math.max(0, Math.min(50, (1.5 - mileageRatio) * 50));

    return Math.round((priceScore + mileageScore) * 10) / 10;
}

// Calculate distance between two points using Haversine formula
function calculateDistance(lat1, lng1, lat2, lng2) {
    const R = 3959; // Earth's radius in miles
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}

function toRad(deg) {
    return deg * (Math.PI / 180);
}

// Add deal scores and distances to all listings
function processListings() {
    demoListings.forEach(listing => {
        listing.dealScore = calculateDealScore(listing);
        if (userLocation && listing.coordinates) {
            listing.distance = calculateDistance(
                userLocation.lat, userLocation.lng,
                listing.coordinates.lat, listing.coordinates.lng
            );
        } else {
            listing.distance = null;
        }
    });
}

// Initialize listings
processListings();

// DOM Elements
const searchBtn = document.getElementById('searchBtn');
const resultsContainer = document.getElementById('resultsContainer');
const loadingOverlay = document.getElementById('loadingOverlay');
const statsSection = document.getElementById('statsSection');
const exportBtn = document.getElementById('exportBtn');
const listingModal = document.getElementById('listingModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');

// Location elements
const locateBtn = document.getElementById('locateBtn');
const zipCodeInput = document.getElementById('zipCode');
const zipSearchBtn = document.getElementById('zipSearchBtn');
const searchRadiusSelect = document.getElementById('searchRadius');
const locationStatus = document.getElementById('locationStatus');
const locationInfo = document.getElementById('locationInfo');
const locationText = document.getElementById('locationText');

// Filter elements
const minYearSelect = document.getElementById('minYear');
const maxYearSelect = document.getElementById('maxYear');
const maxPriceSelect = document.getElementById('maxPrice');
const maxMileageSelect = document.getElementById('maxMileage');
const sortBySelect = document.getElementById('sortBy');
const sourceSelect = document.getElementById('source');

// Current filtered listings (for export)
let currentListings = [];

// Update location status UI
function updateLocationStatus(status, text) {
    locationStatus.className = 'location-status ' + status;
    locationStatus.querySelector('.status-text').textContent = text;
}

// Set user location and update UI
function setUserLocation(lat, lng, cityName) {
    userLocation = { lat, lng };
    processListings(); // Recalculate distances

    updateLocationStatus('active', 'Location set');
    locationInfo.style.display = 'flex';
    locationText.textContent = `Searching near ${cityName}`;

    // Auto-search when location is set
    searchListings();
}

// Geolocation: Locate Me button
function handleLocateMe() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    locateBtn.disabled = true;
    locateBtn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 2v4m0 12v4m10-10h-4M6 12H2"></path>
        </svg>
        Locating...
    `;
    updateLocationStatus('loading', 'Getting location...');

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;

            // Try to get city name via reverse geocoding
            let cityName = 'your location';
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                );
                const data = await response.json();
                if (data.address) {
                    cityName = data.address.city || data.address.town || data.address.county || 'your location';
                    if (data.address.state) {
                        cityName += `, ${data.address.state}`;
                    }
                }
            } catch (e) {
                console.log('Reverse geocoding failed, using coordinates');
            }

            setUserLocation(latitude, longitude, cityName);

            locateBtn.disabled = false;
            locateBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 2v4m0 12v4m10-10h-4M6 12H2"></path>
                </svg>
                Locate Me
            `;
        },
        (error) => {
            console.error('Geolocation error:', error);
            let errorMsg = 'Could not get location';
            if (error.code === 1) errorMsg = 'Location access denied';
            if (error.code === 2) errorMsg = 'Location unavailable';
            if (error.code === 3) errorMsg = 'Location timeout';

            alert(errorMsg + '. Please enter a ZIP code instead.');
            updateLocationStatus('', 'Location not set');

            locateBtn.disabled = false;
            locateBtn.innerHTML = `
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M12 2v4m0 12v4m10-10h-4M6 12H2"></path>
                </svg>
                Locate Me
            `;
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
        }
    );
}

// ZIP code search
function handleZipSearch() {
    const zip = zipCodeInput.value.trim();

    if (!/^\d{5}$/.test(zip)) {
        alert('Please enter a valid 5-digit ZIP code');
        return;
    }

    // Check if we have coordinates for this ZIP
    if (zipCoordinates[zip]) {
        const { lat, lng, city } = zipCoordinates[zip];
        setUserLocation(lat, lng, city);
    } else {
        // Use a default approximation based on ZIP code ranges
        // This is a simplified approach - in production you'd use a ZIP code API
        alert('ZIP code not found in our database. Try using "Locate Me" or enter a major city ZIP code.');
    }
}

// Search function
function searchListings() {
    loadingOverlay.style.display = 'flex';

    const filters = {
        minYear: parseInt(minYearSelect.value),
        maxYear: parseInt(maxYearSelect.value),
        maxPrice: parseInt(maxPriceSelect.value),
        maxMileage: parseInt(maxMileageSelect.value),
        sortBy: sortBySelect.value,
        source: sourceSelect.value,
        searchRadius: parseInt(searchRadiusSelect.value)
    };

    setTimeout(() => {
        // Recalculate distances with current user location
        processListings();

        // Filter listings
        let filtered = demoListings.filter(listing => {
            if (listing.year < filters.minYear || listing.year > filters.maxYear) return false;
            if (listing.price > filters.maxPrice) return false;
            if (listing.mileage > filters.maxMileage) return false;
            if (filters.source !== 'all' && listing.source !== filters.source) return false;

            // Distance filter (if location is set and radius is not "Nationwide")
            if (userLocation && filters.searchRadius > 0 && listing.distance !== null) {
                if (listing.distance > filters.searchRadius) return false;
            }

            return true;
        });

        // Sort listings
        switch (filters.sortBy) {
            case 'score':
                filtered.sort((a, b) => b.dealScore - a.dealScore);
                break;
            case 'distance':
                if (userLocation) {
                    filtered.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
                }
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

        renderResults(filtered);
        updateStats(filtered);
        exportBtn.style.display = filtered.length > 0 ? 'flex' : 'none';

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
                <p>No listings found matching your criteria. Try adjusting your filters or expanding your search radius.</p>
            </div>
        `;
        return;
    }

    resultsContainer.innerHTML = listings.map(listing => createListingCard(listing)).join('');

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

    // Distance badge HTML
    let distanceBadge = '';
    if (userLocation && listing.distance !== null) {
        distanceBadge = `
            <span class="distance-badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                </svg>
                ${listing.distance} mi
            </span>
        `;
    }

    return `
        <div class="listing-card" data-id="${listing.id}">
            <div class="listing-image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1">
                    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8c0 .1-.1.2-.1.3v4c0 .6.4 1 1 1h2"/>
                    <circle cx="7" cy="17" r="2"></circle>
                    <path d="M9 17h6"></path>
                    <circle cx="17" cy="17" r="2"></circle>
                </svg>
                ${distanceBadge}
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

    // Distance info for modal
    let distanceRow = '';
    if (userLocation && listing.distance !== null) {
        distanceRow = `
            <div class="modal-detail-row">
                <span class="modal-detail-label">Distance</span>
                <span class="modal-detail-value" style="color: #60a5fa;">${listing.distance} miles away</span>
            </div>
        `;
    }

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
                ${distanceRow}
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
        user_location: userLocation,
        count: currentListings.length,
        listings: currentListings.map(l => ({
            title: l.title,
            price: l.price,
            mileage: l.mileage,
            year: l.year,
            trim: l.trim,
            color: l.color,
            location: l.location,
            distance: l.distance,
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
locateBtn.addEventListener('click', handleLocateMe);
zipSearchBtn.addEventListener('click', handleZipSearch);
zipCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleZipSearch();
});

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
