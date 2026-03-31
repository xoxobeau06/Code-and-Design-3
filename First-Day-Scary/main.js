const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const searchInput = document.getElementById("searchInput");
const genreButtons = Array.from(document.querySelectorAll(".chip"));
const movieCards = Array.from(document.querySelectorAll(".movie-card"));
const resultsCount = document.getElementById("resultsCount");

let activeGenre = "all";

function updateCount(visibleCount) {
	const label = visibleCount === 1 ? "movie" : "movies";
	resultsCount.textContent = `${visibleCount} ${label}`;
}

function filterMovies() {
	const term = searchInput.value.trim().toLowerCase();
	let visible = 0;

	movieCards.forEach((card) => {
		const title = (card.dataset.title || "").toLowerCase();
		const year = (card.dataset.year || "").toLowerCase();
		const genre = card.dataset.genre || "";

		const matchesText = title.includes(term) || year.includes(term);
		const matchesGenre = activeGenre === "all" || genre === activeGenre;
		const show = matchesText && matchesGenre;

		card.classList.toggle("hide", !show);
		if (show) visible += 1;
	});

	updateCount(visible);
}

navToggle?.addEventListener("click", () => {
	const expanded = navToggle.getAttribute("aria-expanded") === "true";
	navToggle.setAttribute("aria-expanded", String(!expanded));
	navLinks.classList.toggle("open");
});

searchInput?.addEventListener("input", filterMovies);

genreButtons.forEach((button) => {
	button.addEventListener("click", () => {
		activeGenre = button.dataset.genre || "all";
		genreButtons.forEach((btn) => btn.classList.remove("active"));
		button.classList.add("active");
		filterMovies();
	});
});

document.querySelectorAll("#navLinks a").forEach((link) => {
	link.addEventListener("click", () => {
		navLinks.classList.remove("open");
		navToggle?.setAttribute("aria-expanded", "false");
	});
});

filterMovies();
