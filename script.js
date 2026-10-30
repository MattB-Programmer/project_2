const fetchBtn = document.getElementById("fetch-btn");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const container = document.getElementById("character-container");
const message = document.getElementById("message");

fetchBtn.addEventListener("click", fetchCharacters);
searchBtn.addEventListener("click", searchCharacter);

async function fetchCharacters() {
    container.innerHTML = "";
    message.textContent = "Loading...";

    try {
        const response = await fetch("https://rickandmortyapi.com/api/character");

        if (!response.ok) {
            throw new Error("Could not fetch characters.");
        }

        const data = await response.json();

        message.textContent = "";
        displayCharacters(data.results);

    } catch (error) {
        message.textContent = error.message;
    }
}

async function searchCharacter() {
    const name = searchInput.value.trim();

    if (name === "") {
        message.textContent = "Enter a character name.";
        return;
    }

    container.innerHTML = "";
    message.textContent = "Searching...";

    try {
        const response = await fetch("https://rickandmortyapi.com/api/character/?name=" + encodeURIComponent(name));

        if (response.status === 404) {
            message.textContent = "Character not found.";
            return;
        }

        if (!response.ok) {
            throw new Error("Could not search for character.");
        }

        const data = await response.json();

        message.textContent = "";
        displayCharacters(data.results);

    } catch (error) {
        message.textContent = error.message;
    }
}

function displayCharacters(characters) {
    container.innerHTML = "";

    characters.forEach(function(character) {
        const card = document.createElement("div");
        card.className = "character-card";

        const image = document.createElement("img");
        image.src = character.image;
        image.alt = character.name;

        const info = document.createElement("div");
        info.className = "character-info";

        const name = document.createElement("h2");
        name.textContent = character.name;

        const status = document.createElement("p");
        status.textContent = "Status: " + character.status;

        const species = document.createElement("p");
        species.textContent = "Species: " + character.species;

        const location = document.createElement("p");
        location.textContent = "Location: " + character.location.name;

        info.appendChild(name);
        info.appendChild(status);
        info.appendChild(species);
        info.appendChild(location);

        card.appendChild(image);
        card.appendChild(info);

        container.appendChild(card);
    });
}