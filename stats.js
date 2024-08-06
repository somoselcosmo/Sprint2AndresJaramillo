// stats.js

// URL de la API
const apiUrl = 'https://mindhub-xj03.onrender.com/api/amazing';

// Función para obtener los datos de la API
async function obtenerDatosDeLaApi() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.events;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

// Función para calcular y mostrar las estadísticas
async function mostrarEstadisticas() {
  const eventos = await obtenerDatosDeLaApi();
  if (!eventos) return;

  // Calcular el evento con mayor asistencia
  const eventoConMayorAsistencia = eventos.reduce((prev, current) => {
    return (prev.assistance || 0) > (current.assistance || 0) ? prev : current;
  }, {});

  // Calcular el evento con menor asistencia
  const eventoConMenorAsistencia = eventos.reduce((prev, current) => {
    return (prev.assistance || 0) < (current.assistance || 0) ? prev : current;
  }, {});

  // Calcular el evento con mayor capacidad
  const eventoConMayorCapacidad = eventos.reduce((prev, current) => {
    return (prev.capacity || 0) > (current.capacity || 0) ? prev : current;
  }, {});

  // Actualizar el DOM con los resultados
  document.getElementById('stats-highest-assistance').innerHTML = `
    <tr>
      <td>${eventoConMayorAsistencia.name}</td>
      <td>${eventoConMenorAsistencia.name}</td>
      <td>${eventoConMayorCapacidad.name}</td>
    </tr>
  `;
}



// Llamar a la función mostrarEstadisticas cuando se carga la página
document.addEventListener('DOMContentLoaded', mostrarEstadisticas);
