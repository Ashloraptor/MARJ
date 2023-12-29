var searchHistory = [];
var searchForm = document.getElementById("search-form");
var searchInput = document.getElementById("search-input");
//var apiUrl = 

//function searchRecipes(){}

/*function renderFavoritesHistory(){

//card elements
var col = document.createElement('div');
var card = document.createElement('div');
var cardBody = document.createElement('div');
var cardTitle = document.createElement('h5');

//incorporate cards
col.append(card);
card.append(cardBody);
cardBody.append(cardTitle);
}*/

/*function renderGroceryList(){

//card elements
var col = document.createElement('div');
var card = document.createElement('div');
var cardBody = document.createElement('div');
var cardTitle = document.createElement('h5');

//incorporate cards
col.append(card);
card.append(cardBody);
cardBody.append(cardTitle);
}*/

//Form function
function logMessage(event) {
    // Prevent the default form submission
    event.preventDefault();
    // Retrieve the input value
    var inputValue = searchInput.value.trim();
    // Log the message to the console
    console.log("You searched for: " + inputValue);

    searchInput.value = '';
    //callback to search function (the one that does the fetch request). Include parameter "input value"

}

function fetchRecipes() {
    //APIKey
    //var apiURL = 

    fetch(apiUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            renderItems();
        })
        .catch(function (err) {
            console.error(err);
        })
}

//initFavoritesHistory
//initGroceryList
searchForm.addEventListener("submit", logMessage);