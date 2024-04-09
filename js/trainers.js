fetch('../data/trainers.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const container = document.querySelector('.container');
        const body = document.querySelector('body');  // Selecting the <body> tag

        data.Trainers.forEach(trainer => {
            const trainerDiv = document.createElement('div');
            trainerDiv.classList.add('trainer');
            
            trainerDiv.innerHTML = `
                <div>
                <h3>${trainer.Class} <span>${trainer.Name}</span></h3>
                <img src="../images/Trainer Classes/${trainer.Class}.png" style="width: 100%; image-rendering: pixelated;max-width=100px">
                </div>
            `;
            
            const pokemonDiv = document.createElement('div');
            pokemonDiv.classList.add('pokemon');
            
            trainer.Pokemon.forEach(pokemon => {
                pokemonDiv.innerHTML += `
                    <div class="poke-item">
                        <img src="../images/pokemon/${pokemon.Name.toLowerCase()}.png">
                        <p>${pokemon.Name === 'Blank' ? '' : pokemon.Name}</p>
                        <p>${pokemon.Level}</p>
                        <p>${pokemon.Ability}</p>
                        <p>${pokemon.Item}</p>
                        <p>${pokemon.Moves.join('<br>')}</p>
                    </div>
                `;
            });
            
            // Fill empty divs
            for (let i = trainer.Pokemon.length; i < 6; i++) {
                pokemonDiv.innerHTML += `<div class="poke-item empty"></div>`;
            }

            trainerDiv.appendChild(pokemonDiv);
            container.appendChild(trainerDiv);
            
            // Add area to body before the trainer that has the Area
            if (trainer.Area !== "") {
                const areaHeader = document.createElement('h3');
                areaHeader.textContent = trainer.Area;
                container.insertBefore(areaHeader, trainerDiv);
            }
        });
    })
    .catch(error => {
        console.error('Error fetching the JSON:', error);
    });
