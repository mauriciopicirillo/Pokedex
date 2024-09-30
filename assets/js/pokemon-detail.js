// Função para obter o ID do Pokémon da URL
function getPokemonIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('id'); // Pega o parâmetro "id" da URL
}

function loadPokemonDetails() {
    const pokemonId = getPokemonIdFromUrl();

    if (pokemonId) {
        pokeApi.getPokemonDetails(pokemonId).then(pokemon => {
            // Atualiza os dados na página
            document.querySelector('.poke-name').innerText = pokemon.name;
            document.querySelector('.poke-number').innerText = `#${pokemon.number}`;
            document.querySelector('.poke-photo').src = pokemon.photo;
            document.querySelector('.species').innerText = `Espécie: ${pokemon.species}`;
            const heightInMeters = pokemon.height / 10;
            document.querySelector('.height').innerText = `Altura: ${heightInMeters} m`;
            document.querySelector('.weight').innerText = `Peso: ${pokemon.weight} kg`;
            const typesElement = document.querySelector('.types');
            typesElement.innerText = `Tipos: ${pokemon.types.join(', ')}`; // Exibe os tipos

            // Limpa classes anteriores para evitar conflitos
            const contentElement = document.querySelector('.content');
            contentElement.className = 'content'; // Limpa classes

            // Adiciona apenas a classe do primeiro tipo ao elemento .content
            if (pokemon.types.length > 0) {
                contentElement.classList.add(pokemon.types[0]); // Adiciona a classe do primeiro tipo
            }
        }).catch(err => {
            console.error('Erro ao buscar detalhes do Pokémon:', err);
        });
    } else {
        console.error('ID do Pokémon não encontrado na URL');
    }
}

// Função para fechar a aba ao clicar no botão Fechar
document.querySelector('.exit').addEventListener('click', () => {
    window.close(); // Fecha a aba atual
});

// Chama a função para carregar os detalhes assim que a página for carregada
loadPokemonDetails();