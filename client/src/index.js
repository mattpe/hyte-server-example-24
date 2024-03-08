import '../style.css';
import {fetchData} from './fetch.js';

// Apufunktio, kirjoittaa halutin koodiblokin sisään halutun tekstin
const logResponse = (codeblock, text) => {
  document.getElementById(codeblock).innerText = text;
};

// Apufunktio, Tyhjennä local storage
const clearLocalStorage = () => {
  localStorage.removeItem('token');
  logResponse('clearResponse', 'localStorage cleared!');
};

// haetaan nappi josta lähetetään formi ja luodaan käyttäjä
const createUser = document.querySelector('.createuser');

createUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Yritetään luoda käyttäjä');

  const url = import.meta.env.VITE_API_URL + '/users';

  // # Create user
  // POST /api/users
  // content-type: application/json

  const form = document.querySelector('.create_user_form');

  // Validointi, jos päällä niin tutkitaan onko kentät kunnossa

  // Check if the form is valid
  if (!form.checkValidity()) {
    // If the form is not valid, show the validation messages
    form.reportValidity();
    return; // Exit function if form is not valid
  }

  console.log('Tiedot valideja, jatketaan');

  // kokeillaan ensin kovakoodattuna
  // const body = {
  //   username: 'testii',
  //   password: 'testii',
  //   email: 'testii@testii.fi',
  // };

  const username = form.querySelector('input[name=username]').value;
  const data = {
    username: username,
    password: form.querySelector('input[name=password]').value,
    email: form.querySelector('input[name=email]').value,
  };

  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    // body data type must match "Content-Type" header
    body: JSON.stringify(data),
  };

  // fetchData(url, options).then((data) => {
  //   // käsitellään fetchData funktiosta tullut JSON
  //   console.log(data);
  // });

  // parempi ehkä käyttää samaa muotoilua
  try {
    const responseData = await fetchData(url, options);
    console.log(responseData);
    alert(responseData.message);
  } catch (error) {
    console.error(error.response);
  }
});

// haetaan nappi josta haetaan formi ja logataan sisään
// tästä saadaan TOKEN
const loginUser = document.querySelector('.loginuser');

loginUser.addEventListener('click', async (evt) => {
  evt.preventDefault();
  console.log('Nyt logataan sisään');

  // # Login
  // POST /api/auth/login
  // content-type: application/json

  // {
  //   "username": "user",
  //   "password": "secret"
  // }

  const url = import.meta.env.VITE_API_URL + '/auth/login';

  const form = document.querySelector('.login_form');

  const data = {
    username: form.querySelector('input[name=username]').value,
    password: form.querySelector('input[name=password]').value,
  };

  const options = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'application/json',
    },
    // body data type must match "Content-Type" header
    body: JSON.stringify(data),
  };

  // 1. Käy Ulla läpi tämä auth sivu ja sync/await rakenne vaihtoehto
  // Tähän redirect
  // samoin voi laittaa userID:n talteen..

  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
    console.log(data.token);
    localStorage.setItem('token', data.token);
    // jos on token, cpnsole loggaa ett kaikki hyvin
    // jos ei niin console loggaa että tokenia ei ollut
    // TÄSSÄ oieasta kannattaa tehdä niin että
    // fetch.js palauttaa BE puolen validointivirheen
    // joka käsitellään

    if (data.token == undefined) {
      alert('Unauth user: käyttäjänimi tai salasana ei oikein');
      // esim. ottaa esiin piilotettu kenttä
    } else {
      alert(data.message);
      localStorage.setItem('name', data.user.username);
      // window.location.href = 'home.html';
    }

    logResponse(
      'loginResponse',
      `localStorage set with token value: ${data.token}`,
    );
  });
});

// Haetaan nappi josta testataan TOKENIN käyttöä, /auth/me
const meRequest = document.querySelector('#meRequest');
meRequest.addEventListener('click', async () => {
  console.log('Testataan TOKENIA ja haetaan käyttäjän tiedot');

  // # Get user info by token (requires token)
  // GET /api/auth/me
  // Authorization: Bearer (put-user-token-here)

  const url = import.meta.env.VITE_API_URL + '/auth/me';
  const muntokeni = localStorage.getItem('token');
  console.log('Tämä on haettu LocalStoragesta', muntokeni);

  const options = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    headers: {
      Authorization: 'Bearer: ' + muntokeni,
    },
  };

  console.log(options);

  fetchData(url, options).then((data) => {
    // käsitellään fetchData funktiosta tullut JSON
    console.log(data);
    logResponse('meResponse', `Authorized user info: ${JSON.stringify(data)}`);
  });
});

// Haetaan nappi josta tyhjennetään localStorage
const clear = document.querySelector('#clearButton');
clear.addEventListener('click', clearLocalStorage);
