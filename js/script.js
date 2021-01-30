// fetch('https://randomuser.me/api/?results=12')
//   .then(res => res.json())
//   .then(data => console.log(data));

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

fetchData('https://randomuser.me/api/?results=12').then(data =>
  console.log(data)
);

displayPage();
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------
function displayPage() {
  const gallery = document.querySelector('.gallery');
  let htmlString;

  fetchData('https://randomuser.me/api/?results=12&nat=us').then(data =>
    data.results.forEach(employee => {
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
      gallery.insertAdjacentHTML('beforeend', htmlString);
    })
  );
}

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

// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-submit');

searchInput.addEventListener('keyup', e => {
  const inputText = e.target.value;
});
