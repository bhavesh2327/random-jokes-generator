document.addEventListener("DOMContentLoaded", () => {
    const randomButton = document.getElementById("randomBtn");
    const searchButton = document.getElementById("searchBtn");
    const jokeDiv = document.getElementById("joke");
    const searchInput = document.getElementById("search");

    // Function to fetch a random joke
    async function getRandomJoke() {
        try {
            const response = await fetch("https://icanhazdadjoke.com/", {
                headers: { 'Accept': 'application/json' }
            });

            console.log('Response:', response); // Log entire response for debugging

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const jokeObj = await response.json();
            console.log('Joke Data:', jokeObj); // Log joke data for debugging

            if (jokeObj.joke) {
                jokeDiv.textContent = jokeObj.joke;
            } else {
                jokeDiv.textContent = "No joke found in response.";
            }

        } catch (error) {
            jokeDiv.textContent = "Error fetching joke!";
            console.error('Error fetching random joke:', error); // Log error for detailed debugging
        }
    }

    // Function to search for a joke based on the query
    async function searchJoke(query) {
        try {
            const searchUrl = `https://icanhazdadjoke.com/search?term=${query}`;
            const response = await fetch(searchUrl, {
                headers: { 'Accept': 'application/json' }
            });

            console.log('Response:', response); // Log entire response for debugging

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const jokeObj = await response.json();
            console.log('Search Results:', jokeObj); // Log search results for debugging

            if (jokeObj.results && jokeObj.results.length > 0) {
                jokeDiv.textContent = jokeObj.results[0].joke;
            } else {
                jokeDiv.textContent = "No jokes found for your search.";
            }

        } catch (error) {
            jokeDiv.textContent = "Error fetching jokes!";
            console.error('Error fetching search results:', error); // Log error for detailed debugging
        }
    }

    // Add event listeners
    randomButton.addEventListener("click", getRandomJoke);
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if (query) {
            searchJoke(query);
        } else {
            jokeDiv.textContent = "Please enter a search term.";
        }
    });

    // Fetch a random joke on page load
    getRandomJoke();
});
