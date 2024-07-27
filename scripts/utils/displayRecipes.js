export const displayRecipes = (filteredRecipes) => {
    const searchInputElement = document.getElementById('search-input');
    const searchInputValue = searchInputElement.value.toLowerCase();
    const container = document.querySelector('.recipes-container');
    container.innerHTML = '';

    filteredRecipes.forEach(recipe => {
        const card = recipe.recipeCard();
        container.appendChild(card);
    });

    const recipesNumberElement = document.getElementById('recipes-number');
    recipesNumberElement.innerHTML = `${filteredRecipes.length} recettes`;

    if (filteredRecipes.length === 0) {
        const errorMessage = document.createElement('p');
        errorMessage.classList.add('error-message', 'w-full', 'text-center', 'font-bold', 'text-4xl', 'my-40');
        errorMessage.innerHTML = `Aucune recette ne contient ${searchInputValue}`;
        container.appendChild(errorMessage);
    }
}