
const input = document.getElementById('search-input');
const button = document.getElementById('search-button');
const contenedorProducto = document.querySelector('.contenedor-Producto');

button.addEventListener('click', (e) => {
    e.preventDefault();
    traerProducto(input.value);
});

function traerProducto(productoId){
    fetch(`https://localhost:7082/api/productos/${productoId}/`)
    .then((res) => res.json())
    .then((data) => {
        crearProducto(data);
    });      
}

function crearProducto(producto) {
    const imagen = document.createElement('img');
    imagen.src = producto.imagen;

    const h1 = document.createElement('div');
    h1.textContent = producto.nombre;

    const h2 = document.createElement('div');
    h2.textContent = producto.marca;

    const h3 = document.createElement('div');
    h3.textContent = producto.descripcion;

    const h4 = document.createElement('div');
    h4.textContent = '$' + producto.precio;

    const div = document.createElement('div');
    div.appendChild(imagen);
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(h3);
    div.appendChild(h4);
    
    contenedorProducto.appendChild(div);
}
