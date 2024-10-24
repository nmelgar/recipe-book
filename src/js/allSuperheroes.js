import ProductData from './HeroesData.mjs';
import { loadHeaderFooter } from './utils.mjs';

const dataSource = new ProductData();
const productListContainer = document.querySelector('.product-list');

async function init() {
    try {
        const superheroes = await dataSource.getData(); // retch all superheroes
        render(superheroes); // render all superheroes
    } catch (error) {
        console.error('Error loading superheroes:', error);
        productListContainer.innerHTML = '<p>Failed to load superheroes.</p>';
    }
}

function render(superheroes) {
    productListContainer.innerHTML = superheroes.map(hero => `
        <div class="card">
            <img src="${hero.images.sm}" alt="${hero.name}" class="card-image" />
            <div class="card-content">
                <h3 class="card-title">${hero.name}</h3>
                <p class="card-stat"><strong>Strength:</strong> ${hero.powerstats.strength}</p>
                <p class="card-stat"><strong>Intelligence:</strong> ${hero.powerstats.intelligence}</p>
                <a href="../hero/index.html?id=${hero.id}" class="card-button">View Details</a> <!-- Ensure path is correct -->
            </div>
        </div>
    `).join('');
}

// initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter(); // load header and footer
    init(); // initialize the loading of superheroes
});
