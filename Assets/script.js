var searchRecpies = [];
var savedRecipes = [];
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const allergenCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const saveRecipeButton = document.getElementById("saveRecipeButton");
    const generateShoppingListButton = document.getElementById("generate-shopping-list");
    const recipeList = document.getElementById("recipe-list");

    let savedRecipes = ['Recipe1', 'Recipe2', 'Recipe3'];

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const searchTerm = searchInput.value;
            const selectedAllergens = getSelectedAllergens();
            fetchRecipes(searchTerm, selectedAllergens);
        });
    } 

    allergenCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", function () {
            const searchTerm = searchInput.value;
            const selectedAllergens = getSelectedAllergens();
            fetchRecipes(searchTerm, selectedAllergens);
        });
    });

    if (saveRecipeButton) {
        saveRecipeButton.addEventListener("click", function () {
            saveRecipe(recipeDetails); 
            console.log("Saved Recipes:", savedRecipes);
        });
    } 

    if (generateShoppingListButton) {
        generateShoppingListButton.addEventListener("click", function () {
            const shoppingListIngredients = getShoppingListIngredients(savedRecipes);
            console.log("Shopping List Ingredients:", shoppingListIngredients);
        });
    } 

    function fetchRecipes(searchTerm, allergens) {
        fetch(`https://api.edamam.com/search?q=${searchTerm}&app_id=75b0bb55&app_key=ce256a7a59e8a07cbf31e8b3a399b9b4&from=0&to=10`)
            .then(response => response.json())
            .then(data => {
                displayRecipes(data.hits);
            })
            .catch(error => console.error("Error fetching recipes:", error));
    }

    function getSelectedAllergens() {
        return Array.from(allergenCheckboxes)
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);
    }

    function displayRecipes(hits) {
        console.log("Displaying Recipes:", hits);
        recipeList.innerHTML = "";
        hits.forEach(hit => {
            const recipeName = hit.recipe.label;
            const recipeIngredients = hit.recipe.ingredients.map(ingredient => ingredient.text).join(', ');
            const listItem = document.createElement("li");
            listItem.textContent = `${recipeName}: ${recipeIngredients}`;
            recipeList.appendChild(listItem);
        });
    }

    function saveRecipe(recipe) {
        savedRecipes.push(recipe);
    }

    function getShoppingListIngredients(recipes) {
        const shoppingListIngredients = [];
        recipes.forEach(function (recipe) {
            shoppingListIngredients.push(...recipe.ingredients);
        });
        return shoppingListIngredients;
    }
});
