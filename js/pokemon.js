document.addEventListener("DOMContentLoaded", function() {
    fetch('../data/pokemon.json')  
        .then(response => response.json())
        .then(data => {
            const pokemonData = data.Pokemon;
            const tableBody = document.querySelector('#pokemonTable tbody');
            
            function renderPokemonTable(data) {
                let rows = '';
                data.forEach(pokemon => {
                    function getTypeBackgroundColor(type) {
                        switch (type) {
                            case 'Grass':
                                return '#78C850';
                            case 'Fire':
                                return '#F08030';
                            case 'Water':
                                return '#6890F0';
                            case 'Bug':
                                return '#A8B820';
                            case 'Normal':
                                return '#A8A878';
                            case 'Poison':
                                return '#A040A0';
                            case 'Electric':
                                return '#F8D030';
                            case 'Ground':
                                return '#E0C068';
                            case 'Fairy':
                                return '#EE99AC';
                            case 'Fighting':
                                return '#C03028';
                            case 'Psychic':
                                return '#F85888';
                            case 'Rock':
                                return '#B8A038';
                            case 'Ghost':
                                return '#705898';
                            case 'Ice':
                                return '#98D8D8';
                            case 'Dragon':
                                return '#7038F8';
                            case 'Dark':
                                return '#705848';
                            case 'Steel':
                                return '#B8B8D0';
                            case 'Flying':
                                return '#A890F0';
                            default:
                                return '#232329'; // Default color
                        }
                    }

                    function getBalancingColor(value) {
                        if (value > 0) {
                            return 'green';
                        } else if (value < 0) {
                            return 'red';
                        } else {
                            return 'inherit';
                        }
                    }

                    // Calculate total stats with balancing
                    const totalStats = [
                        pokemon.Basestats.HP + pokemon.Balancing.HP,
                        pokemon.Basestats.Attack + pokemon.Balancing.Attack,
                        pokemon.Basestats.Defense + pokemon.Balancing.Defense,
                        pokemon.Basestats['Sp. Attack'] + pokemon.Balancing['Sp. Attack'],
                        pokemon.Basestats['Sp. Defense'] + pokemon.Balancing['Sp. Defense'],
                        pokemon.Basestats.Speed + pokemon.Balancing.Speed
                    ].reduce((acc, curr) => acc + curr, 0);

                    const BalanceStats = 
                        pokemon.Balancing.HP + pokemon.Balancing.Attack +
                        pokemon.Balancing.Defense + pokemon.Balancing['Sp. Attack'] +
                        pokemon.Balancing['Sp. Defense'] + pokemon.Balancing.Speed;

                    const row = `
    <tr>
        <td class="small-column"><img src="../images/pokemon/${pokemon.Name.toLowerCase()}.png?v=1" alt="${pokemon.Name}"></td>
        <td class="small-column">${pokemon.Name}</td>
        <td class="small-column" style="background-color: ${getTypeBackgroundColor(pokemon.Types[0])};">${pokemon.Types[0]}</td>
        <td class="small-column" style="background-color: ${pokemon.Types[1] ? getTypeBackgroundColor(pokemon.Types[1]) : '#18181b'};">${pokemon.Types[1] ? pokemon.Types[1] : '-'}</td>
        <td class="stat-column" style="color: ${getBalancingColor(pokemon.Balancing.HP)};">${pokemon.Basestats.HP + pokemon.Balancing.HP} ${pokemon.Balancing.HP !== 0 ? `(${pokemon.Balancing.HP > 0 ? '+' : ''}${pokemon.Balancing.HP})` : ''}</td>
        <td class="stat-column" style="color: ${getBalancingColor(pokemon.Balancing.Attack)};">${pokemon.Basestats.Attack + pokemon.Balancing.Attack} ${pokemon.Balancing.Attack !== 0 ? `(${pokemon.Balancing.Attack > 0 ? '+' : ''}${pokemon.Balancing.Attack})` : ''}</td>
        <td class="stat-column" style="color: ${getBalancingColor(pokemon.Balancing.Defense)};">${pokemon.Basestats.Defense + pokemon.Balancing.Defense} ${pokemon.Balancing.Defense !== 0 ? `(${pokemon.Balancing.Defense > 0 ? '+' : ''}${pokemon.Balancing.Defense})` : ''}</td>
        <td class="stat-column" style="color: ${getBalancingColor(pokemon.Balancing['Sp. Attack'])};">${pokemon.Basestats['Sp. Attack'] + pokemon.Balancing['Sp. Attack']} ${pokemon.Balancing['Sp. Attack'] !== 0 ? `(${pokemon.Balancing['Sp. Attack'] > 0 ? '+' : ''}${pokemon.Balancing['Sp. Attack']})` : ''}</td>
        <td class="stat-column" style="color: ${getBalancingColor(pokemon.Balancing['Sp. Defense'])};">${pokemon.Basestats['Sp. Defense'] + pokemon.Balancing['Sp. Defense']} ${pokemon.Balancing['Sp. Defense'] !== 0 ? `(${pokemon.Balancing['Sp. Defense'] > 0 ? '+' : ''}${pokemon.Balancing['Sp. Defense']})` : ''}</td>
        <td class="stat-column" style="color: ${getBalancingColor(pokemon.Balancing.Speed)};">${pokemon.Basestats.Speed + pokemon.Balancing.Speed} ${pokemon.Balancing.Speed !== 0 ? `(${pokemon.Balancing.Speed > 0 ? '+' : ''}${pokemon.Balancing.Speed})` : ''}</td>
        <td class="stat-column" style="color: ${getBalancingColor(BalanceStats)};">${totalStats + BalanceStats} ${BalanceStats !== 0 ? `(${BalanceStats > 0 ? '+' : ''}${BalanceStats})` : ''}</td>
        <td class ="ability">${pokemon.Abilities[0]}</td>
        <td class="ability">${pokemon.Abilities[1]}</td>
        <td class="evo-method">${pokemon['Evolution Method']}</td>
        <td class="evo-requirement">${pokemon['Evolution Requirement']}</td>
    </tr>
`;

                    rows += row;

                });
                tableBody.innerHTML = rows;
            }
            
            renderPokemonTable(pokemonData);

            function searchTable() {
                let input, filter, tr, td, i, txtValue;
                input = document.getElementById("searchInput");
                filter = input.value.toUpperCase();
                tr = tableBody.getElementsByTagName("tr");
            
                for (i = 0; i < tr.length; i++) {
                    td = tr[i].getElementsByTagName("td")[1]; // Search by name (2nd column)
                    if (td) {
                        txtValue = td.textContent || td.innerText;
                        // Adjusted search condition to match only the first letters
                        if (txtValue.toUpperCase().startsWith(filter)) {
                            tr[i].style.display = "";
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }
            }
            
            document.getElementById("searchInput").addEventListener("keyup", searchTable);
            

        })
        .catch(error => {
            console.error('Error fetching the Pokémon data:', error);
        });
});