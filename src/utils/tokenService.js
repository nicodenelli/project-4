function setToken(token) {
    if (token) {
      // If a token is provided, set it in local storage
      localStorage.setItem('token', token);
    } else {
      // if no token provided, remove the token from local storage
      localStorage.removeItem('token');
    }
  }
  
  function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
      // Check if expired, remove if it is
      // atob is a function that decodes a base-64 string
      const payload = JSON.parse(atob(token.split('.')[1]));
      // JWT's exp is expressed in seconds, not milliseconds, so convert
      if (payload.exp < Date.now() / 1000) {
        localStorage.removeItem('token');
        token = null;
      }
    }
    return token;
  }
  
  function getUserFromToken() {
    // Retrieve the token from the browser's local storage
    const token = getToken();
    // If there is a token, decode the token, and parse the decoded token to convert it into an object
    // and return the user property of the parsed token
    // if there is no token, return null " : null;"
    return token ? JSON.parse(atob(token.split('.')[1])).user : null;
  }
  
  function removeToken() {
    localStorage.removeItem('token');
  }
  
  export default {
    setToken,
    getToken,
    removeToken,
    getUserFromToken
  };