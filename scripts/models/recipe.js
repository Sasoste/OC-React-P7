import Ingredient from './ingredient.js';
import Appliance from './appliance.js';
import Ustensil from './ustensil.js';

class Recipe {
    constructor({ id, image, name, servings, ingredients, time, description, appliance, ustensils }) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.servings = servings;
        this.ingredients = ingredients.map(ingredient => new Ingredient(ingredient));
        this.time = time;
        this.description = description;
        this.appliance = new Appliance(appliance);
        this.ustensils = ustensils.map(ustensil => new Ustensil(ustensil));
    }

    recipeCard() {
        const card = document.createElement('article');
        card.classList.add('w-[27%]', 'h-auto', 'bg-white', 'rounded-2xl', 'overflow-hidden', 'shadow-lg', 'm-4');

        const image = document.createElement('img');
        image.src = `../../assets/images/${this.image}`;
        image.alt = this.name;
        image.classList.add('w-full', 'h-64', 'object-cover');

        const cardContent = document.createElement('div');
        cardContent.classList.add('px-5', 'py-6');

        const title = document.createElement('h2');
        title.textContent = this.name;
        title.classList.add('text-lg', 'font-anton');

        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('mt-5');

        const descriptionTitle = document.createElement('h3');
        descriptionTitle.textContent = 'Recette';
        descriptionTitle.classList.add('uppercase', 'font-medium', 'opacity-60', 'mb-3');

        const description = document.createElement('p');
        description.textContent = this.description;
        description.classList.add('font-light');

        const ingredientsSection = document.createElement('div');
        ingredientsSection.classList.add('mt-5');

        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.textContent = 'Ingrédients';
        ingredientsTitle.classList.add('uppercase', 'font-medium', 'opacity-60', 'mb-3');

        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('w-full', 'flex', 'justify-between', 'items-center', 'flex-wrap', 'gap-5');

        this.ingredients.forEach(ingredient => {
            const ingredientWrapper = document.createElement('div');
            ingredientWrapper.classList.add('w-2/6');

            const ingredientName = document.createElement('p');
            ingredientName.textContent = ingredient.name;
            ingredientName.classList.add('font-light');

            const ingredientDescription = document.createElement('small');
            ingredientDescription.textContent = `${ingredient.quantity || ''} ${ingredient.unit || ''}`;
            ingredientDescription.classList.add('opacity-60', 'text-base', 'font-light');

            ingredientWrapper.appendChild(ingredientName);
            ingredientWrapper.appendChild(ingredientDescription);
            ingredientsContainer.appendChild(ingredientWrapper);
        });

        card.appendChild(image);
        cardContent.appendChild(title);
        descriptionContainer.appendChild(descriptionTitle);
        descriptionContainer.appendChild(description);
        ingredientsSection.appendChild(ingredientsTitle);
        ingredientsSection.appendChild(ingredientsContainer);
        cardContent.appendChild(descriptionContainer);
        cardContent.appendChild(ingredientsSection);
        card.appendChild(cardContent);

        return card;
    }
}

export default Recipe;