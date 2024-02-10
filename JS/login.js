
// VERIFICACION DEL LOGIN
function logIn() {
    let email = document.getElementById("email");
    let password = document.getElementById("password");

    fetch("http://localhost:3000/users")
      .then((r) => r.json())
      .then((d) => {
        let resultado = d.filter(function (element) {
          return element.email == email.value;
        });
        console.log(email.value)
        console.log(resultado);
        if (resultado.length > 0) {
          if (resultado[0].password == password.value) {
            location.href = "./administrator.html";
          } else {
            console.log("usuario o contraseña invalidos¡");
          }
        } else {
          console.log("No hay coincidencia");
        }
      });
  }



// OBTENER LOS DATOS DEL JSON DE LAS CATEGORIAS
let resultados = fetch("http://localhost:3000/categories")
.then(response => {
    return response.json()
}).then(data => {
    data.forEach(function(element){  
        console.log(data)
        let tbody = document.getElementById("categorias-tbody");

        let fila = document.createElement("tr");
        fila.innerHTML = `
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.description}</td>
        <td>
            <a class="btn btn-danger" onclick="EliminarDato()">Eliminar</a>
            <button class="btn btn-secondary" onclick="Editar()">Editar</button>
        </td>`;
        tbody.appendChild(fila);

    })  
})