import recipes from '../assets/data/recipes.js';
import Recipe from './models/recipe.js';
import { displayRecipes } from './utils/displayRecipes.js';
import { initializeFilters } from './utils/filters.js';
import { populateFilters } from './utils/filters.js';
import { filtersToggle } from './utils/displayFilters.js';


document.addEventListener('DOMContentLoaded', () => {
    const recipesData = recipes.map(data => new Recipe(data));
    displayRecipes(recipesData);
    initializeFilters(recipesData);
    populateFilters(recipesData);
    filtersToggle();
});