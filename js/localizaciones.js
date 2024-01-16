getLocations();

async function getLocations() {
  try {
    const apiUrl = `https://eldenring.fanapis.com/api/locations?limit=100`;
    const response = await fetch(apiUrl);

    if (response.ok) {
      const locationsData = await response.json();

      const divContainer = document.querySelector('main');
      const seenNames = new Set();
      let isFirstAlectoAdded = false;

      locationsData.data.forEach(location => {
        if (location.image && !seenNames.has(location.name)) {
          seenNames.add(location.name);

          if (!isFirstAlectoAdded && location.name === 'Alecto, Black Knife Ringleader') {
            isFirstAlectoAdded = true;
            return;
          }

          const locationDiv = createLocationCard(location);
          divContainer.appendChild(locationDiv);
        }
      });

      adjustCardSizes('.charactere');
    } else {
      console.error(`Error fetching data from the API. Status code: ${response.status}`);
    }
  } catch (error) {
    console.error("Error fetching locations:", error);
  }
}

function createLocationCard(location) {
  const locationDiv = document.createElement('div');
  locationDiv.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'col-xl-2', 'card', 'mt-1', 'mb-1', 'mx-1', 'charactere');
  locationDiv.addEventListener('click', () => openModal(location));
  locationDiv.addEventListener('mouseover', function () {
    // Cambia el cursor a 'pointer' cuando se pasa el ratón sobre la carta
    this.style.cursor = 'pointer';
  });

  const image = document.createElement('img');
  image.classList.add('card-img-top', 'img-fluid', 'img-charactere', 'rounded', 'mt-4');
  image.style.width = '100%';
  image.style.height = '150px';
  image.src = location.image;

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body', 'text-center', 'flex-grow-1');

  const name = document.createElement('h3');
  name.classList.add('card-title', 'mb-2', 'fw-bold');
  name.textContent = location.name;

  cardBody.appendChild(name);
  locationDiv.appendChild(image);
  locationDiv.appendChild(cardBody);

  return locationDiv;
}

function adjustCardSizes(selector) {
  const allLocationDivs = document.querySelectorAll(selector);
  let maxHeight = 0;

  allLocationDivs.forEach(div => {
    const divHeight = div.offsetHeight;
    if (divHeight > maxHeight) {
      maxHeight = divHeight;
    }
  });

  allLocationDivs.forEach(div => {
    div.style.height = `${maxHeight}px`;
  });
}

function openModal(location) {
  const modalContent = `
    <div class="modal-dialog modal-dialog-centered modal-md">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${location.name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body text-center">
          <img src="${location.image}" alt="${location.name}" class="img-fluid mb-3" style="height: 260px;">
          <h6 class="mb-3">${location.description}</h6>
        </div>
      </div>
    </div>
  `;

  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade');
  modal.innerHTML = modalContent;

  document.body.appendChild(modal);

  $(modal).modal('show');

  $(modal).on('hidden.bs.modal', function () {
    document.body.removeChild(modal);
  });
}
