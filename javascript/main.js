const API_URL_Productos = 'https://localhost:7082/api/productos';
const API_URL_ProductosMayor = 'https://localhost:7082/api/productos?precio=true';
const API_URL_ProductosMenor = 'https://localhost:7082/api/productos?precio=false';
const API_URL_Carrito = 'https://localhost:7082/api/carrito';

let carrito = [];

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const activarFuncion = document.querySelector("#activarFuncion");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago')
const userId = localStorage.getItem('UserId');

if (activarFuncion) {
  activarFuncion.addEventListener("click", procesarPedido);
}

document.addEventListener("DOMContentLoaded", () => {
  carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  mostrarCarrito();
  document.querySelector("#activarFuncion").click(procesarPedido);
});
if(formulario){
  formulario.addEventListener('submit', enviarCompra)
}


if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", () => {
    carrito.length = [];
    mostrarCarrito();
  });
}

if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "¡Tu carrito está vacio!",
        text: "Compra algo para continuar con la compra",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }
  });
}

const mayor = document.getElementById('mayor');
const menor = document.getElementById('menor');

document.getElementById('mayor').addEventListener("click", reloadMayor);
document.getElementById('menor').addEventListener("click", reloadMenor);

async function reloadMayor(){
    contenedor.innerHTML = ("");

    const res = await fetch(API_URL_ProductosMayor);
    const data = await res.json();
    
    Object.values(data).forEach((prod) => {
        const { productoId, nombre, precio, descripcion, imagen } = prod;
        if (contenedor) {
          contenedor.innerHTML += `
          <div class="col-12 col-md-4 mb-4">
          <div class="card h-100" width="412px" height="450px">
          <img class="card-img-top mt-2" src="${imagen}" height="450" alt="Card image">
          <div class="card-body">
            <h5 class="card-title text-center mb-0">${nombre}</h5>
            <p class="card-text text-center mb-0">Precio: $${precio}</p>
            <p class="card-text text-center mb-0">Descripcion: ${descripcion}</p>                      
          </div>
          <div class="buttonVer text-center mb-0">    
            <a href="producto.html" class="btn btn-secondary" onclick="verProducto(${productoId}, ${imagen}, ${nombre}, $${precio}, ${descripcion})"><i class="bi bi-eye mx-5"> Ver</i></a> 
          </div> 
          </br>
          <div class="buttonCompra text-center mb-0">     
            <button class="btn btn-secondary" onclick="agregarProducto(${productoId})"><i class="bi bi-cart mx-5"> Comprar</i></button>
          </div>
          </br>
        </div>
          `;
        }
      });
}

async function reloadMenor(){
    contenedor.innerHTML = ("");

    const res = await fetch(API_URL_ProductosMenor);
    const data = await res.json();
    
    Object.values(data).forEach((prod) => {
        const { productoId, nombre, precio, descripcion, imagen } = prod;
        if (contenedor) {
          contenedor.innerHTML += `
          <div class="col-12 col-md-4 mb-4">
          <div class="card h-100" width="390px" height="450px">
          <img class="card-img-top mt-2" src="${imagen}" height="450" alt="Card image">
          <div class="card-body">
            <h5 class="card-title text-center mb-0">${nombre}</h5>
            <p class="card-text text-center mb-0">Precio: $${precio}</p>
            <p class="card-text text-center mb-0">Descripcion: ${descripcion}</p>                      
          </div>
          <div class="buttonVer text-center mb-0">    
            <a href="producto.html" class="btn btn-secondary" onclick="verProducto(${productoId}, ${imagen}, ${nombre}, $${precio}, ${descripcion})"><i class="bi bi-eye mx-5"> Ver</i></a> 
          </div> 
          </br>
          <div class="buttonCompra text-center mb-0">     
            <button class="btn btn-secondary" onclick="agregarProducto(${productoId})"><i class="bi bi-cart mx-5"> Comprar</i></button>
          </div>
          </br>
        </div>
          `;
        }
      });
}

reloadMenor();


async function agregarProducto(id) {

  const carro = await fetch(API_URL_Carrito)
  const res = await fetch(API_URL_Productos);
  const data = await res.json();
  const existe = carrito.some(prod => prod.productoId === id)
  const cantidad = 1
  if(existe){
    const prod = carrito.map(prod => {
      if(prod.productoId === id){
        cantidad = 1
      }
      else {
        cantidad = 1
      }
    })
  } else {
    const item = data.find((prod) => prod.productoId === id)

      let jsonBody = {
      clienteId: userId,
      productoId: id,
      cantidad: cantidad
     
   }
  let body = JSON.stringify(jsonBody)

  fetch(`${carro}`,{
    method : 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
    },
    body: body
})
.then(body => {
    console.log(body)
})
    carrito.push(item) 

    if (carrito.length != 0) {
      Swal.fire({
        title: "¡Producto agregado al carrito!",
        text: "Tu producto fue agregado con exito al carrito de compras",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } else {
      location.href = "compra.html";
    }

  }
      
  mostrarCarrito()
};
  
  const mostrarCarrito = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carrito.forEach((prod) => {
        const { productoId, nombre, precio, descripcion, imagen, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div>
          <img class="img-fluid img-carrito" src="${imagen}"/>
          </div>
          <div>
          <p>Producto: ${nombre}</p>
        <p>Precio: ${precio}</p>
        <p>Cantidad :${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${productoId})">Eliminar producto</button>
          </div>
        </div>   
        `;
      });
    }
  
    if (carrito.length === 0) {
      console.log("Nada");
      modalBody.innerHTML = `
      <p class="text-center text-secondary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      console.log("Algo");
    }
    carritoContenedor.textContent = carrito.length;
  
    if (precioTotal) {
      precioTotal.innerText = carrito.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  //GUARDAMOS EL CARRITO EN LOCALSTORAGE
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }
  
  function eliminarProducto(id) {
    const productoId = id;
    carrito = carrito.filter((item) => item.productoId !== productoId);
    mostrarCarrito();
  }

  async function procesarPedido() {
    carrito.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { productoId, nombre, precio, imagen, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito" src="${imagen}"/>
                </td>
                <td>${nombre}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carrito.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const cliente = document.querySelector('#cliente').value
     const email = document.querySelector('#correo').value
  
     if(email === '' || cliente == ''){
       Swal.fire({
         title: "¡Debes completar tu email y nombre!",
         text: "Rellena el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
     })
   } else {
  
    const btn = document.getElementById('button');
 
     btn.value = 'Enviando...';
  
     const serviceID = 'default_service';
     const templateID = 'template_qxwi0jn';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
      }, (err) => {
        btn.value = 'Finalizar compra';
      });
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
       
       setTimeout(() => {
         alertExito.remove()
         document.location.reload()
       }, 3000)
  
  
     }, 3000)
   }
   localStorage.clear()
  
   }


