function displayFilters(dropdown) {
    const arrow = dropdown.querySelector('.fa-chevron-down');
    const dropdownContent = dropdown.parentElement.querySelector('.dropdown-content');
    const fullDropdown = dropdown.closest('.full-dropdown');

    arrow.classList.toggle('rotate-180');
    dropdownContent.classList.toggle('hidden');

    if (dropdownContent.classList.contains('hidden')) {
        fullDropdown.classList.add('rounded-xl');
        fullDropdown.classList.remove('rounded-t-xl');
    } else {
        fullDropdown.classList.add('rounded-t-xl');
        fullDropdown.classList.remove('rounded-xl');
    }
}

export function filtersToggle() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach((dropdown) => {
        dropdown.addEventListener('click', () => displayFilters(dropdown));
    });
}