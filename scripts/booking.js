document.addEventListener('DOMContentLoaded', function() {
    const bookAppointmentButton = document.getElementById('book-appointment');
    const appointmentDateInput = document.getElementById('appointment-date');
    const timeSlotSelect = document.getElementById('time-slot');

    bookAppointmentButton.addEventListener('click', function() {
        const selectedDate = appointmentDateInput.value;
        const selectedTimeSlot = timeSlotSelect.value;

        if (!selectedDate) {
            alert('Please select a date for your appointment.');
            return;
        }

        if (!selectedTimeSlot) {
            alert('Please select a time slot for your appointment.');
            return;
        }

        // Process the booking (e.g., send data to the server)
        console.log(`Booking appointment on ${selectedDate} at ${selectedTimeSlot}`);
        alert(`Your appointment is booked on ${selectedDate} at ${selectedTimeSlot}`);
    });
});
