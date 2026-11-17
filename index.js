import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
import { createButton } from "./components/NavButton/NavButton.js";
import { createSearchBar } from "./components/SearchBar/SearchBar.js";
import { createNavPagination } from "./components/NavPagination/NavPagination.js";
// api

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const navigation = document.querySelector('[data-js="navigation"]');

// States
let maxPage = 1;
let currentPage = 1;
let searchQuery = "";
let isLoading = false;

// Prev Button
const prevButton = createButton("prev", "previous", () => {
  goToPage(-1);
});

prevButton.disabled = true;

// Next Button
const nextButton = createButton("next", "next", () => {
  goToPage(1);
});

nextButton.disabled = true;

function goToPage(step) {
  if (isLoading) return;

  const newPage = currentPage + step;

  if (newPage >= 1 && newPage <= maxPage) {
    currentPage = newPage;
    fetchCharacters(currentPage);
  }
}

// Search Bar
const searchBar = createSearchBar(searchQuery, currentPage, (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;
  currentPage = 1;
  fetchCharacters(currentPage);
});

// Pagination
const pagination = createNavPagination(currentPage, maxPage);

// Card
async function fetchCharacters(page) {
  isLoading = true;
  nextButton.disabled = true;
  prevButton.disabled = true;

  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`,
    );
    const data = await response.json();
    cardContainer.innerHTML = "";
    if (!response.ok) {
      maxPage = 1;
      pagination.textContent = "0/0";
      cardContainer.textContent = "No characters found.";
      return;
    }
    data.results.forEach((result) => {
      cardContainer.append(createCharacterCard(result));
    });
    maxPage = data.info.pages;
    pagination.textContent = `${page}/${maxPage}`;
    return data;
  } catch (error) {
    console.error(error);
  } finally {
    isLoading = false;
    nextButton.disabled = isLoading || currentPage >= maxPage;
    prevButton.disabled = isLoading || currentPage <= 1;
  }
}

searchBarContainer.append(searchBar);
navigation.append(prevButton, pagination, nextButton);

// Fetch and Render Characters
fetchCharacters(currentPage);
