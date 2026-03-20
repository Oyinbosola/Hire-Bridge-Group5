// =======================
// WORK EXPERIENCE
// =======================
const workColumn = document.querySelector('.form-grid .column:first-of-type'); // left column
const workAddBtn = workColumn.querySelector('.add-btn');

workAddBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const title = workColumn.querySelector('input[placeholder="Title"]');
  const employment = workColumn.querySelector('select');
  const company = workColumn.querySelectorAll('input')[1];
  const currentlyWorking = workColumn.querySelector('input[type="checkbox"]');
  const startDate = workColumn.querySelector('input[type="date"]:first-of-type');
  const endDate = workColumn.querySelector('input[type="date"]:last-of-type');
  const location = workColumn.querySelector('input[placeholder="Location"]');

  if (!title.value || !company.value) {
    alert("Please fill in at least Title and Company!");
    return;
  }

  let text = `${title.value} at ${company.value}`;
  if (employment.value) text += ` | ${employment.value}`;
  if (location.value) text += ` | ${location.value}`;
  if (currentlyWorking.checked) text += ` | Currently Working`;
  if (startDate.value) text += ` | Start: ${startDate.value}`;
  if (endDate.value && !currentlyWorking.checked) text += ` | End: ${endDate.value}`;

  let list = workColumn.querySelector('.experience-list');
  if (!list) {
    list = document.createElement('div');
    list.className = 'experience-list';
    workColumn.insertBefore(list, workAddBtn);
  }

  const item = document.createElement('div');
  item.className = 'experience-item';
  item.textContent = text;
  list.appendChild(item);

  title.value = '';
  employment.value = '';
  company.value = '';
  currentlyWorking.checked = false;
  startDate.value = '';
  endDate.value = '';
  location.value = '';
});

// =======================
// EDUCATION
// =======================
const educationColumn = document.querySelector('.form-grid .column:last-of-type'); // right column
const educationAddBtn = educationColumn.querySelector('.add-btn');

educationAddBtn.addEventListener('click', (e) => {
  e.preventDefault();

  const school = educationColumn.querySelectorAll('input')[0];
  const degree = educationColumn.querySelector('select');
  const field = educationColumn.querySelectorAll('input')[1];
  const grade = educationColumn.querySelectorAll('input')[2];
  const startDate = educationColumn.querySelector('input[type="date"]:first-of-type');
  const endDate = educationColumn.querySelector('input[type="date"]:last-of-type');

  if (!school.value || !degree.value) {
    alert("Please fill in at least School and Degree!");
    return;
  }

  let text = `${school.value} | ${degree.value}`;
  if (field.value) text += ` | ${field.value}`;
  if (grade.value) text += ` | Grade: ${grade.value}`;
  if (startDate.value) text += ` | Start: ${startDate.value}`;
  if (endDate.value) text += ` | End: ${endDate.value}`;

  let list = educationColumn.querySelector('.experience-list');
  if (!list) {
    list = document.createElement('div');
    list.className = 'experience-list';
    educationColumn.insertBefore(list, educationAddBtn);
  }

  const item = document.createElement('div');
  item.className = 'experience-item';
  item.textContent = text;
  list.appendChild(item);

  school.value = '';
  degree.value = '';
  field.value = '';
  grade.value = '';
  startDate.value = '';
  endDate.value = '';
});

// =======================
// SKILLS
// =======================
const skillsContainer = document.querySelector('.skills');
const skillInput = document.querySelector('.skill-input');

// Function to create skill tags
function createSkillTag(skillName){
  const tag = document.createElement('span');
  tag.className = 'skill-tag';
  tag.textContent = skillName + ' ×';
  
  // Click to remove
  tag.addEventListener('click', () => tag.remove());

  skillsContainer.appendChild(tag);
}

// Make preloaded skills removable
skillsContainer.querySelectorAll('span').forEach(span => {
  const skillText = span.textContent.replace('×','').trim();
  span.textContent = skillText + ' ×';
  span.className = 'skill-tag';
  span.addEventListener('click', () => span.remove());
});

// Add new skill from input
skillInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter'){
    e.preventDefault();
    const value = skillInput.value.trim();
    if(!value) return;
    createSkillTag(value);
    skillInput.value = '';
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

const experience = document.querySelector(".exp");
experience.addEventListener("click", function(){
    window.location.href = "candidate-profile-edu.html";
});
