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
});