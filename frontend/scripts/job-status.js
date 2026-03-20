const filters = document.querySelectorAll(".fltr-btn");
const title = document.getElementById("pageTitle");
const jobCards = document.querySelectorAll(".brand");
const applied = document.querySelector(".applied");

filters.forEach(tab => {
  tab.addEventListener("click", () => {
    const tabName = tab.textContent.trim();
    applied.textContent = `${tabName}`;
  });
});


function filterApplications(type) {
  jobCards.forEach(card => {
    const statusText = card.querySelector(".status").textContent.toLowerCase();

    if (type === "applied") {
      card.style.display = "flex";
    }

    else if (type === "in progress") {
      if (
        statusText.includes("sent") ||
        statusText.includes("pending")
      ) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    }

    else if (type === "archived") {
      if (
        statusText.includes("rejected") 
      ) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    }

    else if (type === "saved") {
      if ( 
        statusText.includes("accepted")
      ) {
        card.style.display = "flex";
      } else {
      card.style.display = "none";
    }
    }
  });
}

const searchAgain = document.querySelector(".rejected");
searchAgain.addEventListener("click", function(){
    window.location.href = "job-description.html";
})


filters.forEach(tab => {
  tab.addEventListener("click", () => {
    const tabName = tab.textContent.toLowerCase().trim();

    // Shows the filter status 
    applied.textContent = `${tab.textContent}`;

    // Filter cards
    filterApplications(tabName);
  });
});