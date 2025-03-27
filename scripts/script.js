// This script handles the modal functionality and service card expansion on a webpage

// Ensure the DOM is fully loaded before executing the script
// This is important to ensure that all elements are available for manipulation
document.addEventListener('DOMContentLoaded', () => {
    const contactBtn = document.getElementById('contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.close-btn');

    if (contactBtn && contactModal && closeBtn) {
        // Open modal when contact button is clicked
        contactBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default behavior if needed
            contactModal.classList.add('show-modal');
        });

        // Close modal when close button is clicked
        closeBtn.addEventListener('click', () => {
            contactModal.classList.remove('show-modal');
        });

        // Close modal if user clicks outside of the modal content
        contactModal.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                contactModal.classList.remove('show-modal');
            }
        });
    } else {
        console.error('Modal elements not found');
    }

    // Service cards expansion functionality
    // Select all service cards
    // This assumes that each service card has a class of 'itemOuter'
    // and that they are contained within a section with the class 'services-section'
    // This is important to ensure that all elements are available for manipulation
   const serviceCards = document.querySelectorAll(".services-section .itemOuter");

    serviceCards.forEach((card) => {
        // Ensure all cards are expanded by default
        card.classList.add("expanded");
    });
});