window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile menu
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
    if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
    }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Form submit
function handleSubmit() {
    const name = document.getElementById('fname').value.trim();
    const phone = document.getElementById('fphone').value.trim();
    const school = document.getElementById('fschool').value.trim();
    const role = document.getElementById('frole').value;

    if (!name || !phone || !school || !role) {
    alert('Please fill in all required fields.');
    return;
    }

    document.getElementById('contactForm').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
}