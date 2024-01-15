

getClasses();

async function getClasses() {
    try {
      const apiUrl = `https://eldenring.fanapis.com/api/classes`;
      const response = await fetch(apiUrl);
      const classesData = await response.json();
  
      const divContainer = document.querySelector('main');
  
      if (response.ok) {
        classesData.data.forEach(character => {
          let classDiv = document.createElement('div');
          classDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2',
            'card', 'mt-1', 'mb-1', 'mx-1', 'col-2', 'charactere');
  
          // Agregar evento de clic para abrir la ventana modal
          classDiv.addEventListener('click', () => openModal(character));
  
          let image = document.createElement('img');
          image.classList.add('card-img-top', 'img-fluid', 'img-charactere', 'pt-2', 'rounded');
          image.src = character.image;
  
          let cardBody = document.createElement('div');
          cardBody.classList.add('card-body', 'text-center', 'flex-grow-1');
  
          let name = document.createElement('h3');
          name.classList.add('card-title', 'mb-2', 'fw-bold');
          name.textContent = character.name;
  
          cardBody.appendChild(name);
          classDiv.appendChild(image);
          classDiv.appendChild(cardBody);
          divContainer.appendChild(classDiv);
        });
      } else {
        console.error(`Error al obtener los datos de la API. Código de estado: ${response.status}`);
      }
    } catch (error) {
      console.error("Error al obtener personajes:", error);
    }
}

function openModal(character) {
  // Crear el contenido de la ventana modal con estadísticas y gráfico de barras
  const modalContent = `
    <div class="modal-dialog modal-dialog-centered modal-md" style="height:50%">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${character.name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center" >
          <img src="${character.image}" alt="${character.name}" class="img-fluid mb-3" style="height: 260px;">
          <h6 class="mb-3">${character.description}</h6>
          <canvas id="barChart" width="50" height="50"></canvas> <!-- Cambiado el tamaño del canvas -->
        </div>
      </div>
    </div>
  `;

  // Crear la ventana modal
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.innerHTML = modalContent;

  // Agregar la ventana modal al cuerpo del documento
  document.body.appendChild(modal);

  // Mostrar la ventana modal
  $(modal).modal('show');

  // Eliminar la ventana modal del DOM después de cerrarla
  $(modal).on('hidden.bs.modal', function () {
    document.body.removeChild(modal);
  });

  // Crear el gráfico de barras
  createRadarChart(character.stats);
}

function createRadarChart(stats) {
  const labels = Object.keys(stats);
  const data = Object.values(stats);

  const ctx = document.getElementById('barChart').getContext('2d');

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Stats',
        data: data,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
      }]
    },
    options: {
      scales: {
        r: {
          beginAtZero: true,
          max: Math.max(...data) + 2
        }
      }
    }
  });
}

