// For main page
document.addEventListener('DOMContentLoaded', function () {
    // Check if user is logged in
    if (localStorage.getItem('loggedIn') !== 'true') {
        // Redirect to login page if not logged in
        window.location.href = 'index.html';
        return;
    }

    // Logout button functionality
    var logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function () {
            // Clear login status and redirect to login page
            localStorage.removeItem('loggedIn');
            window.location.href = 'index.html';
        });
    }

    // Navigation buttons
    document.getElementById('homeButton').addEventListener('click', function () {
        window.location.href = 'main.html';
    });

    document.getElementById('aboutButton').addEventListener('click', function () {
        window.location.href = 'about.html';
    });

    document.getElementById('creditsButton').addEventListener('click', function () {
        window.location.href = 'credits.html';
    });

    // API 1 - Random Animal Trivias
    var api1Container = document.querySelector('#api1 .api-content');
    var nextButton = document.getElementById('nextTriviaButton');
    var isLoading = false;

    function loadTrivia() {
        if (isLoading) return;
        isLoading = true;
        api1Container.textContent = 'Loading...';

        fetch('https://opentdb.com/api.php?amount=1&category=27&type=multiple')
            .then(response => response.json())
            .then(data => {
                if (data.results && data.results.length > 0) {
                    const trivia = data.results[0];
                    const question = trivia.question;
                    const correctAnswer = trivia.correct_answer;
                    const incorrectAnswers = trivia.incorrect_answers;
                    const allAnswers = [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5);

                    let html = `<p><strong>Question:</strong> ${question}</p><ul>`;
                    allAnswers.forEach(answer => {
                        html += `<li>${answer}</li>`;
                    });
                    html += `</ul><p><strong>Correct Answer:</strong> ${correctAnswer}</p>`;
                    api1Container.innerHTML = html;
                } else {
                    api1Container.textContent = 'No trivia available.';
                }
                isLoading = false;
            })
            .catch(error => {
                console.error('Error fetching trivia:', error);
                api1Container.textContent = 'Error loading trivia. Please try again later.';
                isLoading = false;
            });
    }

    nextButton.addEventListener('click', loadTrivia);
    loadTrivia();

    // API 2 - Ocean Biodiversity Tracker (simplified student style)
    var api2Container = document.querySelector('#api2 .api-content');
    var speciesSelect = document.getElementById('speciesSelect');
    var trackButton = document.getElementById('trackSpeciesButton');

    // Load species data from API
    function loadSpeciesData() {
        var species = speciesSelect.value;
        api2Container.textContent = 'Loading data for ' + species + '...';

        var url = 'https://api.obis.org/v3/occurrence?scientificname=' + encodeURIComponent(species) + '&size=5';

        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                var html = '<h3>Tracking: ' + species + '</h3>';

                if (data.results && data.results.length > 0) {
                    html += '<p>Number of recent occurrences: ' + data.total + '</p>';
                    html += '<ul>';
                    data.results.forEach(function (item) {
                        var location = item.locality || 'Unknown';
                        var date = item.eventDate || 'Unknown';
                        var lat = item.decimalLatitude;
                        var lon = item.decimalLongitude;
                        var mapLink = '';
                        if (lat && lon) {
                            mapLink = ' <a href="https://www.google.com/maps?q=' + lat + ',' + lon + '" target="_blank" rel="noopener noreferrer">[Map]</a>';
                        }
                        html += '<li>Location: ' + location + ', Date: ' + date + mapLink + '</li>';
                    });
                    html += '</ul>';
                } else {
                    html += '<p>No occurrence data found.</p>';
                }

                var funFacts = {
                    'Delphinus delphis': 'Common dolphins are known for their agility and playful behavior.',
                    'Balaenoptera musculus': 'Blue whales are the largest animals ever known to have lived on Earth.',
                    'Chelonia mydas': 'Green sea turtles can live up to 80 years and migrate long distances.',
                    'Octopus vulgaris': 'Common octopuses have three hearts and blue blood.',
                    'Thunnus thynnus': 'Atlantic Bluefin Tuna can swim up to 43 miles per hour.'
                };

                if (funFacts[species]) {
                    html += '<p><strong>Fun Fact:</strong> ' + funFacts[species] + '</p>';
                }

                api2Container.innerHTML = html;
            })
            .catch(function (error) {
                api2Container.textContent = 'Error loading species data.';
                console.error('Error fetching species data:', error);
            });
    }

    trackButton.addEventListener('click', loadSpeciesData);

    // API 3 - Mock Function for Marine Debris Data
    function fetchMarineDebrisData() {
        const api3Container = document.querySelector('#api3 .api-content');
        api3Container.textContent = 'Loading marine debris data...';

        // Simulate fetching data from the mock JSON file
        fetch('mockData_debris.json')
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    let html = '<h3>Marine Debris Data</h3>';
                    html += '<ul>';

                    // Display the first 3 debris entries for simplicity
                    data.slice(0, 3).forEach(debris => {
                        const location = debris.location || 'Unknown location';
                        const type = debris.type || 'Unknown type';
                        const source = debris.source || 'Unknown source';
                        const volume = debris.estimatedVolume || 'Unknown volume';
                        const country = debris.country || 'Unknown country';
                        const mapLink = debris.lat && debris.lon
                            ? `<a href="https://www.google.com/maps?q=${debris.lat},${debris.lon}" target="_blank" rel="noopener noreferrer">[Map]</a>`
                            : '';

                        html += `
                            <li>
                                <strong>Location:</strong> ${location} ${mapLink}<br>
                                <strong>Type:</strong> ${type}<br>
                                <strong>Source:</strong> ${source}<br>
                                <strong>Estimated Volume:</strong> ${volume}<br>
                                <strong>Country:</strong> ${country}
                            </li>
                        `;
                    });

                    html += '</ul>';
                    api3Container.innerHTML = html;
                } else {
                    api3Container.innerHTML = '<p>No marine debris data available.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching marine debris data:', error);
                api3Container.innerHTML = '<p>Error loading marine debris data. Please try again later.</p>';
            });
    }

    // Add event listener to the "Load New Data" button
    document.getElementById('loadDebrisButton').addEventListener('click', fetchMarineDebrisData);

    // Call the function to load marine debris data when the page loads
    fetchMarineDebrisData();
});
