// details.js

// Función para obtener el ID del evento desde la URL
function obtenerIdDesdeUrl() {
  const parametrosUrl = new URLSearchParams(window.location.search);
  return parametrosUrl.get('id');
}

// Función para obtener los detalles del evento usando el ID
function obtenerDetallesEvento(id) {
  fetch('https://mindhub-xj03.onrender.com/api/amazing')
    .then(response => response.json())
    .then(dataDesdeApi => {
      const evento = dataDesdeApi.events.find(evento => evento._id == id);
      if (evento) {
        pintarDetallesEvento(evento);
      } else {
        // Manejar el caso de que el evento no se encuentre
        console.error('Evento no encontrado');
      }
    })
    .catch(error => console.error('Error al obtener los datos:', error));
}

// Función para mostrar los detalles del evento en la página
function pintarDetallesEvento(evento) {
  const contenedor = document.getElementById('event-detail');
  // Aquí puedes crear el HTML para mostrar los detalles del evento
  // Por ejemplo:
  contenedor.innerHTML = `
  <div class="row">
    <div class="col-md-7 col-sm-12 d-flex justify-content-center">
    <img src="${evento.image}" class="card-img-top" alt="${evento.name}"">
    </div>
    <div class="card-body col-md-4 col-sm-12 m-3 d-flex flex-column justify-content-center">
      <h4 class="card-title fw-bold ms-3 pb-3" id="evento-name-${evento._id}">${evento.name}</h4>
      <p class="card-text ms-3" id="evento-description-${evento._id}">${evento.description}</p>
      <ul class="list-group list-group-flush">
        <li class="list-group-item" id="evento-date-${evento._id}">Date: ${evento.date}</li>
        <li class="list-group-item" id="evento-place-${evento._id}">Place: ${evento.place}</li>
        <li class="list-group-item" id="evento-price-${evento._id}">Price: $${evento.price}</li>
        <li class="list-group-item" id="evento-category-${evento._id}">Category: ${evento.category}</li>
        <li class="list-group-item" id="evento-category-${evento._id}">Capacity: ${evento.capacity}</li>
        <li class="list-group-item" id="evento-attendees-${evento._id}">${evento.assistance ? 'Assistance: ' + evento.assistance : 'Stimated: ' + evento.estimate}</li>
      </ul>
    </div>
  </div>
`;
}

// Llamada inicial para obtener los detalles del evento
const idEvento = obtenerIdDesdeUrl();
if (idEvento) {
  obtenerDetallesEvento(idEvento);
}
