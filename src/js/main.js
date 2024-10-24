import SuperheroListing from './SuperheroListing.mjs';
import ProductData from './HeroesData.mjs';
import { loadHeaderFooter } from './utils.mjs';

const dataSource = new ProductData();
const superheroListing = new SuperheroListing(dataSource, '.product-list');

document.addEventListener('DOMContentLoaded', () => {
    loadHeaderFooter();
    superheroListing.init();
});
