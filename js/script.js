// ------------------------------------------
//  GLOBAL VARIABLES
// ------------------------------------------
const gallery = document.getElementById('gallery');
const searchContainer = document.querySelector('.search-container');
const body = document.querySelector('body');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
async function fetchData(url) {
  try {
    const status = await fetch(url);
    const response = await checkStatus(status);
    return response.json();
  } catch (error) {
    return console.log('Looks like there was a problem!', error);
  }
}

// FETCH EMPLOYEES
fetchData('https://randomuser.me/api/?results=12&nat=us').then(data => {
  displayEmployees(data.results);
});

// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

// ------------------------------------------
//  DISPLAY EMPLOYEES
// ------------------------------------------
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
    // Add event listener to each card & pass in the create modal function
    divCard.addEventListener('click', () => {
      createModal(employees, index);
    });
  });
}

//------------------------------------------
// GENERATE MARKUP FOR MODAL
//------------------------------------------
function createModal(data, index) {
  let employee = data[index];
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

  // CLOSE MODAL
  const closeBtn = document.querySelector('.modal-close-btn');

  closeBtn.addEventListener('click', () => {
    modalContainer.remove();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      modalContainer.remove();
    }
  });

  // NEXT/PREVIOUS BUTTONS
  const previousButton = document.getElementById('modal-prev');
  const nextButton = document.getElementById('modal-next');

  nextButton.addEventListener('click', () => {
    if (data[index + 1] !== undefined) {
      modalContainer.remove();
      createModal(data, index + 1);
    } else {
      nextButton.disabled = true;
    }
  });

  previousButton.addEventListener('click', e => {
    if (data[index - 1] !== undefined) {
      modalContainer.remove();
      createModal(data, index - 1);
    } else {
      previousButton.disabled = true;
    }
  });
}

//------------------------------------------
// CREATE SEARCH INPUT
//------------------------------------------
function createForm() {
  const form = document.createElement('form');
  form.action = '#';
  form.method = 'get';
  searchContainer.appendChild(form);
  let inputString = `
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
  `;

  form.insertAdjacentHTML('beforeend', inputString);
}
createForm();

const input = document.getElementById('search-input');
const submit = document.getElementById('search-submit');

input.addEventListener('keyup', () => {
  employeeSearch(input);
});

function employeeSearch(query) {
  const employeeNames = document.querySelectorAll('.card-name');

  for (let name of employeeNames) {
    if (name.innerText.toLowerCase().includes(query.value.toLowerCase())) {
      name.parentElement.parentElement.style.display = '';
    } else {
      name.parentElement.parentElement.style.display = 'none';
    }
  }
}
