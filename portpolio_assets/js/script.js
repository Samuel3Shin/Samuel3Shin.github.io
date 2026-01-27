'use strict';

// ===========================================
// LOADING SCREEN
// ===========================================

const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loader-bar');
const loaderPercent = document.getElementById('loader-percent');

let progress = 0;
const loadingInterval = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loadingInterval);
    setTimeout(() => {
      loader.classList.add('hidden');
      initHeroAnimations();
    }, 500);
  }
  loaderBar.style.width = progress + '%';
  loaderPercent.textContent = Math.floor(progress) + '%';
}, 100);



// ===========================================
// PARTICLES.JS INITIALIZATION
// ===========================================

function initParticles() {
  if (typeof particlesJS !== 'undefined') {
    const isMobile = window.innerWidth < 768;
    const config = isMobile ? particlesConfigMobile : particlesConfig;
    particlesJS('particles-js', config);
  }
}



// ===========================================
// TYPED.JS HERO ANIMATIONS
// ===========================================

function initHeroAnimations() {
  // Initialize particles
  initParticles();

  // Typed.js for name
  if (typeof Typed !== 'undefined') {
    new Typed('#typed-name', {
      strings: ['Samuel Shin'],
      typeSpeed: 80,
      showCursor: true,
      cursorChar: '|',
      onComplete: () => {
        // Start tagline after name completes
        new Typed('#typed-tagline', {
          strings: [
            'Senior Software Engineer @ Campfire (YC S23)',
            'Ex-Founding Engineer @ Suger (YC W23)',
            'Full-Stack Developer',
            'Machine Learning Researcher',
            'Building the Future'
          ],
          typeSpeed: 50,
          backSpeed: 30,
          backDelay: 2000,
          loop: true,
          showCursor: true,
          cursorChar: '|'
        });
      }
    });
  }

  // Initialize GSAP animations
  initGSAPAnimations();
}



// ===========================================
// COUNTER ANIMATION
// ===========================================

function animateCounters() {
  const counters = document.querySelectorAll('.stat-number');

  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(start + (target - start) * easeOut);

      counter.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    }

    // Start animation after a delay
    setTimeout(() => {
      requestAnimationFrame(updateCounter);
    }, 2000);
  });
}



// ===========================================
// CUSTOM CURSOR
// ===========================================

const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

// Only enable custom cursor on non-touch devices
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  // Smooth outline animation
  function animateOutline() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;

    cursorOutline.style.left = outlineX + 'px';
    cursorOutline.style.top = outlineY + 'px';

    requestAnimationFrame(animateOutline);
  }
  animateOutline();

  // Cursor hover effects
  const interactiveElements = document.querySelectorAll('a, button, .project-item, .service-item, .content-card');

  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      cursorOutline.classList.remove('hover');
    });
  });
}



// ===========================================
// GSAP SCROLL ANIMATIONS
// ===========================================

function initGSAPAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // Animate timeline items
  gsap.utils.toArray('.timeline-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      x: i % 2 === 0 ? -50 : 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  // Animate service items
  gsap.utils.toArray('.service-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      duration: 0.6,
      delay: i * 0.1,
      ease: 'power2.out'
    });
  });

  // Animate project items - use set + to instead of from to avoid invisible items
  gsap.utils.toArray('.project-item').forEach((item, i) => {
    gsap.fromTo(item,
      {
        scale: 0.9,
        opacity: 0
      },
      {
        scrollTrigger: {
          trigger: item,
          start: 'top 95%',
          toggleActions: 'play none none none'
        },
        scale: 1,
        opacity: 1,
        duration: 0.5,
        delay: (i % 3) * 0.1,
        ease: 'back.out(1.2)',
        clearProps: 'all' // Clear inline styles after animation
      }
    );
  });

  // Animate section titles
  gsap.utils.toArray('.article-title, .h3').forEach(title => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  // Animate skill bars
  gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
    ScrollTrigger.create({
      trigger: bar,
      start: 'top 90%',
      onEnter: () => bar.classList.add('animate')
    });
  });

  // Animate testimonials
  gsap.utils.toArray('.testimonials-item').forEach((item, i) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      x: 100,
      opacity: 0,
      duration: 0.8,
      delay: i * 0.2,
      ease: 'power2.out'
    });
  });
}



// ===========================================
// VANILLA TILT FOR PROJECT CARDS
// ===========================================

function initTiltEffects() {
  if (typeof VanillaTilt === 'undefined') return;

  const projectCards = document.querySelectorAll('.project-item > a');

  VanillaTilt.init(projectCards, {
    max: 10,
    speed: 400,
    scale: 1.02,
    glare: true,
    'max-glare': 0.2,
    perspective: 1000
  });

  // Mark items as tilt-active
  document.querySelectorAll('.project-item').forEach(item => {
    item.classList.add('tilt-active');
  });
}

// Initialize tilt effects when portfolio page is shown
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initTiltEffects, 100);
});



// ===========================================
// GITHUB API INTEGRATION
// ===========================================

async function fetchGitHubStats() {
  const githubSection = document.querySelector('.github-section');
  if (!githubSection) return;

  try {
    const response = await fetch('https://api.github.com/users/Samuel3Shin');
    const data = await response.json();

    // Update stats if elements exist
    const reposEl = document.querySelector('[data-github-repos]');
    const followersEl = document.querySelector('[data-github-followers]');
    const publicGistsEl = document.querySelector('[data-github-gists]');

    if (reposEl) reposEl.textContent = data.public_repos;
    if (followersEl) followersEl.textContent = data.followers;
    if (publicGistsEl) publicGistsEl.textContent = data.public_gists;
  } catch (error) {
    console.log('GitHub API error:', error);
  }
}



// ===========================================
// SMOOTH SCROLL FOR HERO CTA
// ===========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});



// ===========================================
// ORIGINAL FUNCTIONALITY (PRESERVED)
// ===========================================

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalUrl1 = document.querySelector("[data-modal-url1]");
const modalUrl2 = document.querySelector("[data-modal-url2]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerText = this.querySelector("[data-testimonials-text]").innerText;
    modalUrl1.href = this.querySelector("[data-testimonials-url]").href;
    modalUrl2.href = this.querySelector("[data-testimonials-url]").href;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
      // Clear GSAP inline styles to ensure visibility
      gsap.set(filterItems[i], { clearProps: 'all' });
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
      // Clear GSAP inline styles to ensure visibility
      gsap.set(filterItems[i], { clearProps: 'all' });
    } else {
      filterItems[i].classList.remove("active");
    }
  }

  // Re-initialize tilt effects after filtering
  setTimeout(initTiltEffects, 100);

  // Refresh ScrollTrigger after filtering
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");

        // Refresh GSAP ScrollTrigger when changing pages
        if (typeof ScrollTrigger !== 'undefined') {
          setTimeout(() => {
            ScrollTrigger.refresh();
          }, 100);
        }

        // Re-initialize tilt effects and clear GSAP styles for portfolio page
        if (pages[i].dataset.page === 'portfolio') {
          setTimeout(() => {
            // Clear GSAP inline styles on all project items to ensure visibility
            document.querySelectorAll('.project-item').forEach(item => {
              gsap.set(item, { clearProps: 'all' });
            });
            initTiltEffects();
          }, 200);
        }
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
}



// ===========================================
// PREFERS REDUCED MOTION
// ===========================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
  // Disable animations for users who prefer reduced motion
  document.documentElement.style.setProperty('--transition-1', '0s');
  document.documentElement.style.setProperty('--transition-2', '0s');
}



// ===========================================
// CONSOLE EASTER EGG
// ===========================================

console.log('%c Welcome to Samuel Shin\'s Portfolio! ', 'background: linear-gradient(to right, #ffb74d, #ffa726); color: #000; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;');
console.log('%c Built with passion and lots of ☕', 'color: #888; font-size: 12px;');
console.log('%c Interested in working together? Email: samuel3.shin@gmail.com', 'color: #ffb74d; font-size: 12px;');
