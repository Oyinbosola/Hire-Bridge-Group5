document.addEventListener('DOMContentLoaded', () => {

    // ✅ 1. Populate Company Size
    const sizeSelect = document.getElementById('companySize');
    for (let i = 2; i <= 15; i++) {
        const opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        sizeSelect.appendChild(opt);
    }

    // ✅ 2. Populate States
    const states = [
        "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
        "Delta","Ebonyi","Edo","Ekiti","Enugu","FCT - Abuja","Gombe","Imo","Jigawa","Kaduna",
        "Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo",
        "Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"
    ];

    const stateSelect = document.getElementById('stateSelect');
    states.forEach(state => {
        const opt = document.createElement('option');
        opt.value = state;
        opt.innerHTML = state;
        stateSelect.appendChild(opt);
    });

    // ✅ 3. Hiring Areas (Add tags)
    const addBtn = document.getElementById('addAreaBtn');
    const input = document.getElementById('hiringAreaInput');
    const container = document.getElementById('areaTagsContainer');

    addBtn.addEventListener('click', () => {
        const value = input.value.trim();
        if (value) {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerHTML = `${value} <span onclick="this.parentElement.remove()">×</span>`;
            container.appendChild(tag);
            input.value = '';
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addBtn.click();
        }
    });
});

// ✅ 4. FORM SUBMIT (API integration)
document.getElementById("registrationForm").addEventListener("submit", async function (e) {
    e.preventDefault();
    const form = e.target;

    // Gather hiring areas
    const tags = document.querySelectorAll(".tag");
    const hiringAreas = Array.from(tags).map(tag => tag.textContent.replace("×", "").trim());

    // Gather form values using IDs
    const formData = {
        firstName: document.getElementById('firstName').value.trim(),
        lastName: document.getElementById('lastName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value.trim(),
        country: document.getElementById('countrySelect').value,
        state: document.getElementById('stateSelect').value,
        jobTitle: document.getElementById('jobTitle').value,
        business: document.getElementById('businessName').value.trim(),
        website: document.getElementById('companyWebsite').value.trim(),
        industry: document.getElementById('industry').value,
        companySize: document.getElementById('companySize').value,
        location: document.getElementById('location').value,
        description: document.getElementById('description').value.trim(),
        yearsInRecruitment: document.getElementById('yearsInRecruitment').value,
        linkedinProfile: document.getElementById('linkedin').value.trim(),
        gender: form.querySelector('input[name="gender"]:checked')?.value,
        primaryHiringAreas: hiringAreas
    };

    // ✅ Optional client-side validation
    if (!formData.email || !formData.password || formData.password.length < 8) {
        alert("Please enter a valid email and password (min 8 characters).");
        return;
    }
    if (hiringAreas.length === 0) {
        alert("Please add at least one primary hiring area.");
        return;
    }

    try {
        // Call your API from api.js
        const response = await apiCall("/api/v1/auth/recruiter/register", "POST", formData);

        // Save token and role
        localStorage.setItem("hirebridge_token", response.token);
        localStorage.setItem("hirebridge_role", "recruiter");

        // Redirect to recruiter dashboard
        window.location.href = "../pages/recruiter-dashboard.html";

    } catch (error) {
        console.error("Signup error:", error.message || error);
        alert(error.message || "Something went wrong. Try again later.");
    }
});