document.addEventListener('DOMContentLoaded', () => {
    // 1. Populate Company Size (2 to 15)
    const sizeSelect = document.getElementById('companySize');
    for (let i = 2; i <= 15; i++) {
        let opt = document.createElement('option');
        opt.value = i;
        opt.innerHTML = i;
        sizeSelect.appendChild(opt);
    }

    // 2. Populate 36 Nigerian States
    const states = [
        "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno", "Cross River", 
        "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe", "Imo", "Jigawa", "Kaduna", 
        "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", 
        "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara"
    ];
    const stateSelect = document.getElementById('stateSelect');
    states.forEach(state => {
        let opt = document.createElement('option');
        opt.value = state;
        opt.innerHTML = state;
        stateSelect.appendChild(opt);
    });

    // 3. Handle Dynamic Hiring Areas
    const addBtn = document.getElementById('addAreaBtn');
    const input = document.getElementById('hiringAreaInput');
    const container = document.getElementById('areaTagsContainer');

    addBtn.addEventListener('click', () => {
        const value = input.value.trim();
        if (value) {
            const tag = document.createElement('div');
            tag.className = 'tag';
            tag.innerHTML = `${value} <span onclick="this.parentElement.remove()">×</span>`;
            container.appendChild(tag);
            input.value = ''; // clear input
        }
    });

    // Handle Enter key for the Hiring Area input
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addBtn.click();
        }
    });
});

const createAccount = document.querySelector(".btn-primary");
createAccount.addEventListener("click", function(){
    window.location.href = "recruiter-dashboard.html";
});
