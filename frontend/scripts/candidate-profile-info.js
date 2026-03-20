  // highlight focused input row
    document.querySelectorAll('.form-group input, .form-group textarea')
      .forEach(function (el) {
        el.addEventListener('focus', function () {
          this.parentElement.classList.add('focused');
        });
        el.addEventListener('blur', function () {
          this.parentElement.classList.remove('focused');
        });
      });

    // simple simulated step advance
 const steps = document.querySelectorAll('.step');
const nextBtn = document.getElementById('nextBtn');
let currentStepIndex = 1;
nextBtn.addEventListener("click", function(){
      if (currentStepIndex < steps.length - 1) {
 steps[currentStepIndex].classList.remove('active');
 window.location.href = "candidate-profile-edu.html";
 
        currentStepIndex += 1;
steps[currentStepIndex].classList.add('active');
      }
      
 });

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

    // profile photo preview
    const photoInput = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');

    photoInput.addEventListener('change', function () {
      const file = this.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = function (e) {
        photoPreview.style.backgroundImage = 'url(' + e.target.result + ')';
        photoPreview.classList.add('has-image');
      };
      reader.readAsDataURL(file);
    });