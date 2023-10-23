const urlOrdenes = "https://localhost:7082/api/orden";

document.querySelector('#btn').addEventListener('click', getOrdenes);

function getOrdenes(){

    const xhttp = new XMLHttpRequest();

    xhttp.open('GET', urlOrdenes, true);

    xhttp.send();

    xhttp.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#res');
            res.innerHTML = '';

            for(let item of datos){
                res.innerHTML += `              
                <tr class="large">
                    <th class="text-center">${item.ordenId}</th>
                    <th class="text-center">${item.productos[0].nombre}</th>
                    <th class="text-center">${new Date(item.fecha).toLocaleString()}</th>
                    <th class="text-center">$${item.total}</th>
                </tr>
                `
            }          
        }
    }
}