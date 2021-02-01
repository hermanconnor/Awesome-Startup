// // ------------------------------------------
// //  FETCH FUNCTIONS
// // ------------------------------------------
// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     return console.log('Looks like there was a problem!', error);
//   }
// }

// // fetchData('https://randomuser.me/api/?results=100&nat=us').then(data => {
// //   console.log(data);
// // });
// // ------------------------------------------
// //  HELPER FUNCTIONS
// // ------------------------------------------

// const gallery = document.querySelector('.gallery');

// // FETCH EMPLOYEES
// let employees;
// function displayEmployees() {
//   fetchData('https://randomuser.me/api/?results=12&nat=us').then(data => {
//     employees = data.results;

//     buildEmployees(employees);
//     createModal(employees);
//     const cards = document.querySelectorAll('.card');
//     cards.forEach(card => {
//       card.addEventListener('click', e => {
//         console.log(e.target);
//       });
//     });
//   });
// }

// // GENERATE THE MARKUP FOR EACH PROFILE
// function buildEmployees(data) {
//   let htmlString;

//   // Create the DOM elements
//   htmlString = `
//         <div class="card">
//           <div class="card-img-container">
//             <img class="card-img" src=${employee.picture.large} alt="profile picture">
//           </div>
//           <div class="card-info-container">
//             <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
//             <p class="card-text">${employee.email}</p>
//             <p class="card-text cap">${employee.location.city}, ${employee.location.state}</p>
//           </div>
//         </div>
//       `;

//   // Insert the created elements to the page
//   gallery.insertAdjacentHTML('beforeend', htmlString);
// }
// displayEmployees();

// function createModal(arr) {
//   let modalDiv;
//   arr.forEach(employee => {
//     let month = `${employee.dob.date.slice(5, 7)}`;
//     let day = `${employee.dob.date.slice(8, 10)}`;
//     let year = `${employee.dob.date.slice(0, 4)}`;
//     let address = `${employee.location.street.number} ${employee.location.street.name}, ${employee.location.city}, ${employee.location.state} ${employee.location.postcode}`;
//     let birthday = `${month} / ${day} / ${year}`;

//     // GENERATE MARKUP FOR THE MODAL
//     modalDiv = `
//       <div class ="modal-container hidden">
//         <div class="modal">
//           <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//           <div class="modal-info-container">
//             <img class="modal-img" src=${employee.picture.large} alt="profile picture">
//             <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
//             <p class="modal-text">${employee.email}</p>
//             <p class="modal-text cap">${employee.location.city}</p>
//             <hr>
//             <p class="modal-text">${employee.cell}</p>
//             <p class="modal-text">${address}</p>
//             <p class="modal-text">Birthday: ${birthday}</p>
//           </div>
//         </div>
//         <div class="modal-btn-container">
//           <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
//           <button type="button" id="modal-next" class="modal-next btn">Next</button>
//         </div>
//       </div>
//     `;

//     gallery.insertAdjacentHTML('beforeend', modalDiv);
//   });
// }

// // CREATE SEARCH FORM
// function createForm() {
//   const search = document.querySelector('.search-container');

//   const form = `
//   <form action="#" method="get">
//     <input type="search" id="search-input" class="search-input" placeholder="Search...">
//     <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
// </form>
//   `;

//   search.insertAdjacentHTML('beforeend', form);
// }
// createForm();

// ///////////////////Elements
// const searchInput = document.querySelector('.search-input');

// function searchEmployees() {
//   const query = searchInput.value.toLowerCase();
//   const queryResults = employees.filter(employee => {
//     const employeeName = `${employee.name.first} ${employee.name.last}`;
//     return employeeName.toLowerCase().includes(query);
//   });

//   if (queryResults !== '') {
//     buildEmployees(queryResults, 1);
//   }
// }

// // const modal;

// const closeModalBtn = document.querySelector('.modal-close-btn');
// const modal = document.querySelector('.modal-container');

// // Modal
// function openModal() {
//   modal.classList.remove('hidden');
//   overlay.classList.remove('hidden');
// }

// function closeModal() {
//   modal.classList.add('hidden');
//   overlay.classList.add('hidden');
// }

// // ------------------------------------------
// //  EVENT LISTENERS
// // ------------------------------------------
// searchInput.addEventListener('keyup', searchEmployees);

// Global variables

const userData = 'https://randomuser.me/api/?results=12&nat=gb,us';
const galleryDiv = document.getElementById('gallery');
const pageBody = document.querySelector('body');
const searchBox = document.querySelector('.search-container');

/* functions for grabbing data and error management */
function fetchData(url) {
  return fetch(url)
    .then(checkStatus)
    .then(res => res.json())
    .catch(error => console.log('Looks like there was a problem', error));
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  }
  return Promise.reject(new Error(response.statusText()));
}

/* grabs data and passes to generate users 
calls search bar function once user promise resolved html user cards required for search availability */

fetchData(userData)
  .then(data => generateUsers(data.results))
  .then(search);

/* populates the page with a random selection of employees */
function generateUsers(data) {
  data
    .map((person, index) => {
      const userCard = document.createElement('div');
      galleryDiv.appendChild(userCard);
      userCard.className = 'card';
      userCard.innerHTML = `<div class="card-img-container">
          <img class="card-img" src=${person.picture.large} alt="profile picture">
       </div>
       <div class="card-info-container">
         <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
         <p class="card-text">${person.email}</p>
         <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
				</div>`;

      userCard.addEventListener('click', event => {
        userModal(data, index);
      });
    })
    .join(''); // to remove html commas on map

  return data;
}

/* creates a modal window based on selection along with previous and next buttons */
function userModal(data, personIndex) {
  const person = data[personIndex];
  const { date } = person.dob;
  let dob = date.split('T')[0];
  dob = dob.split('-').reverse().join('-');
  const modalWindow = document.createElement('div');
  // append modal htnl to page
  pageBody.appendChild(modalWindow);
  modalWindow.className = 'modal-container';
  modalWindow.innerHTML = `<div class="modal">
       <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
          <img class="modal-img" src=${person.picture.large} alt="profile picture">
           <h3 id="name" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
           <p class="modal-text">${person.email}</p>
           <p class="modal-text cap">${person.location.city}</p>
           <hr>
           <p class="modal-text">${person.cell}</p>
           <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.city}, ${person.location.postcode}</p>
           <p class="modal-text">Birthday: ${dob}</p>
				 </div>`;

  // button to exit window
  const closeButton = document.getElementById('modal-close-btn');

  closeButton.addEventListener('click', event => {
    modalWindow.remove();
  });

  // Prev and next employee buttons plus functionality

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'modal-btn-container';
  // append buttons to window
  modalWindow.appendChild(buttonContainer);
  buttonContainer.innerHTML = `<button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
     <button type="button" id="modal-next" class="modal-next btn">Next</button>`;
  // button functionality
  const nextButton = document.getElementById('modal-next');
  const prevButton = document.getElementById('modal-prev');

  if (data[personIndex + 1] != null) {
    nextButton.style.display = ' ';
  } else {
    nextButton.style.display = 'none';
  }

  if (data[personIndex - 1] != null) {
    prevButton.style.display = ' ';
  } else {
    prevButton.style.display = 'none';
  }

  nextButton.addEventListener('click', event => {
    modalWindow.remove();
    userModal(data, personIndex + 1);
  });

  prevButton.addEventListener('click', event => {
    modalWindow.remove();
    userModal(data, personIndex - 1);
  });
}

/* creates functional searchBar */
function search() {
  const searchBar = document.createElement('form');
  searchBar.action = '#';
  searchBar.method = 'get';
  searchBar.innerHTML = `<input type="search" id="search-input" class="search-input" placeholder="Search...">
   <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">`;

  // append search to page and reference items
  searchBox.appendChild(searchBar);
  const cards = document.querySelectorAll('.card');
  const searchField = document.getElementById('search-input');
  const button = document.getElementById('search-submit');

  /* creates search bar functionality(click and keyup) */
  function searchEmployees(searchInput, names) {
    const searchContent = searchInput.value;
    const input = searchContent.toString().toLowerCase();

    for (let i = 0; i < names.length; i += 1) {
      const searchName = names[i].querySelector('h3');
      const stringName = searchName.textContent.toString().toLowerCase();
      const match = stringName.indexOf(input);

      if (match !== -1) {
        names[i].style.display = '';
      } else {
        names[i].style.display = 'none';
      }
    }
  }

  // event listener for submit button
  button.addEventListener('click', event => {
    event.preventDefault();
    searchEmployees(searchField, cards);
  });
  // reactive event listener for searchbar entry
  searchField.addEventListener('keyup', () => {
    searchEmployees(searchField, cards);
  });
}
