var searchRecpies = [];
var savedRecipes = [];
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-input");
    const allergenCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    const generateShoppingListButton = document.getElementById("generate-shopping-list");
    const recipeList = document.getElementById("recipe-list");
    const favoritesCard = document.getElementById("favorites-card");

    let savedRecipes = [];

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

    if (generateShoppingListButton) {
        generateShoppingListButton.addEventListener("click", function () {
            const shoppingListIngredients = getShoppingListIngredients(savedRecipes);
            console.log("Shopping List Ingredients:", shoppingListIngredients);
            // You can further implement logic to use the shoppingListIngredients as needed
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

            const exportButton = document.createElement("button");
            exportButton.textContent = "Export to Grocery List";
            exportButton.addEventListener("click", function () {
                exportToGroceryList(hit.recipe.ingredients);
            });

            const saveButton = document.createElement("button");
            saveButton.textContent = "Save";
            saveButton.addEventListener("click", function () {
                saveRecipe(hit.recipe);
            });

            listItem.textContent = `${recipeName}: ${recipeIngredients}`;
            listItem.appendChild(exportButton);
            listItem.appendChild(saveButton);
            recipeList.appendChild(listItem);
        });
    }

    function exportToGroceryList(ingredients) {
        console.log("Exported to Grocery List:", ingredients);
        // You can further implement logic to use the ingredients as needed
    }

    function saveRecipe(recipe) {
        savedRecipes.push(recipe);
        const recipeLink = document.createElement("button");
        recipeLink.textContent = `View ${recipe.label}`;
        recipeLink.addEventListener("click", function () {
            console.log("Viewing saved recipe:", recipe);
        });

        favoritesCard.appendChild(recipeLink);
    }

    function getShoppingListIngredients(recipes) {
        const shoppingListIngredients = [];
        recipes.forEach(function (recipe) {
            shoppingListIngredients.push(...recipe.ingredients);
        });
        return shoppingListIngredients;
    }
});
