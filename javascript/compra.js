document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const listaCompra = document.querySelector("#lista-compra tbody");
    const totalProceso = document.querySelector("#totalProceso");
    const procesarCompraForm = document.querySelector("#procesar-pago");
  
    if (!carrito.length) {
      Swal.fire({
        title: "¡Carrito vacío!",
        text: "No hay productos en el carrito. Redirigiendo a la tienda...",
        icon: "error",
        confirmButtonText: "Aceptar",
      }).then(() => {
        location.href = "tienda.html";
      });
      return;
    }
  
    // Mostrar productos en el carrito
    carrito.forEach(({ productoId, nombre, precio, cantidad, imagen }) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td><img src="${imagen}" width="50" alt="${nombre}"></td>
        <td>${nombre}</td>
        <td>$${precio.toFixed(2)}</td>
        <td>${cantidad}</td>
        <td>$${(precio * cantidad).toFixed(2)}</td>
      `;
      listaCompra.appendChild(row);
    });
  
    // Calcular total
    const total = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0);
    totalProceso.textContent = `$${total.toFixed(2)}`;
  
    // Manejar el envío del formulario
    procesarCompraForm.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const cliente = document.querySelector("#cliente").value.trim();
      const correo = document.querySelector("#correo").value.trim();
  
      if (!cliente || !correo) {
        Swal.fire({
          title: "Error",
          text: "Por favor completa los campos de cliente y correo.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
        return;
      }
  
      try {
        // Enviar datos al backend
        const response = await fetch(`https://localhost:7082/api/orden/registrar-venta?ClienteId=1`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(carrito),
        });
  
        if (!response.ok) {
          const error = await response.json();
          Swal.fire({
            title: "Error al finalizar la compra",
            text: error.descripcion || "Ocurrió un error inesperado.",
            icon: "error",
            confirmButtonText: "Aceptar",
          });
          return;
        }
  
        // Mostrar mensaje de éxito
        Swal.fire({
          title: "¡Compra finalizada!",
          text: "Gracias por tu compra.",
          icon: "success",
          confirmButtonText: "Aceptar",
        }).then(() => {
          localStorage.removeItem("carrito"); // Vaciar carrito
          location.href = "index.html"; // Redirigir al inicio
        });
      } catch (error) {
        console.error("Error al finalizar la compra:", error);
        Swal.fire({
          title: "Error",
          text: "No se pudo completar la compra. Inténtalo más tarde.",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    });
  });
  
  