/**
 * Portfolio - Ferdian Arga Saputra
 * Vanilla JavaScript - Form validation & simple interactions
 */

document.addEventListener('DOMContentLoaded', function () {
  // ---------- Copyright Year ----------
  const yearEl = document.getElementById('copyrightYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Navbar scrolled state ----------
  const navbar = document.getElementById('mainNavbar');
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  handleNavbarScroll();

  // ---------- Active Nav Link on Scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

  function setActiveNav() {
    const scrollY = window.scrollY + 100;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();

  // ---------- Close mobile menu on link click ----------
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse) {
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        if (navbarCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          }
        }
      });
    });
  }

  // ---------- Contact Form Validation ----------
  const contactForm = document.getElementById('contactForm');
  const formAlert = document.getElementById('formAlert');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Reset previous state
      formAlert.classList.add('d-none');
      formAlert.classList.remove('alert-success', 'alert-danger');

      const nama = document.getElementById('nama');
      const email = document.getElementById('email');
      const pesan = document.getElementById('pesan');

      let isValid = true;

      // Reset invalid state
      [nama, email, pesan].forEach(function (field) {
        field.classList.remove('is-invalid');
      });

      // Validate Nama
      if (!nama.value.trim()) {
        nama.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Email
      const emailValue = email.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailValue) {
        email.classList.add('is-invalid');
        isValid = false;
      } else if (!emailRegex.test(emailValue)) {
        email.classList.add('is-invalid');
        isValid = false;
      }

      // Validate Pesan
      if (!pesan.value.trim()) {
        pesan.classList.add('is-invalid');
        isValid = false;
      }

      if (!isValid) {
        formAlert.textContent = 'Mohon lengkapi semua field yang wajib diisi dengan benar.';
        formAlert.classList.remove('d-none');
        formAlert.classList.add('alert-danger');
        return;
      }

      // Success (static site - no backend)
      formAlert.textContent = 'Pesan berhasil divalidasi. (Website statis: pesan tidak dikirim ke server. Ganti dengan integrasi form jika diperlukan.)';
      formAlert.classList.remove('d-none');
      formAlert.classList.add('alert-success');
      contactForm.reset();
    });
  }
});
