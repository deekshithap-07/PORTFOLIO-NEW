const projectDetails = {
  rentora: {
    title: 'Rentora',
    date: 'Jan 2026 — Mar 2026',
    description: 'Built a web-based rental platform enabling users to browse, list, and manage rental products through a responsive, user-friendly interface.',
    technologies: ['Frontend Development', 'Supabase', 'PostgreSQL', 'UI Design'],
    features: [
      'Responsive interface for browsing and managing rental products.',
      'Integrated Supabase (PostgreSQL) for structured data storage.',
      'Real-time updates across the rental platform.'
    ]
  },
  analyzer: {
    title: 'Resume Analyzer AI',
    date: '2026',
    description: 'Built an AI-powered resume analyzer that parses PDF/DOCX resumes and generates role-specific ATS scores, keyword-gap analysis, and structured feedback using JSON-mode LLM prompting.',
    technologies: ['Python', 'Streamlit', 'Groq API', 'Llama 3.3 70B', 'pdfplumber', 'Plotly'],
    features: [
      'Parses PDF and DOCX resumes for structured analysis.',
      'Generates role-specific ATS scores and keyword-gap analysis.',
      'Designed role-aware prompting to tailor recommendations across target job roles.'
    ]
  },
  wearable: {
    title: 'Early Cardiac Abnormality Detection Wearable Watch',
    date: 'Ongoing',
    description: 'Designing an IoT-based wearable system integrating ECG and motion sensors for real-time cardiac monitoring.',
    technologies: ['IoT Development', 'Sensor Integration', 'System Design'],
    features: [
      'Integrates ECG and motion sensors for live monitoring.',
      'Architecting a predictive alert pipeline for cardiac abnormalities.',
      'Designed to trigger emergency notifications when needed.'
    ]
  },
  documind: {
    title: 'DocuMind — RAG Chatbot',
    date: 'Aug 2026',
    description: 'Built a Retrieval-Augmented Generation chatbot from scratch that answers questions from user-uploaded PDFs with cited sources.',
    technologies: ['LangChain', 'ChromaDB', 'Groq API', 'Llama 3.3 70B', 'Streamlit'],
    features: [
      'Answers questions from user-uploaded PDFs with cited sources.',
      'Uses document chunking and vector retrieval with ChromaDB.',
      'Grounds responses to minimize hallucination.'
    ]
  }
};

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const modal = document.querySelector('#project-modal');
const modalClose = document.querySelector('.modal-close');
const toast = document.querySelector('#toast');

function closeMenu() {
  menuToggle?.setAttribute('aria-expanded', 'false');
  navLinks?.classList.remove('open');
}

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navLinks.classList.toggle('open', !expanded);
});

navItems.forEach((item) => item.addEventListener('click', closeMenu));

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navItems.forEach((item) => item.classList.toggle('active', item.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-28% 0px -62% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function openModal(projectKey) {
  const project = projectDetails[projectKey];
  if (!project || !modal) return;

  document.querySelector('#modal-title').textContent = project.title;
  document.querySelector('#modal-date').textContent = project.date;
  document.querySelector('#modal-description').textContent = project.description;
  document.querySelector('#modal-technologies').innerHTML = project.technologies
    .map((technology) => `<span>${technology}</span>`).join('');
  document.querySelector('#modal-features').innerHTML = project.features
    .map((feature) => `<li>${feature}</li>`).join('');

  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  modalClose?.focus();
}

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.style.overflow = '';
}

document.querySelectorAll('.modal-trigger').forEach((button) => {
  button.addEventListener('click', () => openModal(button.dataset.project));
});
modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('visible');
  window.setTimeout(() => toast.classList.remove('visible'), 4200);
}

document.querySelectorAll('.linkedin-placeholder').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    showToast('LinkedIn URL placeholder — replace # with the profile link when ready.');
  });
});

async function checkResumeAsset() {
  const resumeLinks = document.querySelectorAll('.resume-link');
  const resumeNote = document.querySelector('#resume-note');

  // Browsers do not allow HEAD/fetch checks from a file:// page.
  // The original resume is bundled with this project, so leave the
  // links enabled when the portfolio is opened directly from a folder.
  if (window.location.protocol === 'file:') return;

  try {
    const response = await fetch('assets/resume.pdf', { method: 'HEAD' });
    if (!response.ok) throw new Error('Resume not found');
  } catch {
    resumeLinks.forEach((link) => {
      link.classList.add('asset-missing');
      link.setAttribute('aria-describedby', 'resume-note');
      link.addEventListener('click', (event) => {
        event.preventDefault();
        showToast('Add the original resume PDF at assets/resume.pdf to enable this button.');
      });
    });
    if (resumeNote) resumeNote.hidden = false;
  }
}
checkResumeAsset();

const contactForm = document.querySelector('#contact-form');
const formSuccess = document.querySelector('#form-success');

function setFieldError(fieldName, message) {
  const field = document.querySelector(`#${fieldName}`);
  const wrapper = field?.closest('.form-field');
  const error = document.querySelector(`[data-error-for="${fieldName}"]`);
  wrapper?.classList.toggle('invalid', Boolean(message));
  if (error) error.textContent = message;
}

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  let valid = true;

  setFieldError('name', name ? '' : 'Please enter your name.');
  setFieldError('email', emailIsValid ? '' : 'Please enter a valid email address.');
  setFieldError('message', message ? '' : 'Please enter a message.');
  valid = Boolean(name && emailIsValid && message);

  if (!valid) {
    formSuccess.hidden = true;
    return;
  }

  formSuccess.hidden = false;
  contactForm.reset();
  ['name', 'email', 'message'].forEach((fieldName) => setFieldError(fieldName, ''));
});
