const API_URL_Productos = 'https://localhost:7082/api/productos';
const API_URL_ProductosMayor = 'https://localhost:7082/api/productos/filtrar-por-precio?mayor=true';
const API_URL_ProductosMenor = 'https://localhost:7082/api/productos/filtrar-por-precio?mayor=false';
const API_URL_Carrito = 'https://localhost:7082/api/carrito';
const API_URL_RegistrarVenta = 'https://localhost:7082/api/orden/registrar-venta';

let carrito = [];
const clienteId = 1; // Cliente fijo con ID 1

const contenedor = document.querySelector("#contenedor");
const carritoContenedor = document.querySelector("#carritoContenedor");
const vaciarCarrito = document.querySelector("#vaciarCarrito");
const precioTotal = document.querySelector("#precioTotal");
const procesarCompra = document.querySelector("#procesarCompra");
const totalProceso = document.querySelector("#totalProceso");
const formulario = document.querySelector('#procesar-pago');

document.addEventListener("DOMContentLoaded", async () => {
  await reloadMenor(); // Cargar productos por precio menor inicialmente
  await cargarCarrito(); // Cargar productos del carrito
});

// Cargar carrito desde backend
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch(`${API_URL_Carrito}?ClienteId=${clienteId}`);
    if (res.ok) {
      const data = await res.json();
      carrito = data.carritoProductos.map(cp => ({
        productoId: cp.productoId,
        nombre: cp.producto.nombre,
        precio: cp.producto.precio,
        cantidad: cp.cantidad,
        imagen: cp.producto.imagen,
      }));
      mostrarCarrito();
    }
  } catch (error) {
    console.error("Error al cargar el carrito:", error);
  }
});

// Mostrar carrito
const mostrarCarrito = () => {
  const modalBody = document.querySelector(".modal .modal-body");
  if (modalBody) {
    modalBody.innerHTML = carrito.map(({ productoId, nombre, precio, cantidad, imagen }) => `
      <div class="modal-contenedor">
        <div>
          <img class="img-fluid img-carrito" src="${imagen}" />
        </div>
        <div>
          <p>Producto: ${nombre}</p>
          <p>Precio: $${precio.toFixed(2)}</p>
          <p>Cantidad: ${cantidad}</p>
          <button class="btn btn-danger" onclick="eliminarProducto(${productoId})">Eliminar producto</button>
        </div>
      </div>`).join("");

    if (carrito.length === 0) {
      modalBody.innerHTML = `<p class="text-center text-secondary">¡Aún no has agregado productos!</p>`;
    }
  }
  carritoContenedor.textContent = carrito.length;
  if (precioTotal) {
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0).toFixed(2);
  }
};

// Guardar en LocalStorage
function guardarStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Botón Vaciar Carrito
if (vaciarCarrito) {
  vaciarCarrito.addEventListener("click", async () => {
    try {
      await fetch(`${API_URL_Carrito}?ClienteId=${clienteId}`, { method: "DELETE" });
      carrito = [];
      mostrarCarrito();
      Swal.fire("Carrito vaciado", "Todos los productos fueron eliminados.", "success");
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
    }
  });
}

async function agregarProducto(id) {
  try {
    // Verificar si el producto ya existe en el carrito
    const existe = carrito.some(prod => prod.productoId === id);

    if (existe) {
      // Incrementar cantidad localmente
      carrito = carrito.map(prod => {
        if (prod.productoId === id) prod.cantidad += 1;
        return prod;
      });
    } else {
      // Obtener detalles del producto del backend
      const res = await fetch(`${API_URL_Productos}/${id}`);
      const item = await res.json();
      carrito.push({ ...item, cantidad: 1 });
    }

    // Actualizar carrito en el backend
    await fetch(API_URL_Carrito, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ClienteId: clienteId, ProductoId: id, Cantidad: 1 }),
    });

    mostrarCarrito();
    Swal.fire("¡Producto agregado!", "El producto fue agregado al carrito.", "success");
  } catch (error) {
    console.error("Error al agregar producto:", error);
    Swal.fire("Error", "No se pudo agregar el producto al carrito.", "error");
  }
}

// Eliminar producto del carrito
async function eliminarProducto(id) {
  try {
    carrito = carrito.filter(item => item.productoId !== id);
    await fetch(`${API_URL_Carrito}?ClienteId=${clienteId}&ProductoId=${id}`, { method: "DELETE" });
    mostrarCarrito();
    Swal.fire("Producto eliminado", "El producto fue eliminado del carrito.", "success");
  } catch (error) {
    console.error("Error al eliminar producto:", error);
  }
}

// Botón Finalizar Compra
if (procesarCompra) {
  procesarCompra.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire("Carrito vacío", "Agrega productos al carrito antes de finalizar la compra.", "error");
    } else {
      registrarVenta();
    }
  });
}

function continuarCompra() {
  // Guardar el carrito actual en localStorage
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Redirigir a compra.html
  location.href = "compra.html";
}

// Registrar venta
async function registrarVenta() {
  try {
    const res = await fetch(`${API_URL_RegistrarVenta}?ClienteId=${clienteId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      Swal.fire("¡Venta registrada!", "La venta fue registrada exitosamente.", "success")
        .then(() => {
          localStorage.removeItem("carrito");
          location.href = "compra.html"; // Redirigir a compra.html
        });
    } else {
      const error = await res.json();
      Swal.fire("Error al registrar venta", error.descripcion || "Ocurrió un error inesperado.", "error");
    }
  } catch (error) {
    console.error("Error al registrar venta:", error);
    Swal.fire("Error", "No se pudo registrar la venta. Inténtalo más tarde.", "error");
  }
}

// Ver producto (abre un modal con detalles)
function verProducto(nombre, imagen, descripcion, precio) {
  Swal.fire({
    title: nombre,
    html: `
      <img src="${imagen}" class="img-fluid mb-3" alt="Producto">
      <p>${descripcion}</p>
      <h4>Precio: $${precio.toFixed(2)}</h4>
    `,
    confirmButtonText: "Cerrar",
  });
}

// Cargar productos iniciales
document.addEventListener("DOMContentLoaded", () => reloadProductos(API_URL_ProductosMenor));

const mayorButton = document.getElementById("mayor");
const menorButton = document.getElementById("menor");

async function reloadMayor() {
  try {
    const res = await fetch(API_URL_ProductosMayor);
    const productos = await res.json();
    renderProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos por precio mayor:", error);
  }
}

async function reloadMenor() {
  try {
    const res = await fetch(API_URL_ProductosMenor);
    const productos = await res.json();
    renderProductos(productos);
  } catch (error) {
    console.error("Error al cargar productos por precio menor:", error);
  }
}

// Renderizar los productos en el contenedor
function renderProductos(productos) {
  if (productos.length === 0) {
    contenedor.innerHTML = "<p class='text-center'>No hay productos disponibles</p>";
    return;
  }

  contenedor.innerHTML = productos
    .map(
      ({ productoId, nombre, precio, descripcion, imagen }) => `
      <div class="col-12 col-md-4 mb-4">
        <div class="card h-100">
          <img src="${imagen}" class="card-img-top" alt="${nombre}">
          <div class="card-body">
            <h5 class="card-title text-center">${nombre}</h5>
            <p class="card-text text-center">Precio: $${precio.toFixed(2)}</p>
            <p class="card-text text-center">${descripcion}</p>
           <div class="text-center mb-2">
              <button class="btn btn-secondary" onclick="verProducto('${nombre}', '${imagen}', '${descripcion}', ${precio})">
                <i class="bi bi-eye"></i> Ver Producto
              </button>
              <button class="btn btn-primary" onclick="agregarProducto(${productoId})">
                <i class="bi bi-cart"></i> Comprar
              </button>
            </div>
          </div>
        </div>
      </div>`
    )
    .join("");
}

// Eventos de clic en los botones
document.addEventListener("DOMContentLoaded", () => {
  if (mayorButton) {
    mayorButton.addEventListener("click", reloadMayor);
  }
  if (menorButton) {
    menorButton.addEventListener("click", reloadMenor);
  }
});


