const dateElement = document.querySelector(".dashboard-date");
const today = new Date();
const formattedDate = today.toDateString();
dateElement.textContent = formattedDate;

const searchContainer = document.querySelector(".input-container");
const searchInput = searchContainer.querySelector("input");
const suggestionsBox = searchContainer.querySelector(".job-search-suggestions");
const suggestionItems = suggestionsBox.querySelectorAll("li");

suggestionsBox.style.display = "none";
searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    if (value) {
        suggestionsBox.style.display = "block";
    } else {
        suggestionsBox.style.display = "none";
    }

    suggestionItems.forEach(li => {
        if (li.textContent.toLowerCase().includes(value)) {
            li.style.display = "block";
        } else {
            li.style.display = "none";
        }
    });
});


const activeJobs = 9;
const addedThisMonth = 2;
const totalApplicants = 129;
const shortlisted = 37;
const shortlistRate = Math.round((shortlisted / totalApplicants) * 100);
const activeJobsEl = document.querySelector(".active-jobs");
const jobsInfoEl = document.querySelector(".jobs-info");
const applicantsEl = document.querySelector(".total-applicants");
const shortlistedEl = document.querySelector(".shortlisted-count");
const shortlistedInfoEl = document.querySelector(".shortlisted-info");
activeJobsEl.textContent = activeJobs;
jobsInfoEl.textContent = `${3} added this month`;
applicantsEl.textContent = totalApplicants;
shortlistedEl.textContent = shortlisted;
shortlistedInfoEl.textContent = `${shortlistRate}% shortlist rate`;