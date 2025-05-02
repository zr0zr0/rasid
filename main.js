document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 2000);

    // Set current date in Arabic format
    const currentDate = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('current-date').textContent = currentDate.toLocaleDateString('ar-YE', options);

    // Sidebar section navigation
    const sections = document.querySelectorAll('.section');
    const formSections = document.querySelectorAll('.form-section');

    sections.forEach(section => {
        section.addEventListener('click', () => {
            // Remove active class from all sections
            sections.forEach(s => s.classList.remove('active'));
            // Add active class to clicked section
            section.classList.add('active');

            // Hide all form sections
            formSections.forEach(fs => fs.classList.remove('active'));
            
            // Show the corresponding form section
            const sectionId = section.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });

    // Form cards open modal
    const formCards = document.querySelectorAll('.form-card');
    const modal = document.getElementById('formModal');
    const modalTitle = document.getElementById('modal-title');
    const formContainer = document.getElementById('form-container');
    const closeModal = document.querySelector('.close-modal');

    formCards.forEach(card => {
        card.addEventListener('click', () => {
            const formId = card.getAttribute('data-form-id');
            const formTitle = card.querySelector('h5').textContent;
            
            // Set modal title
            modalTitle.textContent = formTitle;
            
            // Clear previous form content
            formContainer.innerHTML = '';
            
            // Create and append the iframe
            const iframe = document.createElement('div');
            iframe.setAttribute('data-fillout-id', formId);
            iframe.setAttribute('data-fillout-embed-type', 'fullscreen');
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.setAttribute('data-fillout-inherit-parameters', '');
            
            formContainer.appendChild(iframe);
            
            // Load Fillout script
            const script = document.createElement('script');
            script.src = 'https://server.fillout.com/embed/v1/';
            formContainer.appendChild(script);
            
            // Show modal
            modal.style.display = 'block';
            document.body.classList.add('modal-open');
            
            // Add animation class
            modal.querySelector('.modal-content').classList.add('animated');
            
            // Prevent scrolling on body
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        document.body.classList.remove('modal-open');
    });

    // Close modal when clicking outside
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-open');
        }
    });

    // Card hover effects
    formCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const icon = card.querySelector('.card-icon i');
            icon.classList.add('fa-beat');
        });

        card.addEventListener('mouseleave', () => {
            const icon = card.querySelector('.card-icon i');
            icon.classList.remove('fa-beat');
        });
    });

    // Add notification pulse animation
    const notificationIcon = document.querySelector('.notification-icon');
    setInterval(() => {
        notificationIcon.classList.add('pulsing');
        setTimeout(() => {
            notificationIcon.classList.remove('pulsing');
        }, 1000);
    }, 5000);

    // Simulate dynamic data updates
    setInterval(() => {
        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
            const currentValue = parseInt(stat.textContent);
            const randomChange = Math.floor(Math.random() * 3);
            stat.textContent = currentValue + randomChange;
        });
    }, 30000);

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key closes modal
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.body.classList.remove('modal-open');
        }
        
        // Alt + number keys for quick navigation (1-6)
        if (e.altKey && !isNaN(parseInt(e.key)) && parseInt(e.key) >= 1 && parseInt(e.key) <= 6) {
            const sectionIndex = parseInt(e.key) - 1;
            if (sections[sectionIndex]) {
                sections[sectionIndex].click();
            }
        }
    });

    // Theme toggle function (for future implementation)
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
    }

    // Initialize tooltips (for future implementation)
    function initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(el => {
            // Tooltip logic
        });
    }

    // Animation for card icon pulsing
    const pulsingIcons = document.querySelectorAll('.card-icon.pulsing');
    pulsingIcons.forEach(icon => {
        setInterval(() => {
            icon.classList.add('glow');
            setTimeout(() => {
                icon.classList.remove('glow');
            }, 1000);
        }, 3000);
    });

    // Add smooth scrolling for the dashboard
    const mainContent = document.querySelector('.main-content');
    mainContent.addEventListener('scroll', () => {
        if (mainContent.scrollTop > 100) {
            document.querySelector('.top-bar').classList.add('scrolled');
        } else {
            document.querySelector('.top-bar').classList.remove('scrolled');
        }
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-container input');
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        formCards.forEach(card => {
            const title = card.querySelector('h5').textContent.toLowerCase();
            const desc = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || desc.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
});