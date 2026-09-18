// Interactive Logic for S. Dijo's Personal Website

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation Blur
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.glass-card, .section-header');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(el);
  });

  // 3. Skill Bar Animations
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width;
      }
    });
  }, { threshold: 0.2 });

  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.setAttribute('data-width', width);
    bar.style.width = '0%';
    skillObserver.observe(bar);
  });

  // 4. Modal for Adding Project Website Links
  const openModalBtn = document.getElementById('open-add-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modalOverlay = document.getElementById('add-project-modal');
  const addProjectForm = document.getElementById('add-project-form');
  const projectsContainer = document.getElementById('projects-container');
  const toast = document.getElementById('toast');

  if (openModalBtn && modalOverlay && closeModalBtn) {
    openModalBtn.addEventListener('click', () => {
      modalOverlay.classList.add('open');
    });

    closeModalBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });
  }

  // Handle Dynamic Project Link Addition
  if (addProjectForm) {
    addProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('project-title-input').value;
      const url = document.getElementById('project-url-input').value;
      const tech = document.getElementById('project-tech-input').value;
      const desc = document.getElementById('project-desc-input').value;

      // Create new project card element
      const newCard = document.createElement('div');
      newCard.className = 'glass-card project-card';
      newCard.style.opacity = '1';
      newCard.style.transform = 'translateY(0)';

      const techTagsHtml = tech.split(',')
        .map(t => `<span class="tag">${t.trim()}</span>`)
        .join(' ');

      newCard.innerHTML = `
        <div class="project-image">
          <img src="assets/project1.jpg" alt="${title}">
        </div>
        <div class="project-content">
          <div class="project-tags">
            ${techTagsHtml}
          </div>
          <h3 class="project-title">${title}</h3>
          <p class="project-desc">${desc}</p>
          <div class="project-links">
            <a href="${url}" target="_blank" class="project-link cta-btn" style="padding: 8px 16px; font-size: 0.85rem;">
              <i class="fa-solid fa-globe" style="margin-right: 6px;"></i> Visit Website Link
            </a>
          </div>
        </div>
      `;

      projectsContainer.appendChild(newCard);

      // Close modal and clear form
      addProjectForm.reset();
      modalOverlay.classList.remove('open');

      // Show Toast Notification
      if (toast) {
        toast.querySelector('.toast-msg').textContent = `Project link "${title}" added successfully!`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
      }
    });
  }

  // 5. Contact Form Handler
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      contactForm.reset();
      
      if (toast) {
        toast.querySelector('.toast-msg').textContent = `Thank you, ${name}! Your message has been sent successfully.`;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
      }
    });
  }
});
