// funciones.js
export const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';

export function obtenerDatosDeLaApi(url, filtroFecha) {
  return fetch(url)
    .then(response => response.json())
    .then(dataDesdeApi => {
      if (filtroFecha) {
        return dataDesdeApi.events.filter(evento => filtroFecha(evento.date));
      }
      return dataDesdeApi.events;
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

export function obtenerCategoriasUnicas(eventos) {
  return [...new Set(eventos.map(evento => evento.category))];
}

export function pintarCategorias(categorias, contenedorId) {
  let contenedor = document.getElementById(contenedorId);
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
  });
}

export function manejarCategoria(estadoDeLaAplicacion, category, checked) {
  if (checked) {
    estadoDeLaAplicacion.categoriasSeleccionadas.push(category);
  } else {
    estadoDeLaAplicacion.categoriasSeleccionadas = estadoDeLaAplicacion.categoriasSeleccionadas.filter((c) => c !== category);
  }
}

export function pintarTarjetas(eventos, contenedorId) {
  let contenedor = document.getElementById(contenedorId);
  contenedor.innerHTML = "";
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
