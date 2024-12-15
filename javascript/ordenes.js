const API_URL_BalanceDiario = "https://localhost:7082/api/orden/balance-diario";

document.addEventListener("DOMContentLoaded", () => {
  const btnBalance = document.querySelector("#btn-balance");
  if (btnBalance) {
    btnBalance.addEventListener("click", getBalanceDiario);
  } else {
    console.warn("El botón 'btn-balance' no existe en la página.");
  }
});

function getBalanceDiario() {
  fetch(API_URL_BalanceDiario)
    .then(response => {
      if (!response.ok) throw new Error("Error al obtener el balance diario");
      return response.json();
    })
    .then(data => {
      mostrarBalance(data);
    })
    .catch(error => {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "No se pudo cargar el balance diario.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    });
}

function mostrarBalance(datos) {
  const res = document.querySelector("#res");
  res.innerHTML = "";

  if (datos.length === 0) {
    res.innerHTML = `<tr><td colspan="4" class="text-center">No hay ventas registradas para hoy.</td></tr>`;
    return;
  }

  let totalBalance = 0;

  datos.forEach(item => {
    res.innerHTML += `
      <tr>
        <td class="text-center">${item.ordenId}</td>
        <td class="text-center">${new Date(item.fecha).toLocaleString()}</td>
        <td class="text-center">$${item.total}</td>
      </tr>
    `;
    totalBalance += item.total;
  });

  res.innerHTML += `
    <tr>
      <td colspan="2" class="text-end"><strong>Total del Balance Diario:</strong></td>
      <td class="text-center"><strong>$${totalBalance.toFixed(2)}</strong></td>
    </tr>
  `;
}
