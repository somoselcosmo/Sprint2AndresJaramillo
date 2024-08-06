const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';

let estadoDeLaAplicacion = {
  eventos: [],
  categoriasSeleccionadas: []
};

function obtenerDatosDeLaApi() {
  fetch(apiUrl)
    .then(response => response.json())
    .then(dataDesdeApi => {
      estadoDeLaAplicacion.eventos = dataDesdeApi.events.filter(evento => evento.date > "2023-03-10");
      const categoriasUnicas = obtenerCategoriasUnicas(estadoDeLaAplicacion.eventos);
      pintarCategorias(categoriasUnicas);
      pintarTarjetas(estadoDeLaAplicacion.eventos);
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

function obtenerCategoriasUnicas(eventos) {
  return [...new Set(eventos.map(evento => evento.category))];
}

obtenerDatosDeLaApi();

function pintarCategorias(categorias) {
  let contenedor = document.getElementById("checkbox");
  contenedor.innerHTML = "";
  categorias.forEach((category) => {
    let checkbox = document.createElement("div");
    checkbox.className = "col-sm-6 col-md-4 col-lg-1 che form-check";
    checkbox.innerHTML = `
      <input class="form-check-input" type="checkbox" value="" id="${category}">
      <label class="form-check-label" for="${category}">
        ${category}
      </label>
    `;
    contenedor.appendChild(checkbox);
    document.getElementById(category).addEventListener("change", (event) => {
      manejarCategoria(event.target.id, event.target.checked);
    });
  });
}

function manejarCategoria(category, checked) {
  if (checked) {
    estadoDeLaAplicacion.categoriasSeleccionadas.push(category);
  } else {
    estadoDeLaAplicacion.categoriasSeleccionadas = estadoDeLaAplicacion.categoriasSeleccionadas.filter((c) => c !== category);
  }
  actualizarTarjetas();
}

function actualizarTarjetas() {
  let eventosFiltrados = new Set();
  if (estadoDeLaAplicacion.categoriasSeleccionadas.length === 0) {
    eventosFiltrados = new Set(estadoDeLaAplicacion.eventos);
  } else {
    estadoDeLaAplicacion.categoriasSeleccionadas.forEach((c) => {
      estadoDeLaAplicacion.eventos.filter(event => event.category === c).forEach(event => eventosFiltrados.add(event));
    });
  }
  pintarTarjetas([...eventosFiltrados]);
}

function pintarTarjetas(eventos) {
  let contenedor = document.getElementById("cards");
  contenedor.innerHTML = "";

  if (eventos.length === 0) {
    contenedor.innerHTML = `
      <div class="alert alert-warning d-flex align-items-center" role="alert">
        <div>
          <i class="bi bi-exclamation-triangle-fill"></i>
          <span class="ms-2">No se encontraron resultados para tu búsqueda.</span>
        </div>
      </div>
    `;
  } else {
    eventos.forEach((evento) => {
      let tarjeta = document.createElement("div");
      tarjeta.className = "col-sm-6 col-md-4 col-lg-3 mb-4";
      tarjeta.innerHTML = `
        <div class="card">
          <img src=${evento.image} class="card-img-top" alt="...">
          <div class="card-body d-flex flex-column justify-content-between">
            <h4 class="card-title text-center">${evento.name}</h4>
            <p class="card-text">${evento.description}</p>
            <div class="navbar">
              <p class="aaa m-0 text-success-emphasis">$ ${evento.price}</p>
              <a href="./details.html?id=${evento._id}" class="btn bg-danger-subtle">Details</a>
            </div>
          </div>
        </div>
      `;
      contenedor.appendChild(tarjeta);
    });
  }
}


document.querySelector('.form-control[type="search"]').addEventListener('input', manejarBusqueda);

function manejarBusqueda() {
  const textoDeBusqueda = document.querySelector('.form-control[type="search"]').value;
  buscarYFiltrarEventos(textoDeBusqueda);
}

function buscarYFiltrarEventos(textoDeBusqueda) {
  let eventosFiltradosPorBusqueda = estadoDeLaAplicacion.eventos.filter(evento => 
    evento.name.toLowerCase().includes(textoDeBusqueda.toLowerCase()) ||
    evento.description.toLowerCase().includes(textoDeBusqueda.toLowerCase())
  );

  let eventosFiltradosFinales;
  if (estadoDeLaAplicacion.categoriasSeleccionadas.length > 0) {
    eventosFiltradosFinales = eventosFiltradosPorBusqueda.filter(evento => 
      estadoDeLaAplicacion.categoriasSeleccionadas.includes(evento.category)
    );
  } else {
    eventosFiltradosFinales = eventosFiltradosPorBusqueda;
  }

  pintarTarjetas(eventosFiltradosFinales);
}
