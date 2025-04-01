const typeWeaknesses = {
    normal: ["fighting"],
    fire: ["water", "rock", "ground"],
    water: ["electric", "grass"],
    electric: ["ground"],
    grass: ["fire", "ice", "poison", "flying", "bug"],
    ice: ["fire", "fighting", "rock", "steel"],
    fighting: ["flying", "psychic", "fairy"],
    poison: ["ground", "psychic"],
    ground: ["water", "grass", "ice"],
    flying: ["electric", "ice", "rock"],
    psychic: ["bug", "ghost", "dark"],
    bug: ["fire", "flying", "rock"],
    rock: ["water", "grass", "fighting", "ground", "steel"],
    ghost: ["ghost", "dark"],
    dragon: ["ice", "dragon", "fairy"],
    dark: ["fighting", "bug", "fairy"],
    steel: ["fire", "fighting", "ground"],
    fairy: ["poison", "steel"],
  };
  
  function getCounterTypes(pokemonTypes) {
    const counters = new Set();
    pokemonTypes.forEach((type) => {
      const weaknesses = typeWeaknesses[type];
      if (weaknesses) {
        weaknesses.forEach((weakness) => counters.add(weakness));
      }
    });
    return Array.from(counters);
  }
  
  async function fetchData() {
    try {
      const pokemonName = document
        .getElementById("pokemonName")
        .value.toLowerCase();
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
      );
  
      if (!response.ok) {
        throw new Error("Could not fetch resource");
      }
  
      const data = await response.json();
  
      const pokemonSprite = data.sprites.front_default;
      const imgElement = document.getElementById("pokemonSprite");
      imgElement.src = pokemonSprite;
      imgElement.style.display = "block";
  
      const pokeName = data.name;
      const textElement = document.getElementById("pokeName");
      textElement.textContent = `NAME: ${pokeName}`;
  
      const pokemonID = data.id;
      const idElement = document.getElementById("pokemonID");
      idElement.textContent = `Pokemon ID: ${pokemonID}`;
  
      const types = data.types.map((typeInfo) => typeInfo.type.name);
      const typeElement = document.getElementById("pokemonType");
      typeElement.textContent = `Type: ${types.join(", ")}`;
  
      const pokemonTypes = data.types.map((typeInfo) => typeInfo.type.name);
      const counterTypes = getCounterTypes(pokemonTypes);
      console.log("Pokemon Types:", pokemonTypes);
      console.log("Best Counters:", counterTypes);
      const counterElement = document.getElementById("pokemonCounters");
      counterElement.textContent = `Best Counters: ${counterTypes.join(", ")}`;
  
      const weaknesses = getCounterTypes(pokemonTypes);
      const weaknessesElement =document.getElementById("weaknesses");
      weaknessesElement.innerHTML = "";
      weaknesses.forEach((weakness) => {
          const li = document.createElement("li");
          li.textContent = weakness;
          weaknessesElement.appendChild(li);
      });
  
      const resultsElement = document.getElementById("results");
      resultsElement.style.display = "block";
  
  
  
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
  };
  
  document.getElementById("pokemonName").addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
          fetchData();
      }
  });

  function resetFields() {
    document.getElementById("pokemonName").value = ""; // Clears input
    document.getElementById("errorMessage").innerText = ""; // Clears error message
    document.getElementById("pokeName").innerText = "";
    document.getElementById("pokemonID").innerText = "";
    document.getElementById("pokemonType").innerText = "";
    document.getElementById("pokemonCounters").innerText = "";
  
    // Hide sprite & results section
    document.getElementById("pokemonSprite").src = "";
    document.getElementById("pokemonSprite").style.display = "none";
    document.getElementById("results").style.display = "none";
  }