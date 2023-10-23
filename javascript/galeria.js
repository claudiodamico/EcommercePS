var urlProducto1 = "https://localhost:7082/api/productos/1";
var urlProducto2 = "https://localhost:7082/api/productos/2";
var urlProducto3 = "https://localhost:7082/api/productos/3";
var urlProducto4 = "https://localhost:7082/api/productos/4";
var urlProducto5 = "https://localhost:7082/api/productos/5";
var urlProducto6 = "https://localhost:7082/api/productos/6";

fetch(urlProducto1)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const img1 = document.getElementById('img1');
        const nombre1 = document.createElement('nombre1');
        nombre1.innerText = data.nombre;
        const marca1 = document.getElementById('marca1');
        marca1.innerText = data.marca;
        const precio1 = document.getElementById('precio1');
        precio1.innerText = '$' + data.precio;
        const descripcion1 = document.getElementById('descripcion1');
        descripcion1.innerText = data.descripcion;
        
        img1.src = data.imagen; 
    });

    fetch(urlProducto2)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const img2 = document.getElementById('img2');
        const nombre2 = document.createElement('nombre2');
        nombre2.innerText = data.nombre;
        const marca2 = document.getElementById('marca2');
        marca2.innerText = data.marca;
        const precio2 = document.getElementById('precio2');
        precio2.innerText = '$' + data.precio;
        const descripcion2 = document.getElementById('descripcion2');
        descripcion2.innerText = data.descripcion;
        
        img2.src = data.imagen; 
    });

    fetch(urlProducto3)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const img3 = document.getElementById('img3');
        const nombre3 = document.createElement('nombre3');
        nombre3.innerText = data.nombre;
        const marca3 = document.getElementById('marca3');
        marca3.innerText = data.marca;
        const precio3 = document.getElementById('precio3');
        precio3.innerText = '$' + data.precio;
        const descripcion3 = document.getElementById('descripcion3');
        descripcion3.innerText = data.descripcion;
        
        img3.src = data.imagen; 
    });

    fetch(urlProducto4)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const img4 = document.getElementById('img4');
        const nombre4 = document.createElement('nombre4');
        nombre4.innerText = data.nombre;
        const marca4 = document.getElementById('marca4');
        marca4.innerText = data.marca;
        const precio4 = document.getElementById('precio4');
        precio4.innerText = '$' + data.precio;
        const descripcion4 = document.getElementById('descripcion4');
        descripcion4.innerText = data.descripcion;
        
        img4.src = data.imagen; 
    });

    fetch(urlProducto5)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const img5 = document.getElementById('img5');
        const nombre5 = document.createElement('nombre5');
        nombre5.innerText = data.nombre;
        const marca5 = document.getElementById('marca5');
        marca5.innerText = data.marca;
        const precio5 = document.getElementById('precio5');
        precio5.innerText = '$' + data.precio;
        const descripcion5 = document.getElementById('descripcion5');
        descripcion5.innerText = data.descripcion;
        
        img5.src = data.imagen; 
    });

    fetch(urlProducto6)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        const img6 = document.getElementById('img6');
        const nombre6 = document.createElement('nombre6');
        nombre6.innerText = data.nombre;
        const marca6 = document.getElementById('marca6');
        marca6.innerText = data.marca;
        const precio6 = document.getElementById('precio6');
        precio6.innerText = '$' + data.precio;
        const descripcion6 = document.getElementById('descripcion6');
        descripcion6.innerText = data.descripcion;
        
        img6.src = data.imagen; 
    });