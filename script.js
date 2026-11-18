document.addEventListener('DOMContentLoaded', () => {
    // 1. Highlight active navigation link automatically
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active', 'fw-bold');
        }
    });

    // 2. Pre-select Doctor on Appointment Page if passed via URL (?doctor=...)
    const urlParams = new URLSearchParams(window.location.search);
    const doctorParam = urlParams.get('doctor');
    const doctorSelect = document.getElementById('doctorSelect');
    if (doctorParam && doctorSelect) {
        for (let option of doctorSelect.options) {
            if (option.value === doctorParam) {
                option.selected = true;
                break;
            }
        }
    }

    // 3. Appointment Form Submission
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const name = document.getElementById('patientName').value;
            const doctor = document.getElementById('doctorSelect').value;
            const date = document.getElementById('appointmentDate').value;
            const alertBox = document.getElementById('appointmentAlert');

            alertBox.innerHTML = `
                <div class="alert alert-info border-primary mt-3" role="alert">
                    <strong>Appointment Confirmed!</strong> Thank you, ${name}. Your visit with <strong>${doctor}</strong> is scheduled for <strong>${date}</strong>.
                </div>`;
            appointmentForm.reset();
        });
    }

    // 4. Interactive Star Rating & Review Submission
    const stars = document.querySelectorAll('#starSelector i');
    const ratingInput = document.getElementById('ratingValue');
    if (stars.length > 0) {
        stars.forEach(star => {
            star.addEventListener('click', function () {
                const value = this.getAttribute('data-value');
                ratingInput.value = value;
                stars.forEach(s => {
                    s.classList.toggle('active', s.getAttribute('data-value') <= value);
                });
            });
        });
    }

    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const reviewer = document.getElementById('reviewerName').value;
            const rating = parseInt(ratingInput.value) || 5;
            const comment = document.getElementById('reviewComment').value;
            const reviewsList = document.getElementById('reviewsList');

            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                starsHtml += `<i class="fas fa-star ${i <= rating ? 'text-warning' : 'text-muted'}"></i>`;
            }

            const newReview = document.createElement('div');
            newReview.className = 'card card-medical p-3 mb-3';
            newReview.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-1">
                    <h6 class="fw-bold mb-0 text-primary">${reviewer}</h6>
                    <div>${starsHtml}</div>
                </div>
                <p class="mb-0 text-muted">${comment}</p>
            `;
            reviewsList.prepend(newReview);
            reviewForm.reset();
            stars.forEach(s => s.classList.remove('active'));
        });
    }

    // 5. Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            document.getElementById('contactAlert').innerHTML = `
                <div class="alert alert-info border-primary mt-3">
                    <strong>Message Sent!</strong> Our support desk at Case Hospital will reply to your inquiry shortly.
                </div>`;
            contactForm.reset();
        });
    }

    // 6. Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const role = document.getElementById('userRole').value;
            const email = document.getElementById('loginEmail').value;
            document.getElementById('loginAlert').innerHTML = `
                <div class="alert alert-info border-primary mt-3">
                    <strong>Welcome back!</strong> Authenticated as <strong>${role}</strong> (${email}). Redirecting to dashboard...
                </div>`;
        });
    }
});