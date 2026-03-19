document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const selection = button.textContent.trim().toLowerCase();

            if (selection === 'recruiter') {
                console.log("Redirecting to Recruiter page...");
                window.location.href = 'recruiter-signup.html'; 
            } else if (selection === 'candidate') {
                console.log("Redirecting to Candidate page...");
                window.location.href = 'candidate-signup.html'; 
            }
        });
    });
    window.addEventListener('resize', () => {
        if (window.innerWidth < 400) {
            document.querySelector('h1').style.fontSize = '2rem';
        } else {
            document.querySelector('h1').style.fontSize = '3.5rem';
        }
    });
});