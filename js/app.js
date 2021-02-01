const gallery = document.getElementById('gallery');
const search = document.querySelector('.search-container');
const body = document.querySelector('body');
// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return console.log('Looks like there was a problem!', error);
  }
}

// FETCH EMPLOYEES
fetchData('https://randomuser.me/api/?results=12&nat=us').then(data => {
  displayEmployees(data.results);
});

// DISPLAY EMPLOYEES ON PAGE
function displayEmployees(employees) {
  let htmlString;

  employees.forEach((employee, index) => {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    gallery.appendChild(divCard);

    htmlString = `
  
    <div class="card-img-container">
      <img class="card-img" src=${employee.picture.large} alt="profile picture">
    </div>
    <div class="card-info-container">
      <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
      <p class="card-text">${employee.email}</p>
      <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
    </div>
  
  `;
    divCard.insertAdjacentHTML('beforeend', htmlString);
    divCard.addEventListener('click', () => {
      createModal(employees, index);
    });
  });
}
// GENERATE THE SEARCH INPUT
function createForm() {
  const form = `
    <form action="#" method="get">
      <input type="search" id="search-input" class="search-input" placeholder="Search...">
      <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  </form>
    `;

  search.insertAdjacentHTML('beforeend', form);
}
createForm();

// GENERATE MARKUP FOR THE MODAL
function createModal(data, index) {
  const employee = data[index];
  let modalDiv;
  let buttonString;
  let birthday = new Date(employee.dob.date);
  let month = birthday.getMonth();
  let day = birthday.getDay();
  let year = birthday.getFullYear();
  let formattedBirthday = `${month} / ${day} / ${year}`;
  let address = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;

  const modalContainer = document.createElement('div');
  modalContainer.className = 'modal-container';
  body.appendChild(modalContainer);

  modalDiv = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src=${employee.picture.large} alt="profile picture">
          <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
          <p class="modal-text">${employee.email}</p>
          <p class="modal-text cap">${employee.location.city}</p>
          <hr>
          <p class="modal-text">${employee.cell}</p>
          <p class="modal-text">${address}</p>
          <p class="modal-text">Birthday: ${formattedBirthday}</p>
        </div>
    </div>
    `;
  modalContainer.insertAdjacentHTML('beforeend', modalDiv);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'modal-btn-container';
  modalContainer.appendChild(buttonContainer);
  buttonString = `
    <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
    <button type="button" id="modal-next" class="modal-next btn">Next</button>
  `;
  buttonContainer.insertAdjacentHTML('beforeend', buttonString);

  const closeBtn = document.querySelector('.modal-close-btn');

  closeBtn.addEventListener('click', () => {
    modalContainer.remove();
  });
}

// ------------------------------------------
//  MODAL
// ------------------------------------------
