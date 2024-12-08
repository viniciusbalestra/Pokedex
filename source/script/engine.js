const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMore');
let offset = 0;
const limit = 12;
const maxLimit = 151;

function convertPokemonToLi (pokemon) {
    return `
        <li class="content__list__pokemon ${pokemon.type}">
            <div class="detail01">
                <span class="pokemon-name">${pokemon.name}</span>
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type">${type}</li>`).join('')}
                </ol>
            </div>
            <div class="detail02">
                <span class="pokemon-number">#00${pokemon.number}</span>
                <img src="${pokemon.photo}" alt="image-${pokemon.name}">
            </div>
        </li>
    `
};

function loadPokemonItens (offset, limit) {
    pokeApi.getPokemons(offset, limit).then ((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
    });
};

loadPokemonItens (offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    let newQtd = offset + limit;

    if (newQtd >= maxLimit) {
        const newLimit = maxLimit -offset;
        loadPokemonItens (offset, newLimit);

        loadMoreButton.parentElement.removeChild(loadMoreButton);

    } else {
        loadPokemonItens (offset, limit);
    };
    
}) 
   

