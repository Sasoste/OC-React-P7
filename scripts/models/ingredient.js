class Ingredient {
    constructor({ ingredient, quantity, unit }) {
        this.id = ingredient.toLowerCase();
        this.name = ingredient;
        this.quantity = quantity ?? null;
        this.unit = unit ?? null;
    }
}

export default Ingredient;