

const form = document.getElementById("login-form");
form.addEventListener("submit", async function(e) {
    e.preventDefault();

    // Get user input
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Call backend API
        const response = await apiCall('/api/v1/auth/login', 'POST', {
            email,
            password
        });
        

        // Save token and role
        localStorage.setItem('hirebridge_token', response.token);
        localStorage.setItem('hirebridge_role', response.data.user.role);

        // Redirect based on role
        if (response.data.user.role === 'recruiter') {
            window.location.href = 'recruiter-dashboard.html';
        } else {
            window.location.href = 'candidate-dashboard.html';
        }

    } catch (error) {
        // Show error message
        document.getElementById("error-message").textContent = error.message;
    }
});

const goBack = document.querySelector(".back-btn");
goBack.addEventListener("click", function(){
    window.location.href = "signup.html";
})

document.querySelector(".google-btn").addEventListener("click", () => {
  localStorage.setItem("authProvider", "google");

  redirectUser();
});

document.querySelector(".apple-btn").addEventListener("click", () => {
  localStorage.setItem("authProvider", "apple");

  redirectUser();
});

function redirectUser() {
  const role = localStorage.getItem("role");

  if (role === "recruiter") {
    window.location.href = "recruiter-dashboard.html";
  } else {
    window.location.href = "candidate-dashboard.html";
  }
}