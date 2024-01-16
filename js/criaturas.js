getcreaturees();

async function getcreaturees() {
  try {
    const apiUrl = `https://eldenring.fanapis.com/api/creatures?limit=100`;
    const response = await fetch(apiUrl);
    const creaturesData = await response.json();

    const divContainer = document.querySelector('main');
    const seenNames = new Set();
    let isFirstAlectoAdded = false;

    if (response.ok) {
      creaturesData.data.forEach(creature => {
        // Verificar si el creature tiene una imagen y no tiene el mismo nombre antes de crear la carta
        if (creature.image && !seenNames.has(creature.name)) {
          seenNames.add(creature.name);

          if (!isFirstAlectoAdded && creature.name === 'Alecto, Black Knife Ringleader') {
            isFirstAlectoAdded = true;
            return; // Saltar la primera aparición de Alecto
          }

          let creatureDiv = document.createElement('div');
          creatureDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2',
            'card', 'mt-1', 'mb-1', 'mx-1', 'charactere');

          // Agregar evento de clic para abrir la ventana modal
          creatureDiv.addEventListener('click', () => openModal(creature));
          creatureDiv.addEventListener('mouseover', function() {
            // Cambia el cursor a 'pointer' cuando se pasa el ratón sobre la carta
            this.style.cursor = 'pointer';
        });

          let image = document.createElement('img');
          image.classList.add('card-img-top', 'img-fluid', 'img-charactere', 'rounded', 'mt-4');

          // Establecer un tamaño específico para las imágenes
          image.style.width = '100%';
          image.style.height = '150px'; // Puedes ajustar la altura según tus necesidades
          image.src = creature.image;

          let cardBody = document.createElement('div');
          cardBody.classList.add('card-body', 'text-center', 'flex-grow-1');

          let name = document.createElement('h3');
          name.classList.add('card-title', 'mb-2', 'fw-bold');
          name.textContent = creature.name;

          cardBody.appendChild(name);
          creatureDiv.appendChild(image);
          creatureDiv.appendChild(cardBody);

          // Agregar un espacio para mostrar el nombre
          divContainer.appendChild(creatureDiv);
        }
      });

      // Ajustar el tamaño de todas las cartas al mismo tamaño
      const allcreatureDivs = document.querySelectorAll('.charactere');
      let maxHeight = 0;

      allcreatureDivs.forEach(div => {
        const divHeight = div.offsetHeight;
        if (divHeight > maxHeight) {
          maxHeight = divHeight;
        }
      });

      allcreatureDivs.forEach(div => {
        div.style.height = `${maxHeight}px`;
      });
    } else {
      console.error(`Error al obtener los datos de la API. Código de estado: ${response.status}`);
    }
  } catch (error) {
    console.error("Error al obtener personajes:", error);
  }
}

 
  function openModal(creature) {
    // Crear el contenido de la ventana modal con estadísticas y gráfico radar
    const modalContent = `
      <div class="modal-dialog modal-dialog-centered modal-md"> <!-- Cambiado a modal-md -->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${creature.name}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body text-center">
            <img src="${creature.image}" alt="${creature.name}" class="img-fluid mb-3" style="height: 260px;">
            <h6 class="mb-3">${creature.description}</h6>
            <h5 class="mb-3">Location: ${creature.location}</h5>
            <h5 class="mb-2">Drops:</h5>
            <ul class="list-unstyled">
              ${creature.drops.map(drop => `<li>${drop}</li>`).join('')}
            </ul>
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
  
  }

