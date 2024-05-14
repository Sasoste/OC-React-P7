import recipes from '../assets/data/recipes.js';
import Recipe from './models/recipe.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log(recipes);
    const recipesData = recipes.map(data => new Recipe(data));
    const container = document.querySelector('.recipes-container');
    console.log(container);

    recipesData.forEach(recipe => {
        const card = recipe.recipeCard();
        console.log(card);
        container.appendChild(card);
    });
});