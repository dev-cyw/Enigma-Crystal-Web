document.addEventListener('DOMContentLoaded', function() {
    fetch('../data/encounters.json')
        .then(response => response.json())
        .then(encountersData => {
            const mainDiv = document.getElementById('Main');

            encountersData.Encounters.forEach(encounter => {
                const areaDiv = document.createElement('h3');
                areaDiv.className = 'area';
                areaDiv.innerText = encounter.Area;
                mainDiv.appendChild(areaDiv);

                const encounterDiv = document.createElement('div');
                encounterDiv.className = 'encounters';

                const totalSlots = 9; // Maximum number of slots
                const emptySlots = totalSlots - encounter.Pokemon.length;

                encounter.Pokemon.forEach(pokemon => {
                    const slotDiv = document.createElement('div');
                    slotDiv.className = 'slot';

                    const img = document.createElement('img');
                    img.src = `../images/pokemon/${pokemon.Name.toLowerCase()}.png`; // Assuming images are named after the Pokemon names in lowercase
                    img.width = 80; // Set image width
                    img.height = 80; // Set image height

                    const lvl = document.createElement('p');
                    lvl.innerText = `Lvl: ${pokemon.Level}`;

                    const rate = document.createElement('p');
                    if (isNaN(pokemon.Rate)) {  // Corrected the condition here
                        rate.innerText = `${pokemon.Rate}`;
                    } else {
                        rate.innerText = `${pokemon.Rate}%`;
                    }

                    slotDiv.appendChild(img);
                    slotDiv.appendChild(lvl);
                    slotDiv.appendChild(rate);

                    encounterDiv.appendChild(slotDiv);
                });

                // Add empty slots
                for (let i = 0; i < emptySlots; i++) {
                    const emptySlotDiv = document.createElement('div');
                    emptySlotDiv.className = 'slot';

                    const emptyImg = document.createElement('img');
                    emptyImg.src = `../images/blank.png`; // Blank image path
                    emptyImg.width = 80; // Set image width
                    emptyImg.height = 80; // Set image height

                    emptySlotDiv.appendChild(emptyImg);

                    const emptyLvl = document.createElement('p');
                    emptyLvl.innerText = `-`;
                    emptyLvl.style.color = '#18181b';  // Make text color same as background to make it invisible

                    const emptyRate = document.createElement('p');
                    emptyRate.innerText = `-`;
                    emptyRate.style.color = '#18181b';  // Make text color same as background to make it invisible

                    emptySlotDiv.appendChild(emptyLvl);
                    emptySlotDiv.appendChild(emptyRate);

                    encounterDiv.appendChild(emptySlotDiv);
                }

                mainDiv.appendChild(encounterDiv);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
