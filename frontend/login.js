const usernameElement = document.querySelector('#username');
const passwordElement = document.querySelector('#password');
const buttonElement = document.querySelector('#login');

async function login(user, pass) {
    const obj = {
      username: user,
      password: pass
    }
  
    const response = await fetch('http://localhost:3000/api/login/', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
  
    console.log('Login:', data);
  
    return await data;
  }


function saveToken(token) {
    return new Promise((resolve, reject) => {
      sessionStorage.setItem('auth', token);
  
      resolve('Done');
    });
  }

buttonElement.addEventListener('click', async () => {

    const username = usernameElement.value;
    const password = passwordElement.value;

    const loggedIn = await login(username, password);
    if (loggedIn.success) {
        await saveToken(loggedIn.token);
      location.href = 'http://localhost:3000/verify.html';
      }

})

/**** */
function getToken() {
  return sessionStorage.getItem('auth');
}

async function isLoggedIn() {
  const token = getToken();
  const response = await fetch('http://localhost:3000/api/loggedin', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const data = await response.json();

   if (!data.loggedIn) {
    location.href = 'http://localhost:3000';
  } else{
    async function getUserInfo(){
      const token = getToken();
  const response = await fetch('http://localhost:3000/api/user', {
      headers: {
        'Authorization': `Bearer ${token}`
      }});
  const data = await response.json();

  await saveToken(data.token);
  if (data.user.role === 'staff') {

    location.href = "http://localhost:3000/verify.html" 
    
  } 
    }
  }
}
isLoggedIn()