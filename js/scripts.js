const gallery = document.getElementById('gallery');
const modal = document.querySelector('.modal-container');
let userss = [];
const regex = /^(\d{4})-(\d{2})-(\d{2}).*$/;

async function getRandomUsers() {
    try {
      const response = await fetch('https://randomuser.me/api/?results=12');
      users = await response.json();
      userss = users.results;
      displayUsers(users.results);
    } catch (error) {
      console.log('There was an error: ', error);
    }
  };
  
  function displayUsers(data) {
    data.forEach((user) => {
      gallery.insertAdjacentHTML('beforeend', `
      <div class="card">
      <div class="card-img-container">
          <img class="card-img" src="${user.picture.thumbnail}" alt="profile picture">
      </div>
      <div class="card-info-container">
          <h3 id="name" class="card-name cap">${user.name.first} ${user.name.last}</h3>
          <p class="card-text">${user.email}</p>
          <p class="card-text cap">${user.location.city}, ${user.location.state}, ${user.location.country}</p>
      </div>
  </div>
`);
    });    
    }


        gallery.addEventListener('click', (e) => {
      const cardDiv = e.target.closest('div.card');
      if (cardDiv) {
        const nameElement = cardDiv.querySelector('#name');          
          if (nameElement) {
              let prova = (userss.find(obj => obj.name.first + ' ' + obj.name.last === nameElement.textContent));
              modal.removeAttribute("hidden");
              modal.insertAdjacentHTML('beforeend', `
              <div class="modal">
              <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
              <div class="modal-info-container">
                 <img class="modal-img" src="${prova.picture.thumbnail}" alt="profile picture">
                 <h3 id="name" class="modal-name cap">${prova.name.first} ${prova.name.last}</h3>
                 <p class="modal-text">${prova.email}</p>
                 <p class="modal-text cap">${prova.location.city}</p>
                 <hr>
                 <p class="modal-text">${prova.phone}</p>
                 <p class="modal-text">${prova.location.street.number} ${prova.location.street.name} ${prova.location.city}, ${prova.location.state}, ${prova.location.country}</p>
                 <p class="modal-text">Birthday: ${prova.dob.date.replace(/^(\d{4})-(\d{2})-(\d{2}).*$/, '$2/$3/$1')}</p>
             </div>
    ` );
    document.getElementById('modal-close-btn').addEventListener('click', (e) =>{

      modal.setAttribute("hidden", "");
  
  });  

          }
      }
  });

    


  getRandomUsers();
