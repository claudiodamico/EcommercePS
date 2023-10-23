
export function procesarPedido() {
  carrito.forEach((prod) => {
    const contenedorCompra = document.querySelector('#contenedorCompra')
    const { productoId, nombre, precio, descripcion, imagen } = prod;
    const div = document.createElement("div");
    div.innerHTML += `
          <div class="modal-contenedor">
            <div>
            <img class="img-fluid img-carrito" src="${imagen}"/>
            </div>
            <div>
            <p>Producto: ${nombre}</p>
          <p>Precio: ${precio}</p>
          <button class="btn btn-danger"  onclick="eliminarProducto(${productoId})">Eliminar producto</button>
            </div>
          </div>
          
      
          `;
    contenedorCompra.appendChild(div);
    console.log(contenedorCompra);
    
  });
}


export const getCarritoById = (carritoId, callback) => {
  fetch(`${API_URL_Carrito}?id=${carritoId}`, {
      method: 'GET'
  })
  .then((httpResponse)=>{
      if(httpResponse == 404){
          return "NotFound";
      }
      if(httpResponse.ok)
          return httpResponse.json()
  })
  .then(body => {
      console.log(body);
      callback(body);
  })
}