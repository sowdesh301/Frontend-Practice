const apiKey = "YOUR_API_KEY"; // Get one at http://www.omdbapi.com/apikey.aspx
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const resultContainer = document.getElementById("result");

// Event Listener
searchBtn.addEventListener("click", searchMovie);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovie();
});

// Fetch Movie Data
async function searchMovie() {
  const movieName = searchInput.value.trim();

  if (!movieName) {
    alert("⚠️ Please enter a movie name");
    return;
  }

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovies(data.Search);
    } else {
      resultContainer.innerHTML = `<p>❌ No movies found for "${movieName}".</p>`;
    }
  } catch (error) {
    resultContainer.innerHTML = `<p>⚠️ Error fetching data. Please try again later.</p>`;
    console.error(error);
  }
}

// Display Movies
function displayMovies(movies) {
  resultContainer.innerHTML = "";

  movies.forEach(async (movie) => {
    const details = await fetch(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`);
    const movieDetails = await details.json();

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.innerHTML = `
      <img src="${movieDetails.Poster !== "N/A" ? movieDetails.Poster : 'https://via.placeholder.com/300'}" alt="Poster">
      <h2>${movieDetails.Title} (${movieDetails.Year})</h2>
      <p><strong>⭐ Rating:</strong> ${movieDetails.imdbRating}</p>
      <p><strong>🎭 Genre:</strong> ${movieDetails.Genre}</p>
      <p><strong>📝 Plot:</strong> ${movieDetails.Plot}</p>
    `;
    resultContainer.appendChild(movieCard);
  });
}
