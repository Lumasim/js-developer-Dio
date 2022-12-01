const pokemon_list_id = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton')

const max_records = 156;
const limit = 20;
let offset = 0;



function load_more_pokemons(offset, limit) {
	function convert_pokemon_to_html(pokemon) {
		return `<li style="width:30vh; height:25vh;margin-right: 15px;margin-left: 15px;" class="pokemon ${pokemon.type}">
					<div align="center" class"main">
						<span  class="name">${pokemon.name}</span>
						<span class="number">#${pokemon.id}</span>
					</div>
					<ol align="center" style:"padding: 10px 10px 10px; margin: 10px 10px 10px;" class="types">
						${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
					</ol>
					<img src="${pokemon.photo}" alt="">`;
	}

	poke_api.get_pokemons(offset, limit).then((pokemons = []) => {
		pokemon_list_id.innerHTML += pokemons.map(convert_pokemon_to_html).join('');
	})
}

load_more_pokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
	offset += limit
	const qtdRecordWithNextPage = offset + limit

	if (qtdRecordWithNextPage >= max_records) {
		const newLimit = max_records - offset
		loadPokemonItens(offset, newLimit)

		loadMoreButton.parentElement.removeChild(loadMoreButton)
	} else {
		load_more_pokemons(offset, limit)
	}

})


const modalToggle = () => {
	document.getElementById('modal-overlay').classList.toggle('active');
}


const showDetails = (name) => {
	poke_api.getPokemonByName(name)
		.then((details) => {
			const modal = document.getElementById('modal');

			modal.removeAttribute('class');
			modal.classList.add(details.type);

			document.getElementById('modal-overlay').classList.add('active');
			document.querySelector('#modal h2').innerHTML = details.name;
			document.querySelector('#modal #number').innerHTML = `#${(details.number)}`;

			document.querySelector('#modal .details #abilities').innerHTML = `
                Abilities: ${details.abilities.map((ability) => `${ability}`).join(', ')}
            `;

			document.querySelector('#modal img').src = details.photo;
			document.querySelector('#modal .details #species').innerHTML = `Species: ${details.species}`;
			document.querySelector('#modal .details #height').innerHTML = `Height: ${details.height}`;
			document.querySelector('#modal .details #weight').innerHTML = `Weight: ${details.weight}`;
		});
}