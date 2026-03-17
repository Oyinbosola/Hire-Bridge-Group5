const dateElement = document.querySelector(".dashboard-date");
const today = new Date();
const formattedDate = today.toDateString();
dateElement.textContent = formattedDate;

const progress = 65;
const bar = document.querySelector(".progress-fill");
const text = document.querySelector(".progress-text");
bar.style.width = progress + "%";
if (progress === 100) {
    text.textContent = "Profile complete!";
} else {
    text.textContent = progress + "% complete. Add work experience and upload your CV to reach 100%";
}

const button = document.querySelector(".complete-profile-btn"); 
button.addEventListener("click", () => {
    alert("Profile page not ready yet!");
});

function updateStat(type, number, message) {
     const numEl = document.querySelector(`.stat-number[data-type="${type}"]`);
    if (numEl) numEl.textContent = number;
    const msgEl = document.querySelector(`.stat-text[data-type="${type}"]`);
    if (msgEl) msgEl.textContent = message;
}
updateStat("applications", 10, "Across 4 job roles");
updateStat("shortlisted", 4, "2 awaiting next step");
updateStat("interviews", 2, "Coming Up Mar 15 and Mar 18");


document.querySelectorAll(".interview-card").forEach(card => {
    const acceptBtn = card.querySelector(".accept-accept");
    const rejectBtn = card.querySelector(".reject-reject");
    acceptBtn.addEventListener("click", () => {
        acceptBtn.textContent = "Accepted";
        acceptBtn.style.backgroundColor = "#4CAF50";
        acceptBtn.style.color = "#fff";
        acceptBtn.disabled = true;
        rejectBtn.disabled = true;
    });
    rejectBtn.addEventListener("click", () => {
        rejectBtn.textContent = "Rejected";
        rejectBtn.style.backgroundColor = "#F44336";
        rejectBtn.style.color = "#fff";
        acceptBtn.disabled = true;
        rejectBtn.disabled = true;
    });
});

document.querySelectorAll(".reject-rejec").forEach(button => {
    button.addEventListener("click", () => {
        alert("Application Saved For Later");
    });
});


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


suggestionItems.forEach(li => {
    li.addEventListener("click", () => {
        searchInput.value = li.textContent;
        suggestionsBox.style.display = "none";
    });
});

searchInput.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if(query) {
            window.location.href = `jobs.html?search=${encodeURIComponent(query)}`;
        }
    }
});


const messageCount = document.querySelector(".message-count");

function updateMessageCount(count) {
    if (count > 0) {
        messageCount.textContent = count;      
        messageCount.style.display = "inline-block"; 
    } else {
        messageCount.style.display = "none";   
    }
}