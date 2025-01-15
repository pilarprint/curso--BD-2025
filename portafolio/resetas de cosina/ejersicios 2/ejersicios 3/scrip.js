document.getElementById('agregarParrafo').onclick = function() {
    const nuevoParrafo = document.createElement('p');
    nuevoParrafo.innerText = 'Este es un párrafo agregado dinámicamente.';
    document.getElementById('contenedor').appendChild(nuevoParrafo);
    };