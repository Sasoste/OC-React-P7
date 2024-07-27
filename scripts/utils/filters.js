import { displayRecipes } from './displayRecipes.js';

let selectedIngredients = new Set();
let selectedAppliances = new Set();
let selectedUstensils = new Set();

export function initializeFilters(recipes) {
    const searchInput = document.getElementById('search-input');
    const ingredientFilterInput = document.getElementById('ingredient-filter-input');
    const applianceFilterInput = document.getElementById('appliance-filter-input');
    const utensilFilterInput = document.getElementById('utensil-filter-input');

    populateFilters(recipes);

    searchInput.addEventListener('input', () => {
        const searchValue = searchInput.value.trim();

        if (searchValue.length >= 3 || searchValue.length === 0) {
            const filteredRecipes = filterRecipes(recipes);
            populateFilters(filteredRecipes);
            displayRecipes(filteredRecipes);
        }
    });

    const clearSearchIcon = document.querySelector('.clear-search');
    clearSearchIcon.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchIcon.classList.add('hidden');
        searchInput.dispatchEvent(new Event('input'));
    });

    ingredientFilterInput.addEventListener('input', displayFilterIngredientList);
    applianceFilterInput.addEventListener('input', displayFilterApplianceList);
    utensilFilterInput.addEventListener('input', displayFilterUtensilList);

    document.getElementById('ingredient-list').addEventListener('click', (e) => handleFilterClick(e, selectedIngredients, recipes));
    document.getElementById('appliance-list').addEventListener('click', (e) => handleFilterClick(e, selectedAppliances, recipes));
    document.getElementById('utensil-list').addEventListener('click', (e) => handleFilterClick(e, selectedUstensils, recipes));
}

function handleFilterClick(event, selectedSet, recipes) {
    const target = event.target;
    if (target.tagName === 'LI') {
        const filterValue = target.textContent.toLowerCase();
        if (selectedSet.has(filterValue)) {
            selectedSet.delete(filterValue);
            target.classList.remove('selected');
        } else {
            selectedSet.add(filterValue);
            target.classList.add('selected');
        }
        const filteredRecipes = filterRecipes(recipes);
        populateFilters(filteredRecipes);
        displayRecipes(filteredRecipes);
        displaySelectedFilters(recipes);
    }
}

export function populateFilters(recipes) {
    const ingredientFilterList = document.getElementById('ingredient-list');
    const applianceFilterList = document.getElementById('appliance-list');
    const utensilFilterList = document.getElementById('utensil-list');

    ingredientFilterList.innerHTML = '';
    applianceFilterList.innerHTML = '';
    utensilFilterList.innerHTML = '';

    const ingredients = [...new Set(recipes.flatMap(recipe => recipe.ingredients.map(ingredient => ingredient.name.toLowerCase())))];
    const appliances = [...new Set(recipes.map(recipe => recipe.appliance.name.toLowerCase()))];
    const utensils = [...new Set(recipes.flatMap(recipe => recipe.ustensils.map(ustensil => ustensil.name.toLowerCase())))];

    ingredients
        .filter(ingredient => !selectedIngredients.has(ingredient))
        .forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.classList.add('filterItem', 'pl-2');
            listItem.textContent = capitalizeFirstLetter(ingredient);
            ingredientFilterList.appendChild(listItem);
        });

    appliances
        .filter(appliance => !selectedAppliances.has(appliance))
        .forEach(appliance => {
            const listItem = document.createElement('li');
            listItem.classList.add('filterItem', 'pl-2');
            listItem.textContent = capitalizeFirstLetter(appliance);
            applianceFilterList.appendChild(listItem);
        });

    utensils
        .filter(utensil => !selectedUstensils.has(utensil))
        .forEach(utensil => {
            const listItem = document.createElement('li');
            listItem.classList.add('filterItem', 'pl-2');
            listItem.textContent = capitalizeFirstLetter(utensil);
            utensilFilterList.appendChild(listItem);
        });
}

function filterRecipes(recipes) {
    const searchInputElement = document.getElementById('search-input');
    const searchInputValue = searchInputElement.value.toLowerCase();
    const clearIcon = document.querySelector('.clear-search');

    if (searchInputValue.length > 0) {
        clearIcon.classList.remove('hidden');
    } else {
        clearIcon.classList.add('hidden');
    }

    clearIcon.addEventListener('click', () => {
        searchInputElement.value = '';
        clearIcon.classList.add('hidden');
        searchInputElement.dispatchEvent(new Event('input'));
    });

    const filteredRecipes = recipes.filter(recipe => {
        const matchesName = recipe.name.toLowerCase().includes(searchInputValue);
        const matchesIngredients = recipe.ingredients.some(ingredient =>
            typeof ingredient.name === 'string' && ingredient.name.toLowerCase().includes(searchInputValue)
        );
        const matchesAppliance = typeof recipe.appliance === 'string' && recipe.appliance.toLowerCase().includes(searchInputValue);
        const matchesUstensils = recipe.ustensils.some(ustensil =>
            typeof ustensil === 'string' && ustensil.toLowerCase().includes(searchInputValue)
        );

        const matchesSelectedIngredients = [...selectedIngredients].every(filterValue =>
            recipe.ingredients.some(ingredient =>
                typeof ingredient.name === 'string' && ingredient.name.toLowerCase() === filterValue
            )
        );
        const matchesSelectedAppliances = selectedAppliances.size === 0 ||
            (typeof recipe.appliance === 'string' && selectedAppliances.has(recipe.appliance.toLowerCase()));
        const matchesSelectedUstensils = [...selectedUstensils].every(filterValue =>
            recipe.ustensils.some(ustensil =>
                typeof ustensil === 'string' && ustensil.toLowerCase() === filterValue
            )
        );

        return (matchesName || matchesIngredients || matchesAppliance || matchesUstensils) &&
            matchesSelectedIngredients && matchesSelectedAppliances && matchesSelectedUstensils;
    });

    return filteredRecipes;
}

function displaySelectedFilters(recipes) {
    const globalFiltersList = document.querySelector('.selected-filters');
    const ingredientNewList = document.getElementById('selected-ingredients');
    const applianceNewList = document.getElementById('selected-appliances');
    const utensilNewList = document.getElementById('selected-utensils');

    globalFiltersList.innerHTML = '';
    ingredientNewList.innerHTML = '';
    applianceNewList.innerHTML = '';
    utensilNewList.innerHTML = '';

    function createListItems(set, listElement, removeFromSet) {
        let className = ['bg-custom-yellow', 'flex', 'items-center', 'font-manrope'];
        if (listElement.classList.contains('selected-filters-list')) {
            className.push('pl-2', 'py-2', 'relative');
        } else if (listElement.classList.contains('selected-filters')) {
            className.push('list-none', 'p-4', 'rounded-xl', 'mr-4')
        }
        set.forEach(item => {
            const listItem = document.createElement('li');
            listItem.classList.add(...className);
            listItem.textContent = capitalizeFirstLetter(item);
            const iconSpan = document.createElement('span');
            iconSpan.classList.add('hidden', 'hover:block', 'absolute', 'right-2', 'top-1/2', 'transform', '-translate-y-1/2');
            if (listElement.classList.contains('selected-filters-list')) {
                iconSpan.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
                listItem.appendChild(iconSpan);
            } else if (listElement.classList.contains('selected-filters')) {
                listItem.innerHTML = `${listItem.textContent} <i class="fa-solid fa-xmark pl-4"></i>`;
            }
            listElement.appendChild(listItem);
            listItem.addEventListener('click', () => {
                removeFromSet(item);
                listItem.remove();
                const filteredRecipes = filterRecipes(recipes);
                populateFilters(filteredRecipes);
                displayRecipes(filteredRecipes);
                displaySelectedFilters(recipes);
            });
            listItem.addEventListener('mouseover', () => {
                iconSpan.classList.remove('hidden');
                listItem.classList.add('font-bold');
            });

            listItem.addEventListener('mouseout', () => {
                iconSpan.classList.add('hidden');
                listItem.classList.remove('font-bold');
            });
        });
    }

    createListItems(selectedIngredients, ingredientNewList, item => selectedIngredients.delete(item));
    createListItems(selectedAppliances, applianceNewList, item => selectedAppliances.delete(item));
    createListItems(selectedUstensils, utensilNewList, item => selectedUstensils.delete(item));

    createListItems(selectedIngredients, globalFiltersList, item => selectedIngredients.delete(item));
    createListItems(selectedAppliances, globalFiltersList, item => selectedAppliances.delete(item));
    createListItems(selectedUstensils, globalFiltersList, item => selectedUstensils.delete(item));
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayFilterIngredientList() {
    const inputElement = document.getElementById('ingredient-filter-input');
    const inputValue = inputElement.value.toLowerCase();
    const listItems = document.querySelectorAll('#ingredient-list li');
    const inputEraser = document.querySelector('.input-ingredient-remove-text');

    if (inputValue.length > 0) {
        inputEraser.classList.remove('hidden');
    } else {
        inputEraser.classList.add('hidden');
    }

    listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(inputValue) ? '' : 'none';
    });

    inputEraser.addEventListener('click', () => {
        inputElement.value = '';
        inputEraser.classList.add('hidden');
        listItems.forEach(item => {
            item.style.display = '';
        });
    });
}

function displayFilterApplianceList() {
    const inputElement = document.getElementById('appliance-filter-input');
    const inputValue = inputElement.value.toLowerCase();
    const listItems = document.querySelectorAll('#appliance-list li');
    const inputEraser = document.querySelector('.input-appliance-remove-text');

    if (inputValue.length > 0) {
        inputEraser.classList.remove('hidden');
    } else {
        inputEraser.classList.add('hidden');
    }

    listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(inputValue) ? '' : 'none';
    });

    inputEraser.addEventListener('click', () => {
        inputElement.value = '';
        inputEraser.classList.add('hidden');
        listItems.forEach(item => {
            item.style.display = '';
        });
    });
}

function displayFilterUtensilList() {
    const inputElement = document.getElementById('utensil-filter-input');
    const inputValue = inputElement.value.toLowerCase();
    const listItems = document.querySelectorAll('#utensil-list li');
    const inputEraser = document.querySelector('.input-utensil-remove-text');

    if (inputValue.length > 0) {
        inputEraser.classList.remove('hidden');
    } else {
        inputEraser.classList.add('hidden');
    }

    listItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.style.display = text.includes(inputValue) ? '' : 'none';
    });

    inputEraser.addEventListener('click', () => {
        inputElement.value = '';
        inputEraser.classList.add('hidden');
        listItems.forEach(item => {
            item.style.display = '';
        });
    });
}