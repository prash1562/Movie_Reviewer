/**
 * Movie Reviewer Application Script
 * Handles mobile navigation functionality and OMDB API movie data fetching.
 */

// --- DOM Elements: Navigation ---
const hamburger = document.getElementById('hamburger');
const navList = document.getElementById('nav-list');

// Initialize mobile navigation toggle if elements are present on the page
if (hamburger && navList) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navList.classList.toggle('show');
  });
}

// --- DOM Elements: Movie Search ---
const input = document.querySelector('#city'); // Search input field
const trigger = document.querySelector('#trigger'); // Search button
const display = document.querySelector('#cityName'); // Movie title display element

// Initialize search event listener if the search button is present (Home page only)
if (trigger) {
  trigger.addEventListener('click', updateMovieName);
}

if (input) {
  // Allow pressing the "Enter" key to trigger the search
  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      updateMovieName();
    }
  });
}

/**
 * Fetches movie details from the OMDB API and updates the DOM.
 * Displays "Movie not found" and placeholder data if the API query fails.
 * 
 * @async
 * @function updateMovieName
 * @returns {Promise<void>}
 */
async function updateMovieName() {
  const movieName = input.value.trim();
  if (movieName) {
    try {

      // Get your free API key at https://www.omdbapi.com/apikey.aspx
      const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your actual OMDB API key
      const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Response === 'True') {
        console.log(data);
        display.textContent = data.Title;
        document.getElementById('releaseDate').textContent = `Release Date: ${data.Released}`;
        document.getElementById('rating').textContent = `Rating: ${data.imdbRating}`;
        document.getElementById('poster').src = data.Poster !== 'N/A' ? data.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
        document.getElementById('poster').alt = `${data.Title} Poster`;
        document.getElementById('director').textContent = `Director: ${data.Director}`;
        document.getElementById('plot').textContent = `Plot: ${data.Plot}`;
        document.getElementById('cast').textContent = `Cast: ${data.Actors}`;
        document.getElementById('genre').textContent = `Genre: ${data.Genre}`;
        document.getElementById('runtime').textContent = `Runtime: ${data.Runtime}`;
        document.getElementById('language').textContent = `Language: ${data.Language}`;
        document.getElementById('country').textContent = `Country: ${data.Country}`;
        document.getElementById('awards').textContent = `Awards: ${data.Awards}`;
        document.getElementById('boxOffice').textContent = `Box Office: ${data.BoxOffice}`;
        document.getElementById('metascore').textContent = `Metascore: ${data.Metascore}`;
        document.getElementById('imdbID').textContent = `IMDb ID: ${data.imdbID}`;
        document.getElementById('type').textContent = `Type: ${data.Type}`;
        document.getElementById('year').textContent = `Year: ${data.Year}`;
        document.getElementById('rated').textContent = `Rated: ${data.Rated}`;
      } else {
        display.textContent = 'Movie not found';
        document.getElementById('releaseDate').textContent = 'Release Date: --';
        document.getElementById('rating').textContent = 'Rating: --';
        document.getElementById('poster').src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
        document.getElementById('poster').alt = 'No Poster Available';
        document.getElementById('director').textContent = 'Director: --';
        document.getElementById('plot').textContent = 'Plot: --';
        document.getElementById('cast').textContent = 'Cast: --';
        document.getElementById('genre').textContent = 'Genre: --';
        document.getElementById('runtime').textContent = 'Runtime: --';
        document.getElementById('language').textContent = 'Language: --';
        document.getElementById('country').textContent = 'Country: --';
        document.getElementById('awards').textContent = 'Awards: --';
        document.getElementById('boxOffice').textContent = 'Box Office: --';
        document.getElementById('metascore').textContent = 'Metascore: --';
        document.getElementById('imdbID').textContent = 'IMDb ID: --';
        document.getElementById('type').textContent = 'Type: --';
        document.getElementById('year').textContent = 'Year: --';
        document.getElementById('rated').textContent = 'Rated: --';
      }

    } catch (error) {
      console.error('Error fetching movie data:', error);
    }
  }
}
