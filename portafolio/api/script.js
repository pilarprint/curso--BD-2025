function obtenerPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon/150/')
        .then(response => response.json())
        .then(data => {
            console.log('Nombre:', data.name);
            console.log('ID:', data.id);
            console.log('Habilidades:', data.abilities.map(respuesta => respuesta.ability.name).join(', '));
            console.log('Altura:', data.height);
            console.log('Peso:', data.weight);
        })
        .catch(error => console.error('Error al obtener datos:', error));
}

obtenerPokemon();