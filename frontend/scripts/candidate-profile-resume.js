const signIn = document.querySelector(".sign-in");
signIn.addEventListener("click", function(){
    window.location.href = "signup.html";
});

const information = document.querySelector(".basic-info");
information.addEventListener("click", function(){
    window.location.href = "candidate-profile-info.html";
});

const jobPreferences = document.querySelector(".job-pref");
jobPreferences.addEventListener("click", function(){
    window.location.href = "candidate-profile-resume.html";
});

const experience = document.querySelector(".exp");
experience.addEventListener("click", function(){
    window.location.href = "candidate-profile-edu.html";
});

const dashboard = document.querySelector(".complete");
dashboard.addEventListener("click", function(){
    window.location.href = "candidate-dashboard.html";
});
