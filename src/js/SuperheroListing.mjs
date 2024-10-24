import { renderListWithTemplate } from './utils.mjs';

export default class SuperheroListing {
    constructor(dataSource, listElement) {
        this.dataSource = dataSource;
        this.listElement = document.querySelector(listElement);
    }

    async init() {
        try {
            const superheroes = await this.dataSource.getData();
            const randomHeroes = this.getRandomHeroes(superheroes, 4); // get 4 random superheroes
            this.renderList(randomHeroes); // render the random superheroes
            this.addShowAllButton();
        } catch (error) {
            console.error('Error fetching superhero data:', error);
        }
    }

    getRandomHeroes(superheroes, count) {
        const shuffled = superheroes.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    renderList(superheroes) {
        renderListWithTemplate(superheroCardTemplate, this.listElement, superheroes, 'afterbegin', true);
    }

    addShowAllButton() {
        const button = document.createElement('a');
        button.textContent = 'See All Superheroes';
        button.href = './all-superheroes/index.html';
        button.classList.add('see-all-button');

        this.listElement.insertAdjacentElement('afterend', button);
    }
}

// template for rendering each superhero card
export function superheroCardTemplate(superhero) {
    return `
      <div class="card">
        <img src="${superhero.images.sm}" alt="${superhero.name}" class="card-image" />
        <div class="card-content">
          <h3 class="card-title">${superhero.name}</h3>
          <p class="card-stat"><strong>Strength:</strong> ${superhero.powerstats.strength}</p>
          <p class="card-stat"><strong>Intelligence:</strong> ${superhero.powerstats.intelligence}</p>
          <a href="../hero/index.html?id=${superhero.id}" class="card-button">View Details</a>
        </div>
      </div>
    `;
}