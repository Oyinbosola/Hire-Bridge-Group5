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


function updateStats(data) {
    const activeJobsEl = document.querySelector(".active-jobs");
    const jobsInfoEl = document.querySelector(".jobs-info");
    const applicantsEl = document.querySelector(".total-applicants");
    const shortlistedEl = document.querySelector(".shortlisted-count");
    const shortlistedInfoEl = document.querySelector(".shortlisted-info");

    activeJobsEl.textContent = data.activeJobs || 0;
    jobsInfoEl.textContent = `${data.addedThisMonth || 0} added this month`;
    applicantsEl.textContent = data.totalApplicants || 0;
    shortlistedEl.textContent = data.shortlisted || 0;

    const shortlistRate = data.totalApplicants
        ? Math.round((data.shortlisted / data.totalApplicants) * 100)
        : 0;

    shortlistedInfoEl.textContent = `${shortlistRate}% shortlist rate`;
}


async function loadStats() {
    try {
        const response = await apiCall('/api/v1/dashboard/stats');
        const stats = response.data || response;
       
        document.querySelector(".active-jobs").textContent = stats.activeJobs || 0;
        document.querySelector(".total-applicants").textContent = stats.totalApplicants || 0;
        document.querySelector(".shortlisted-count").textContent = stats.shortlisted || 0;

        const shortlistRate = stats.totalApplicants
            ? Math.round((stats.shortlisted / stats.totalApplicants) * 100)
            : 0;
        document.querySelector(".shortlisted-info").textContent = `${shortlistRate}% shortlist rate`;

    } catch (error) {
        console.error("Could not load dashboard stats:", error.message);

        document.querySelector(".active-jobs").textContent = 0;
        document.querySelector(".jobs-info").textContent = "0 added this month";
        document.querySelector(".total-applicants").textContent = 0;
        document.querySelector(".shortlisted-count").textContent = 0;
        document.querySelector(".shortlisted-info").textContent = "0% shortlist rate";
    }
}

loadStats();




function loadPipeline() {

    const pipeline = [
        { stage: "APPLIED", count: 5, candidates: ["Amara Obi", "Kemi Adamu"] },
        { stage: "SHORTLISTED", count: 4, candidates: ["Ngozi Eze", "Chidi Okafor"] },
        { stage: "INTERVIEWED", count: 3, candidates: ["John Emmanuel", "Ife David"] },
        { stage: "OFFERED", count: 2, candidates: ["Amara Obi"] },
        { stage: "REJECTED", count: 6, candidates: ["Seun Idowu", "Kemi Atiba"] }
    ];

    document.querySelectorAll(".candidate-card").forEach(card => {
        const stageName = card.querySelector("h6").textContent.toUpperCase();
        const data = pipeline.find(s => s.stage === stageName);

        if (!data) return;

        card.querySelector("h4").textContent = data.count;
        card.querySelectorAll("button").forEach(b => b.remove());

        const firstTwo = data.candidates.slice(0, 2);
        firstTwo.forEach(name => {
            const btn = document.createElement("button");
            btn.textContent = name;
            card.appendChild(btn);
        });
        const extraCount = data.count - firstTwo.length;
        if (extraCount > 0) {
            const btn = document.createElement("button");
            btn.textContent = `+${extraCount} more`;
            card.appendChild(btn);
        }
    });
}
loadPipeline();


async function loadPipeline() {
    try {
        const response = await apiCall('/api/v1/dashboard/pipeline');
        updatePipeline(response.data);
    } catch (error) {
        console.warn("API failed, using dummy data:", error.message);
        const dummyData = [
            { _id: 'applied', count: 10, candidates: ["Amara Obi", "Kemi Adamu", "Ngozi Okafor", "Seun Idowu"] },
            { _id: 'shortlisted', count: 4, candidates: ["Ngozi Eze", "Chidi Okafor"] },
            { _id: 'interview', count: 3, candidates: ["John Emmanuel", "Ife David"] },
            { _id: 'offered', count: 2, candidates: ["Amara Obi"] },
            { _id: 'rejected', count: 6, candidates: ["Seun Idowu", "Kemi Atiba"] }
        ];
        updatePipeline(dummyData);
    }
}

function updatePipeline(dataArray) {
    dataArray.forEach(stage => {
        let stageName = stage._id.toUpperCase();
        if (stageName === "INTERVIEW") stageName = "INTERVIEWED";
        const card = Array.from(document.querySelectorAll(".candidate-card"))
                          .find(c => c.querySelector("h6").textContent.toUpperCase() === stageName);
        if (!card) return;

        
        card.querySelector("h4").textContent = stage.count;
        card.querySelectorAll("button").forEach(b => b.remove());

        const firstTwo = (stage.candidates || []).slice(0, 2);
        firstTwo.forEach(name => {
            const btn = document.createElement("button");
            btn.textContent = name;
            card.appendChild(btn);
        });

        const extraCount = stage.count - firstTwo.length;
        if (extraCount > 0) {
            const btn = document.createElement("button");
            btn.textContent = `+${extraCount} more`;
            card.appendChild(btn);
        }
    });
}
loadPipeline();


function loadRecentApplicants() {
    const applicants = [
        {
            name: "Amara Obiora",
            appliedFor: "Frontend Developer",
            experience: "4 yrs",
            date: "March 3, 2026",
            status: "Shortlisted",
            actionText: "Review",
            actionLink: "#"
        },
        {
            name: "Chukwu Emeka",
            appliedFor: "Backend Developer",
            experience: "5 yrs",
            date: "March 6, 2026",
            status: "Interview scheduled",
            actionText: "View Profile",
            actionLink: "#"
        },
        {
            name: "Fatima Garba",
            appliedFor: "UI/UX Designer",
            experience: "3 yrs",
            date: "March 4, 2026",
            status: "Applied",
            actionText: "Review",
            actionLink: "#"
        },
        {
            name: "Kemi Adewale",
            appliedFor: "UI/UX Designer",
            experience: "2 yrs",
            date: "March 4, 2026",
            status: "Offered",
            actionText: "View offer",
            actionLink: "#"
        }
    ];

    const tbody = document.querySelector(".tbody-rows");
    
    tbody.innerHTML = "";

    applicants.forEach(app => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${app.name}</td>
            <td>${app.appliedFor}</td>
            <td>${app.experience}</td>
            <td>${app.date}</td>
            <td><button class="td-btn">${app.status}</button></td>
            <td><a class="td-link" href="${app.actionLink}">${app.actionText}</a></td>
        `;

        tbody.appendChild(tr);
    });
}
loadRecentApplicants();


async function loadRecentApplicants() {
    try {
        const response = await apiCall('/api/v1/dashboard/recent-applicants');
        const tbody = document.querySelector(".tbody-rows");
        tbody.innerHTML = ""; 

        response.data.forEach(applicant => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${applicant.name}</td>
                <td>${applicant.job?.title ?? 'Unknown Job'}</td>
                <td>${applicant.experience ?? 'N/A'}</td>
                <td>${new Date(applicant.createdAt).toLocaleDateString()}</td>
                <td><button class="td-btn">${applicant.stage}</button></td>
                <td><a class="td-link" href="#">Review</a></td>
            `;

            tbody.appendChild(tr);
        });

    } catch (error) {
        console.error("Could not load recent applicants:", error.message);
        const dummyApplicants = [
            {
                name: "Amara Obiora",
                job: { title: "Frontend Developer" },
                experience: "4 yrs",
                createdAt: "2026-03-03",
                stage: "Shortlisted"
            },
            {
                name: "Chukwu Emeka",
                job: { title: "Backend Developer" },
                experience: "5 yrs",
                createdAt: "2026-03-06",
                stage: "Interview scheduled"
            }
        ];

        const tbody = document.querySelector(".tbody-rows");
        tbody.innerHTML = "";

        dummyApplicants.forEach(applicant => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${applicant.name}</td>
                <td>${applicant.job?.title ?? 'Unknown Job'}</td>
                <td>${applicant.experience ?? 'N/A'}</td>
                <td>${new Date(applicant.createdAt).toLocaleDateString()}</td>
                <td><button class="td-btn">${applicant.stage}</button></td>
                <td><a class="td-link" href="#">Review</a></td>
            `;
            tbody.appendChild(tr);
        });
    }
}
loadRecentApplicants();
