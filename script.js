document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const joinWaitlistButton = document.getElementById('joinWaitlistButton');
    const joinWaitlistHero = document.getElementById('joinWaitlistHero');
    const formModal = document.getElementById('formModal');
    const closeModal = document.getElementById('closeModal');
 
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });

    function openModal(e) {
        e.preventDefault();
        formModal.classList.add('show'); // Show the modal
        console.log('Join Waitlist button clicked, opening modal.');
    }

    // Make sure these elements exist before adding event listeners
    if (joinWaitlistButton) {
        joinWaitlistButton.addEventListener('click', openModal);
    }
    if (joinWaitlistHero) {
        joinWaitlistHero.addEventListener('click', openModal);
    }
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            formModal.classList.remove('show'); // Hide the modal
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === formModal) {
            formModal.classList.remove('show'); // Hide the modal when clicking outside
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Toggle menu on burger click
    burger.addEventListener('click', (e) => {
        e.stopPropagation();  // Prevent click from bubbling to document
        nav.classList.toggle('show');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('show');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !burger.contains(e.target)) {
            nav.classList.remove('show');
        }
    });
});