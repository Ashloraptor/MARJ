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
    const groceriesList = document.getElementById("groceries-list");

    let savedRecipes = [];

    if (searchForm) {
        searchForm.addEventListener("submit", handleSearch);
    }

    allergenCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", handleSearch);
    });

    if (generateShoppingListButton) {
        generateShoppingListButton.addEventListener("click", generateShoppingList);
    }

    function handleSearch(event) {
        event.preventDefault();
        const searchTerm = searchInput.value;
        const selectedAllergens = getSelectedAllergens();
        fetchRecipes(searchTerm, selectedAllergens);
    }

    function fetchRecipes(searchTerm, allergens) {
        const apiURL = `https://api.edamam.com/search?q=${searchTerm}&app_id=75b0bb55&app_key=ce256a7a59e8a07cbf31e8b3a399b9b4&from=0&to=10`;

        fetch(apiURL)
            .then(response => response.json())
            .then(data => displayRecipes(data.hits))
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
            const listItem = createRecipeListItem(hit.recipe);
            recipeList.appendChild(listItem);
        });
    }

    function createRecipeListItem(recipe) {
        const { label: recipeName, ingredients } = recipe;
        const recipeIngredients = ingredients.map(ingredient => ingredient.text).join(', ');

        const listItem = document.createElement("li");

        const exportButton = createButton("Export to Grocery List", () => exportToGroceryList(ingredients));
        const saveButton = createButton("Save to Favorites", () => saveRecipeToFavorites({ label: recipeName, ingredients }));

        listItem.textContent = `${recipeName}: ${recipeIngredients}`;
        listItem.appendChild(exportButton);
        listItem.appendChild(saveButton);

        return listItem;
    }

    function createButton(text, clickHandler) {
        const button = document.createElement("button");
        button.textContent = text;
        button.addEventListener("click", (event) => clickHandler(event));
        return button;
    }

    function exportToGroceryList(ingredients) {
        console.log("Grocery List:", ingredients);
    
        const listItem = document.createElement('li');
        listItem.innerHTML = `${ingredients.map(ingredient => ingredient.text).join(', ')} `;
        
        const deleteButton = createButton("Delete", (event) => deleteFromGroceryList(event));
        listItem.appendChild(deleteButton);
        
        groceriesList.appendChild(listItem);
    }

    function deleteFromGroceryList(event) {
        console.log("Deleting from Grocery List:", event);
        const listItem = event.target.closest('li');
    listItem.remove();
    }

    function saveRecipeToFavorites(recipe) {
        savedRecipes.push(recipe);
        const recipeLink = createButton(`View ${recipe.label}`, () => viewSavedRecipe(recipe));
        favoritesCard.appendChild(recipeLink);
    }
    
    function viewSavedRecipe(recipe) {
        const savedRecipeDetails = document.getElementById("saved-recipe-details");
        savedRecipeDetails.innerHTML = '';
    
        const recipeNameElement = document.createElement('h2');
        recipeNameElement.textContent = recipe.label;
    
        const ingredientsList = document.createElement('ul');
        recipe.ingredients.forEach(ingredient => {
            const listItem = document.createElement('li');
            listItem.textContent = ingredient.text;
            ingredientsList.appendChild(listItem);
        });
    
        savedRecipeDetails.appendChild(recipeNameElement);
        savedRecipeDetails.appendChild(ingredientsList);
    }
});