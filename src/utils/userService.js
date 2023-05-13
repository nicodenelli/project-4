import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  // Send a POST request to the API endpoint "/signup" with the user object as the request body
  return (
    fetch(BASE_URL + "signup", {
      method: "POST",
      body: user, 
    })
    // If the response is successful (status code 200-299), parse the response body as JSON
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Email already taken!");
      })
      // If parsing the response body as JSON is successful, set the token in 
      //local storage using the "setToken" function in the "tokenService" module and return the token
      .then(({ token }) => tokenService.setToken(token))
  );
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}


function login(creds) {
  return (
    fetch(BASE_URL + "login", { // Make POST request to login endpoint with provided credentials
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(creds),
    })
      .then((res) => {
        if (res.ok) return res.json(); // If response is successful, extract JSON object from response
        throw new Error("Bad Credentials!");
      })
      .then(({ token }) => tokenService.setToken(token)) // Calling to setToken() to store token in local storage
  );
}

function getProfile(username) {
  // Send a GET request to the server to get the profile of the user with the given username
  // Include the user's token in the request headers for authorization purposes
  return fetch(BASE_URL + username, {
    headers: {
      // make sure to send over the jwt token to identify who is making the request
      Authorization: "Bearer " + tokenService.getToken(),
    }
  }).then((res) => {
    // Parse the response as JSON
    if (res.ok) return res.json();
    throw new Error("Error from getProfile request, check the server terminal");
  });
}

export default {
  signup, 
  getUser,
  logout,
  login,
  getProfile
};