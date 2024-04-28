document.addEventListener("DOMContentLoaded", function() {
    fetch('../data/movesets.json')
      .then(response => response.json())
      .then(data => {
        const pokemonContainer = document.getElementById('pokemonContainer');
        data.Movesets.forEach(pokemon => {
          const card = createPokemonCard(pokemon);
          pokemonContainer.appendChild(card);
        });
      })
      .catch(error => {
        console.error('Error fetching movesets:', error);
      });
  });
  
  function createPokemonCard(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card');
  
    // Create image element
    const image = document.createElement('img');
    const imageName = pokemon.Name.toLowerCase();
    image.src = `../images/pokemon/${imageName}.png`; // Assuming the images are in the specified directory
    image.alt = pokemon.Name;
    card.appendChild(image);
  
    // Create heading for Pokemon name
    const name = document.createElement('h2');
    name.textContent = pokemon.Name;
    card.appendChild(name);
  
    // Add Learnset title
    const learnsetTitle = document.createElement('p');
    learnsetTitle.innerHTML = '<strong>Learnset:</strong>';
    card.appendChild(learnsetTitle);
  
    // Create unordered list for learnset moves
    const learnset = document.createElement('ul');
    pokemon.Learnset.forEach(move => {
      const moveParts = move.split(', ');
      const moveName = moveParts[0];
      const moveLevel = moveParts[1];
      const moveItem = document.createElement('li');
      moveItem.textContent = `${moveName} (Level ${moveLevel})`;
      learnset.appendChild(moveItem);
    });
    card.appendChild(learnset);
  
    // Add TM/HM title
    const tmhmTitle = document.createElement('p');
    tmhmTitle.innerHTML = '<strong>TM/HM:</strong>';
    card.appendChild(tmhmTitle);
  
    // Create unordered list for TM/HM moves
    if (pokemon['TM/HM']) {
      const tmhmList = document.createElement('ul');
      pokemon['TM/HM'].forEach(move => {
        const tmhmItem = document.createElement('li');
        tmhmItem.textContent = move;
        tmhmList.appendChild(tmhmItem);
      });
      card.appendChild(tmhmList);
    }
  
    return card;
  }
  
    