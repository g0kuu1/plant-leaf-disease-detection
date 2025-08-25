// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal
    if (btn) {
        btn.onclick = function() {
            modal.style.display = "block";
        }
    }

    // When the user clicks on <span> (x), close the modal
    if (span) {
        span.onclick = function() {
            modal.style.display = "none";
        }
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Dark mode toggle functionality
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update icon
        const icon = document.getElementById('themeIcon');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-bs-theme', savedTheme);
    
    // Set correct icon
    const icon = document.getElementById('themeIcon');
    if (icon) {
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Attach toggle function to button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // File upload display functionality
    const uploadButton = document.getElementById('uploadButton');
    if (uploadButton) {
        uploadButton.addEventListener('change', function() {
            if (this.files.length > 0) {
                const fileName = this.files[0].name;
                const label = this.nextElementSibling;
                label.innerHTML = `<i class="fas fa-check-circle me-2"></i> ${fileName}`;
                label.classList.remove('btn-outline-success');
                label.classList.add('btn-success');
            }
        });
    }

    // Chatbot form submission handling
    const chatForm = document.querySelector('form[action="/response"]');
    if (chatForm) {
        chatForm.addEventListener('submit', function() {
            const question = document.getElementById('question');
            const answer = document.getElementById('answer');
            const submitButton = document.getElementById('submit-button');
            
            if (question) question.style.display = 'none';
            if (answer) answer.style.display = 'block';
            if (submitButton) submitButton.disabled = true;
        });
    }

    // Navbar toggle functionality
    const navbarToggle = document.getElementById("toggleNavbarButton");
    if (navbarToggle) {
        navbarToggle.addEventListener("click", function() {
            $("#navcol-1").toggleClass("show");
        });
    }
});