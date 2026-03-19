// Select form
const form = document.querySelector("form");

// Get inputs (based on your placeholders)
const nameInput = form.querySelector('input[placeholder="Name"]');
const emailInput = form.querySelector('input[placeholder="Email"]');
const passwordInput = form.querySelectorAll('input[type="password"]')[0];
const confirmPasswordInput = form.querySelectorAll('input[type="password"]')[1];

// Submit event
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Simple validation
    if (!name || !email || !password || !confirmPassword) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        const response = await apiCall('/api/v1/auth/candidate/register', 'POST', {
            name,
            email,
            password
        });

        // Save token (from backend)
        localStorage.setItem('hirebridge_token', response.token);
        localStorage.setItem('hirebridge_role', 'candidate');

        // Redirect
        window.location.href = "../pages/candidate-profile-info.html";

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
});