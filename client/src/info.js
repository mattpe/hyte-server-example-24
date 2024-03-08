import '../style.css';
import {fetchData} from './fetch.js';

const renderUsername = async () => {
  console.log('Haetaan käyttäjän tiedot');
  const url = import.meta.env.VITE_API_URL + '/auth/me';
  const token = localStorage.getItem('token');
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer: ' + token,
    },
  };
  fetchData(url, options).then((data) => {
    console.log(data);
    document.getElementById('name').innerHTML = data.user.username;
  });
};

document.querySelector('.logout').addEventListener('click', logOut);

const logOut = (evt) => {
  evt.preventDefault();
  localStorage.removeItem('token');
  console.log('logginout');
  window.location.replace('index.html');
};

// Call renderUI function when the page loads or component renders
renderUsername();
// tämä toimi ennen autentikaatiota, nyt tarvitsee tokenin, siistitään pian!
// sivuille on nyt myös lisätty navigaatio html sivuun, sekä siihen sopiva
// CSS koodi, hae siis uusi HTML ja UUSI CSS ennen kun aloitat
