import ProductData from './HeroesData.mjs';
import { loadHeaderFooter } from './utils.mjs';

const dataSource = new ProductData();
const productListContainer = document.querySelector('.product-list');
const searchInput = document.getElementById('search-input');

async function init() {
    try {
        const superheroes = await dataSource.getData(); // fetch all superheroes
        render(superheroes); // render all superheroes

        searchInput.addEventListener('input', () => handleSearch(superheroes));

    } catch (error) {
        console.error('Error loading superheroes:', error);
        productListContainer.innerHTML = '<p>Failed to load superheroes.</p>';
    }
}

function render(superheroes) {
    if (superheroes.length === 0) {
        productListContainer.innerHTML = '<p>No heroes found!</p>';
    } else {
        productListContainer.innerHTML = superheroes.map(hero => `
            <div class="card">
                <img src="${hero.images.sm}" alt="${hero.name}" class="card-image" />
                <div class="card-content">
                    <h3 class="card-title">${hero.name}</h3>
                    <p class="card-stat"><strong>Strength:</strong> ${hero.powerstats.strength}</p>
                    <p class="card-stat"><strong>Intelligence:</strong> ${hero.powerstats.intelligence}</p>
                    <a href="../hero/index.html?id=${hero.id}" class="card-button">View Details</a>
                </div>
            </div>
        `).join('');
    }
}

function handleSearch(superheroes) {
    const searchTerm = searchInput.value.toLowerCase();

    const filteredHeroes = superheroes.filter(hero =>
        hero.name.toLowerCase().includes(searchTerm)
    );

    render(filteredHeroes);
}

document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
    init();
});