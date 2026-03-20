const form = document.querySelector(".application-form");
form.addEventListener("submit", async function (e) {
    e.preventDefault();
    // Collect form data
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const position = document.getElementById("position").value;

    const status = document.querySelector('input[name="status"]:checked')?.value;

    const resume = document.getElementById("resume").files[0];

    // Combine data
    const applicationData = {
        name: firstName + " " + lastName,
        email,
        phone,
        position,
        status,
        resume: resume ? resume.name : null
    };

    console.log("Sending data:", applicationData);

    try {
        // TEMPORARY — replace with real endpoint later
        const response = await apiCall('/api/v1/jobs/apply', 'POST', applicationData);

        alert("Application submitted successfully!");

    } catch (error) {
        document.getElementById("error-message").textContent = error.message;
    }
});