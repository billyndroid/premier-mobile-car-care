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
});