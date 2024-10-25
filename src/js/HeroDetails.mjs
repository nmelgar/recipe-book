import ProductData from './HeroesData.mjs';
import { loadHeaderFooter } from './utils.mjs';

const dataSource = new ProductData();
const heroContent = document.getElementById('hero-content');

// function to get the hero ID from the URL
function getHeroIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

// function to fetch and display hero details
async function displayHeroDetails() {
    const heroId = getHeroIdFromUrl(); // get the hero ID from the URL
    if (!heroId) {
        heroContent.innerHTML = '<p>No hero ID provided!</p>';
        return;
    }

    try {
        const superheroes = await dataSource.getData(); // fetch all superheroes
        const hero = superheroes.find(h => h.id == heroId); // find the specific hero by ID

        if (hero) {
            // render the hero details with a back button
            heroContent.innerHTML = `
                <div class="hero-detail-container">
                    <img src="${hero.images.md}" alt="${hero.name}" class="hero-image" />
                    <div class="hero-info">
                        <h3 class="hero-name">${hero.name}</h3>
                        <p><strong>Full Name:</strong> ${hero.biography.fullName}</p>
                        <hr class="divider">
                        <p><strong>Strength:</strong> ${hero.powerstats.strength}</p>
                        <p><strong>Intelligence:</strong> ${hero.powerstats.intelligence}</p>
                        <p><strong>Speed:</strong> ${hero.powerstats.speed}</p>
                        <p><strong>Durability:</strong> ${hero.powerstats.durability}</p>
                        <p><strong>Power:</strong> ${hero.powerstats.power}</p>
                        <p><strong>Combat:</strong> ${hero.powerstats.combat}</p>
                    </div>
                </div>
                <div class="back-button-container">
                    <button onclick="window.location.href='../all-superheroes/index.html'" class="back-button">
                        &larr; Back to All Superheroes
                    </button>
                </div>
            `;
        } else {
            heroContent.innerHTML = '<p>Hero not found!</p>';
        }
    } catch (error) {
        console.error('Error loading hero details:', error);
        heroContent.innerHTML = '<p>Failed to load hero details.</p>';
    }
}

// initialize the display
document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
    displayHeroDetails();
});
