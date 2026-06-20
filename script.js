window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
});

// ==================== Mobile Menu ====================
const navbar = document.getElementById("navbar");
const navLinks = document.getElementById("navLinks");

// Toggle menu
function toggleMenu(event) {
    if (event) {
        event.stopPropagation();
    }
    navLinks.classList.toggle("open");
}

// Close menu when clicking a menu item
document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
    });
});

// Close menu when clicking anywhere outside the navbar
document.addEventListener("click", function (e) {
    if (
        navLinks.classList.contains("open") &&
        !navbar.contains(e.target)
    ) {
        navLinks.classList.remove("open");
    }
});

// Close menu on touch devices
document.addEventListener("touchstart", function (e) {
    if (
        navLinks.classList.contains("open") &&
        !navbar.contains(e.target)
    ) {
        navLinks.classList.remove("open");
    }
});
// =====================================================


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


// Contact Form
const form = document.getElementById("contactForm");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById("fname").value,
        phone: document.getElementById("fphone").value,
        school: document.getElementById("fschool").value,
        role: document.getElementById("frole").value,
        message: document.getElementById("fmessage").value
    };

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.success) {
            alert("Message sent successfully!");
            form.reset();
        } else {
            alert("Something went wrong.");
        }
    } catch (err) {
        alert("Unable to connect to the server.");
        console.error(err);
    }
});