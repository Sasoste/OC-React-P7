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
        card.classList.add('bg-white', 'rounded-[21px]', 'shadow-[0px_4px_34px_30px_rgba(0,0,0,0.04)]', 'overflow-hidden', 'recipe-container', 'mb-[3rem]', 'relative', 'w-[28%]');
        card.setAttribute('id', this.id);

        const image = document.createElement('img');
        image.src = `../../assets/images/${this.image}`;
        image.alt = this.name;
        image.classList.add('object-cover', 'h-[253px]', 'w-full', 'rounded-t-[20px]');

        const cardContent = document.createElement('div');
        cardContent.classList.add('px-[6.5%]', 'container-card-text', 'min-h-[478px]');

        const title = document.createElement('h2');
        title.textContent = this.name;
        title.classList.add('text-lg', 'font-anton', 'py-[21px]', 'pb-[29px]', 'text-black');

        const descriptionContainer = document.createElement('div');
        descriptionContainer.classList.add('description-container', 'mb-[28px]');

        const descriptionTitle = document.createElement('h3');
        descriptionTitle.textContent = 'Recette';
        descriptionTitle.classList.add('uppercase', 'font-medium', 'opacity-60', 'mb-[15px]', 'text-[12px]', 'font-manrope', 'tracking-[1.08px]', 'text-[#7A7A7A]');

        const description = document.createElement('p');
        description.textContent = this.description;
        description.classList.add('recipe-description', 'text-[14px]', 'font-light', 'font-manrope', 'text-[#1B1B1B]', 'max-h-[85px]', 'overflow-hidden');

        const ingredientsSection = document.createElement('div');
        ingredientsSection.classList.add('mt-[28px]', 'flex', 'flex-col', 'recipe-ingredients', 'mb-[61px]');

        const ingredientsTitle = document.createElement('h3');
        ingredientsTitle.textContent = 'Ingrédients';
        ingredientsTitle.classList.add('uppercase', 'font-medium', 'opacity-60', 'mb-[15px]', 'text-[12px]', 'font-manrope', 'tracking-[1.08px]', 'text-[#7A7A7A]');

        const ingredientsContainer = document.createElement('div');
        ingredientsContainer.classList.add('w-full', 'flex', 'justify-between', 'items-center', 'flex-wrap');

        this.ingredients.forEach(ingredient => {
            const ingredientWrapper = document.createElement('div');
            ingredientWrapper.classList.add('w-[45%]', 'mb-5');

            const ingredientName = document.createElement('p');
            ingredientName.textContent = ingredient.name;
            ingredientName.classList.add('font-medium', 'ingredient-name', 'text-[14px]', 'font-manrope', 'text-[#1B1B1B]');

            const ingredientDescription = document.createElement('small');
            ingredientDescription.textContent = `${ingredient.quantity || '-'}${ingredient.unit || ''}`;
            ingredientDescription.classList.add('opacity-60', 'text-base', 'font-normal', 'ingredient-quantity', 'text-[14px]', 'font-manrope', 'text-[#7A7A7A]');

            ingredientWrapper.appendChild(ingredientName);
            ingredientWrapper.appendChild(ingredientDescription);
            ingredientsContainer.appendChild(ingredientWrapper);
        });

        const recipeTime = document.createElement('div');
        recipeTime.classList.add('recipe-time', 'inline-flex', 'p-[5px_15px]', 'justify-center', 'items-center', 'gap-[10px]', 'rounded-[14px]', 'bg-[#FFD15B]', 'absolute', 'top-[21px]', 'right-[22px]');
        recipeTime.textContent = `${this.time}min`;

        card.appendChild(image);
        cardContent.appendChild(title);
        descriptionContainer.appendChild(descriptionTitle);
        descriptionContainer.appendChild(description);
        ingredientsSection.appendChild(ingredientsTitle);
        ingredientsSection.appendChild(ingredientsContainer);
        cardContent.appendChild(descriptionContainer);
        cardContent.appendChild(ingredientsSection);
        card.appendChild(cardContent);
        card.appendChild(recipeTime);

        return card;
    }
}

export default Recipe;
