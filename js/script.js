const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonIMG = document.querySelector('.pokemon-image');
const form = document.querySelector('.form');
const inputSearch = document.querySelector('.input-search');
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    // Quando você define uma função como async, ela automaticamente retorna uma Promise, uma promessa de que ela vai ser concluída. Isso permite o uso do operador await dentro da função, que pausa a execução da função até que a Promise seja resolvida, permitindo lidar com código assíncrono de uma maneira mais fácil e legível.


    // o await do código manda o JS só continuar a ler o codigo DEPOIS que o fetch for concluido
    // o fetch serve pra implantar dados de fora do meu site no meu codigo js
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200) {
        //toLowerCase, eu digito em maiusculo e o sistema reconhece em minúsculo
        const data = await APIResponse.json();
        return data;
    }
    
}

const renderPokemon = async (pokemon) => {
    
    pokemonName.innerHTML = 'loading...';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonIMG.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        inputSearch.value = '';
    }   else {
        pokemonIMG.style.display = 'none';
        pokemonName.innerHTML = 'Not found';
        pokemonNumber.innerHTML = '';
    }

}



form.addEventListener('submit', (event) => {

    event.preventDefault();
    //prevent default é pra evitar que consigam enviar o texto sem nada escrito, o evento só acontece quando eu digito algo, a caixa vazia nao consegue enviar dados

    //prevent significa evitar 

    renderPokemon(inputSearch.value.toLowerCase());

})


btnNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon)
})


btnPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }

})


renderPokemon(searchPokemon);