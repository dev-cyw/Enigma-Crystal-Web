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

                const totalSlots = 7;
                const emptySlots = totalSlots - encounter.Pokemon.length;

                encounter.Pokemon.forEach(pokemon => {
                    const slotDiv = document.createElement('div');
                    slotDiv.className = 'slot';
                
                    const img = document.createElement('img');
                    img.src = `../images/pokemon/${pokemon.Name.toLowerCase()}.png`;
                    img.width = 80;
                    img.height = 80;
                
                    slotDiv.appendChild(img);
                
                    const lvl = document.createElement('p');
                    const rate = document.createElement('p');
                
                    if (pokemon.Name.toLowerCase() === 'blank') {
                        lvl.className = 'hidden-text';
                        lvl.innerText = '-';
                        rate.className = 'hidden-text';
                        rate.innerText = '-';
                    } else {
                        lvl.innerText = `Lvl: ${pokemon.Level}`;
                        rate.innerText = isNaN(pokemon.Rate) ? `${pokemon.Rate}` : `${pokemon.Rate}%`;
                    }
                
                    slotDiv.appendChild(lvl);
                    slotDiv.appendChild(rate);
                    encounterDiv.appendChild(slotDiv);
                });

                // Add empty slots
                for (let i = 0; i < emptySlots; i++) {
                    const emptySlotDiv = document.createElement('div');
                    emptySlotDiv.className = 'slot';

                    const emptyImg = document.createElement('img');
                    emptyImg.src = `../images/blank.png`;
                    emptyImg.width = 80;
                    emptyImg.height = 80;

                    emptySlotDiv.appendChild(emptyImg);

                    const emptyLvl = document.createElement('p');
                    emptyLvl.innerText = `-`;
                    emptyLvl.style.color = '#18181b';

                    const emptyRate = document.createElement('p');
                    emptyRate.innerText = `-`;
                    emptyRate.style.color = '#18181b';

                    emptySlotDiv.appendChild(emptyLvl);
                    emptySlotDiv.appendChild(emptyRate);

                    encounterDiv.appendChild(emptySlotDiv);
                }

                mainDiv.appendChild(encounterDiv);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});
