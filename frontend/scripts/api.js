// api.js
// This file is the bridge between your pages and the backend.
// Create this file once and reuse it everywhere.
 
const BASE_URL = 'https://hirebridge-server.onrender.com';
 
// This function grabs the token we saved after login
function getToken() {
  return localStorage.getItem('hirebridge_token');
}
 
// This is the main function you'll call from every page
// path   = the endpoint e.g. '/api/v1/auth/login'
// method = 'GET', 'POST', or 'PATCH'
// body   = the data you want to send (leave empty for GET requests)
async function apiCall(path, method = 'GET', body = null) {
  const token = getToken();
 
  // Build the request settings
  const options = {
	method: method,
	headers: {
  	'Content-Type': 'application/json',
  	// Only add the token if we have one
  	...(token ? { 'Authorization': 'Bearer ' + token } : {}),
	},
  };
 
  // Attach the body for POST and PATCH requests
  if (body) {
	options.body = JSON.stringify(body);
  }
 
  // Make the request
  const response = await fetch(BASE_URL + path, options);
  const data = await response.json();
 
  // If something went wrong, throw the error message from the server
  if (!response.ok) {
	throw new Error(data.message || 'Something went wrong');
  }
 
  return data;
}

