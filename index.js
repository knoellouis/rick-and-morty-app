import { createCharacterCard } from "./components/CharacterCard/CharacterCard.js";
// api

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]',
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');
// States
let maxPage = 1;
let currentPage = 1;
let searchQuery = "";

// Card
async function fetchCharacters(page) {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character?page=${page}`,
  );
  const data = await response.json();
  cardContainer.innerHTML = "";
  data.results.forEach((result) => {
    cardContainer.append(createCharacterCard(result));
  });
  maxPage = data.info.pages;
  pagination.textContent = `${page}/${maxPage}`;
  return data;
}

fetchCharacters(currentPage);
