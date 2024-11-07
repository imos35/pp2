console.log('script loaded');

let pokemonImage = document.getElementById('pokemon-image');
let pokemonName = document.getElementById('pokemon-name');

let pokemonType = [];
let selectedTypes = [];

async function getPokemon() {
    try {
        let randomPokemon = (Math.floor(Math.random() * 151) + 1);
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomPokemon}`);
        let data = await response.json();

        let name = data.name;
        let sprite = data.sprites.front_default;
        let type = data.types.map(typeInfo => typeInfo.type.name);
        console.log(type)

        if (name.toLowerCase() === 'magneton' || name.toLowerCase() === 'magnemite') {
            pokemonType = type.filter(type => type !== 'steel');
        } 
        else if(name.toLowerCase() === 'clefable' 
        || name.toLowerCase() === 'clefairy') {
            pokemonType = type.filter(type => type !== 'fairy');
            pokemonType.push('normal') 
        }
        else if(name.toLowerCase() === 'wigglytuff') {
            pokemonType = type.filter(type => type !== 'fairy');
        }
        else {
            pokemonType = type;
        }

        pokemonName.textContent = name;
        pokemonImage.src = sprite;
        pokemonImage.alt = name;
        pokemonImage.style.display = 'block';


    } catch (error) {
        console.log("Could not fetch Pokémon! Error:", error);
    }
}

let typeButtons = document.querySelectorAll('.type-btn');
typeButtons.forEach(
    button => {button.addEventListener('click', handleClick)}
)

function handleClick(event){
    let clickedButton = event.currentTarget;
    let buttonType = clickedButton.getAttribute('data-type');

    typeButtons.forEach(button => button.classList.remove('pressed'));
    clickedButton.classList.add('pressed');
    setTimeout(() => {
        clickedButton.classList.remove('pressed');
    }, 100);

    if(!selectedTypes.includes(buttonType)){
        selectedTypes.push(buttonType)
    }

    if(pokemonType.length === selectedTypes.length){
        let isCorrect = selectedTypes.every(type => pokemonType.includes(type));

    if(isCorrect){
        console.log('correct!')
        selectedTypes = []
        setTimeout(() => {
            getPokemon();
        }, 300);

    } 
    else {
        console.log('wrong!')
        selectedTypes = []
    };
}
 
    document.getElementById('next-question').addEventListener('click', () => {getPokemon()});

    console.log(`You clicked on: ${buttonType}`);
}



document.addEventListener('DOMContentLoaded', getPokemon);