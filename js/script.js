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

// fetchData('https://randomuser.me/api/?results=100&nat=us').then(data => {
//   console.log(data);
// });
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

const gallery = document.querySelector('.gallery');

// FETCH EMPLOYEES
let employees;
function displayEmployees() {
  fetchData('https://randomuser.me/api/?results=100&nat=us').then(data => {
    employees = data.results;
    buildEmployees(employees, 1);
    createModal(employees);
  });
}

// GENERATE THE MARKUP FOR EACH PROFILE
function buildEmployees(data, page) {
  // Calculate the index for first and last employee to display
  const startIndex = page * 12 - 12;
  const endIndex = page * 12;

  // Set the variable used to construct/append DOM elements

  let htmlString;

  for (let i = 0; i < data.length; i++) {
    let employee = data[i];
    if (i >= startIndex && i < endIndex) {
      // Create the DOM elements
      htmlString = `
        <div class="card">
          <div class="card-img-container">
            <img class="card-img" src=${employee.picture.large} alt="profile picture">
          </div>
          <div class="card-info-container">
            <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
            <p class="card-text">${employee.email}</p>
            <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
          </div>
        </div>           
      `;

      // Insert the created elements to the page
      gallery.insertAdjacentHTML('beforeend', htmlString);
    }
  }
}
displayEmployees();

function createModal(arr) {
  let modal;
  arr.forEach(employee => {
    let month = `${employee.dob.date.slice(5, 7)}`;
    let day = `${employee.dob.date.slice(8, 10)}`;
    let year = `${employee.dob.date.slice(0, 4)}`;
    let address = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
    let birthday = `${month} / ${day} / ${year}`;

    // GENERATE MARKUP FOR THE MODAL
    modalDiv = `
      <div class ="modal-container">
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
            <p class="modal-text">Birthday: ${birthday}</p>
          </div>
        </div>
        <div class="modal-btn-container">
          <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
          <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
      </div>         
    `;

    gallery.insertAdjacentHTML('afterbegin', modalDiv);
  });
}

// CREATE SEARCH FORM
function createForm() {
  const search = document.querySelector('.search-container');

  const form = `
  <form action="#" method="get">
    <input type="search" id="search-input" class="search-input" placeholder="Search...">
    <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>
  `;

  search.insertAdjacentHTML('beforeend', form);
}
createForm();

///////////////////Elements
const searchInput = document.querySelector('.search-input');

function searchEmployees() {
  const query = searchInput.value.toLowerCase();
  const queryResults = employees.filter(employee => {
    const employeeName = `${employee.name.first} ${employee.name.last}`;
    return employeeName.toLowerCase().includes(query);
  });

  if (queryResults !== '') {
    buildEmployees(queryResults, 1);
  }
}

// const modal;
const closeModalBtn = document.querySelector('.modal-close-btn');
const modal = document.querySelector('.modal-container');
// Modal
function openModal() {
  modal.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
}

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------

searchInput.addEventListener('keyup', searchEmployees);
