
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
            localStorage.setItem("user", JSON.stringify(d[0]));
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
            <a class="btn btn-danger" onclick="EliminarDato('${element.id}')">Eliminar</a>
            <button class="btn btn-secondary" onclick="Editar(this)">Editar</button>
        </td>`;
        tbody.appendChild(fila);

    })  
})

//Crear categorias
let nameCategory = document.getElementById("nameCategory");
let descriptionCategory = document.getElementById("descriptionCategory");
function createCategory(){
  let newCategory = {
    name: nameCategory.value,
    description: descriptionCategory.value
  }
  
  fetch(`http://localhost:3000/categories`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory)
    })
    .then(response => {
        return response.json()
    }).then(data => {
        console.log(data);
    });
  }
  
  
  //Eliminar categorias
  function EliminarDato(id) {
    console.log(id)
  fetch(`http://localhost:3000/categories/${id}`, {
    method: `DELETE`,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    window.location.reload();
    return response.json();
    
  });
}

//Editar Categorias
function Editar(element){

    let padre = (element.parentElement).parentElement
    let id = padre.children[0].textContent;
    let nameEditar = padre.children[1].textContent;
    let descriptionEditar = padre.children[2].textContent;
    console.log(nameEditar);  
  

  let idCategory = document.getElementById("idCategory");
  let modalCategory = document.getElementById("modal-category");
  
  nameCategory.value = nameEditar;
  descriptionCategory.value = descriptionEditar;
  idCategory.value = id;

  let datosEditados = {
    name: nameCategory.value,
    description: descriptionCategory.value
  }


  fetch(`https://memin.io/public/api/users/${id}`,{
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(datosEditados)
      })
      .then(response => {
          return response.json()
      }).then(data => {
          console.log(data);
          window.location.reload();
      });

}


