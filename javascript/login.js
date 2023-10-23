document.getElementById("boton-id").addEventListener("click", buscarId);

function buscarId() {
    
    console.log("Se escucha el evento")
    let usuario = document.getElementById("user-id").value
    const userId = localStorage.setItem('UserId',usuario);
}


