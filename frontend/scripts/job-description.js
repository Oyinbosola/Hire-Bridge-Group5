const jobsContainer = document.querySelector(".listings") ;
let jobs = document.querySelectorAll(".job-card");
const filters = document.querySelectorAll(".fltr-btn");
const search = document.querySelector("#searchJob");
const filterContainer = document.querySelector(".filters");
const filtersBox = document.querySelector(".fltr-btns");
const jobsForYouBtn = document.querySelector(".jobs-for-you");
const popularBtn = document.querySelector(".popular");
const popularThreshold = 200;
const clearFilters = document.querySelector(".clr-fltr")

// For the search button

search.addEventListener("keydown", function(e){
if(e.key === "Enter"){
e.preventDefault()

const value = search.value.trim()
if(value === "") return
createFilter(value)

search.value = ""
};
});

 // For creating the new filter buttons after they are searched
function createFilter(keyword){
const newButton = document.createElement("button")
newButton.textContent = keyword
newButton.classList.add("fltr-btn")
filtersBox.appendChild(newButton)

newButton.addEventListener("click", function(){
filterJobs(keyword)
});

filterJobs(keyword)
};

// For the premade filter buttons

filters.forEach(function(button){
button.addEventListener("click", function(){
const keyword = button.textContent.toLowerCase()

jobs.forEach(function(job){
const text = job.textContent.toLowerCase()

if(text.includes(keyword)){
job.style.display = "flex"
}else{
job.style.display = "none"
};
});
});
});



function filterJobs(keyword){
const jobs = document.querySelectorAll(".job-card");
jobs.forEach(function(job){
const text = job.textContent.toLowerCase();

if(text.includes(keyword.toLowerCase())){
job.style.display = "flex"
}else{
job.style.display = "none"
};
});
};

// For the clear filters section 

clearFilters.addEventListener("click", function(){
    filtersBox.style.display = "none"
    jobContainer.forEach(job => {

job.style.display = "block"

})

});

// For the sort button 

const sortBtn = document.querySelector(".sort")
const sortOptions = document.getElementById("sortOptions");
const sortText = document.getElementById("sortText");


sortBtn.addEventListener("click", () => {
  sortOptions.classList.toggle("hidden");
});

sortOptions.addEventListener("click", (e) => {
  const type = e.target.dataset.sort;

  if (!type) return;

  if (type === "newest") {
    sortText.textContent = "Newest";
    sortJobsByNewest();
  }

  if (type === "salary") {
    sortText.textContent = "Salary";
    sortJobsBySalary();
  }

  sortOptions.classList.add("hidden");
});

// For the jobs for you and popular filtering

jobsForYouBtn.addEventListener("click", function(){
jobsForYouBtn.classList.add("active");
popularBtn.classList.remove("active");

jobs.forEach(function(job){
job.style.display = "flex"
});

});
popularBtn.addEventListener("click", function(){
jobsForYouBtn.classList.remove("active")
popularBtn.classList.add("active")

jobs.forEach(function(job){

const viewsText = job.querySelector(".job-views").textContent

const views = parseInt(viewsText)



if(views >= popularThreshold){

job.style.display = "flex"

}

else{

job.style.display = "none"

}

})

})


