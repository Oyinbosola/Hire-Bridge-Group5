const titleInput = document.querySelector('.form-group:nth-of-type(1) input');
const descriptionInput = document.querySelector('.form-group:nth-of-type(2) textarea');
const skillsBox = document.querySelector('.skills-box'); 
const experienceSelect = document.querySelector('.form-group:nth-of-type(4) select');
const locationInput = document.querySelector('.form-group:nth-of-type(5) input');

const editBtn = document.querySelector('.edit-btn');
const saveBtn = document.querySelector('.save-btn');
const deleteBtn = document.querySelector('.delete-btn');

// Helper: convert skills box spans into array
function getSkillsArray() {
  return Array.from(skillsBox.querySelectorAll('span')).map(span => span.textContent.trim());
}

// Generic submit function
async function submitJob(redirectPage = 'job-posting.html') {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You are not logged in. Please login first.');
    window.location.href = 'general-login.html';
    return;
  }

  const jobData = {
    title: titleInput.value.trim(),
    description: descriptionInput.value.trim(),
    location: locationInput.value.trim(),
    experienceLevel: experienceSelect.value.toLowerCase(),
    requiredSkills: getSkillsArray()
  };

  if (!jobData.title || !jobData.description || !jobData.location) {
    alert('Please fill in all required fields.');
    return;
  }

  try {
    const jobId = localStorage.getItem('editing_job_id');
    if (jobId) {
      // Update existing job
      await apiCall(`/api/v1/jobs/${jobId}`, 'PATCH', jobData);
      alert('Job updated successfully!');
      localStorage.removeItem('editing_job_id');
    } else {
      // Create new job
      await apiCall('/api/v1/jobs', 'POST', jobData);
      alert('Job posted successfully!');
    }

    window.location.href = redirectPage;

  } catch (error) {
    console.error('Error submitting job:', error);
    alert('Error: ' + (error.message || 'Could not submit job'));
  }
}

// Deactivate function
async function deactivateJob() {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('You are not logged in. Please login first.');
    window.location.href = 'general-login.html';
    return;
  }

  const jobId = localStorage.getItem('editing_job_id');
  if (!jobId) {
    alert('No job selected to deactivate.');
    return;
  }

  const confirmed = confirm('Are you sure you want to deactivate this job?');
  if (!confirmed) return;

  try {
    await apiCall(`/api/v1/jobs/${jobId}/deactivate`, 'PATCH');
    alert('Job has been deactivated.');
    window.location.href = 'my-jobs.html';
  } catch (error) {
    console.error('Error deactivating job:', error);
    alert('Could not deactivate job: ' + (error.message || 'Unknown error'));
  }
}

// Event listeners
editBtn.addEventListener('click', () => submitJob('job-posting.html'));
saveBtn.addEventListener('click', () => submitJob('recruiter-dashboard.html'));
deleteBtn.addEventListener('click', deactivateJob);