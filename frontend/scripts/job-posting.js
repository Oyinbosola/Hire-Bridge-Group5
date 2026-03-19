// Grab DOM elements
const jobSelect = document.querySelector('.job-select'); // make sure this class matches your <select>
const submitBtn = document.querySelector('.submit-btn'); // button to trigger action
const resultsContainer = document.querySelector('.results-container'); // where results will go

// Function to fetch data for a selected job
async function fetchJobData(jobId) {
    try {
        const token = localStorage.getItem('token'); // if you are using auth
        if (!jobId) {
            alert('Please select a job first.');
            return;
        }

        const response = await fetch(`https://hirebridge-server.onrender.com/api/v1/jobs/${jobId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) throw new Error('Failed to fetch job data.');

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error(error);
        resultsContainer.innerHTML = `<p class="error">Error: ${error.message}</p>`;
    }
}

// Function to display results in the DOM
function displayResults(data) {
    // Clear previous results
    resultsContainer.innerHTML = '';

    // Example: show job title and description
    const jobCard = document.createElement('div');
    jobCard.classList.add('job-card');
    jobCard.innerHTML = `
        <h3>${data.title || 'No title'}</h3>
        <p>${data.description || 'No description available'}</p>
    `;
    resultsContainer.appendChild(jobCard);
}

// Event listener for submit button
submitBtn.addEventListener('click', () => {
    const selectedJobId = jobSelect.value;
    fetchJobData(selectedJobId);
});

// Optional: load jobs into the select on page load
async function loadJobs() {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://hirebridge-server.onrender.com/api/v1/jobs', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) throw new Error('Failed to fetch jobs list.');
        const jobs = await response.json();

        // Populate the select dropdown
        jobs.forEach(job => {
            const option = document.createElement('option');
            option.value = job.id;
            option.textContent = job.title;
            jobSelect.appendChild(option);
        });
    } catch (error) {
        console.error(error);
    }
}

// Load jobs when page loads
window.addEventListener('DOMContentLoaded', loadJobs);