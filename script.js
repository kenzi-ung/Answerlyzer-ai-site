// Chatbot demo staged responses
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');

const cannedDemos = {
  algebra: {
    question: 'Solve 2x + 3 = 7',
    steps: [
      'Let’s isolate x. Subtract 3 from both sides: 2x = 4.',
      'Divide both sides by 2: x = 2.',
      'Check: 2(2) + 3 = 4 + 3 = 7 ✓',
      'Why it works: inverse operations undo additions/multiplications step by step.'
    ]
  },
  literature: {
    question: 'Build a thesis on symbolism in “The Great Gatsby.”',
    steps: [
      'Step 1: Identify recurring symbols (green light, valley of ashes).',
      'Step 2: Link symbols to themes (aspiration, decay, class divide).',
      'Draft thesis: “Through the green light and the valley of ashes, Fitzgerald contrasts idealized ambition with moral decay, revealing the illusion of the American Dream.”',
      'Strengthen with textual evidence in body paragraphs.'
    ]
  },
  physics: {
    question: 'A car accelerates from rest at 2 m/s^2 for 5 s. Find v.',
    steps: [
      'Knowns: a = 2 m/s^2, t = 5 s, v0 = 0.',
      'Equation: v = v0 + a·t.',
      'Compute: v = 0 + (2)(5) = 10 m/s.',
      'Unit check: m/s^2 · s = m/s ✓'
    ]
  }
};

function addMessage(role, text) {
  const msg = document.createElement('div');
  msg.className = `msg ${role}`;
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.textContent = text;
  msg.appendChild(bubble);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function runGuidedDemo(question, steps) {
  chatMessages.innerHTML = '';
  addMessage('user', question);
  let i = 0;
  const interval = setInterval(() => {
    if (i >= steps.length) {
      clearInterval(interval);
      return;
    }
    addMessage('bot', steps[i]);
    i++;
  }, 900);
}

if (chatForm && chatInput) {
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = chatInput.value.trim();
    if (!q) return;
    // Default to a simple math-style guided demo
    runGuidedDemo(q, [
      'First, identify what the problem is asking and list knowns.',
      'Choose a valid method or equation that fits the knowns.',
      'Apply the method step by step, justifying each move.',
      'Check your result (plug back, units, or reasonableness).'
    ]);
    chatInput.value = '';
  });
}

// Load example into demo when clicking "Load into demo"
document.querySelectorAll('.demo-fill').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.getAttribute('data-demo');
    const demo = cannedDemos[key];
    if (demo) runGuidedDemo(demo.question, demo.steps);
  });
});

// Contact form validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const feedback = document.getElementById('contactFeedback');
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();
    if (!name || !email || !message) {
      feedback.textContent = 'Please fill out all fields.';
      feedback.style.color = 'var(--red)';
      return;
    }
    const emailOK = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOK) {
      feedback.textContent = 'Please enter a valid email.';
      feedback.style.color = 'var(--red)';
      return;
    }
    feedback.textContent = 'Message sent! We will get back to you soon.';
    feedback.style.color = 'var(--blue)';
    contactForm.reset();
  });
}

// Review form (append to page)
const reviewForm = document.getElementById('reviewForm');
if (reviewForm) {
  const feedback = document.getElementById('reviewFeedback');
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rating = reviewForm.rating.value;
    const text = reviewForm.reviewText.value.trim();
    if (!rating || !text) {
      feedback.textContent = 'Please select a rating and write a review.';
      feedback.style.color = 'var(--red)';
      return;
    }
    // Append a new review card (front-end only)
    const grid = document.querySelector('.review-grid');
    const card = document.createElement('div');
    card.className = 'review-card';
    const stars = document.createElement('div');
    stars.className = 'stars';
    stars.textContent = rating;
    const p = document.createElement('p');
    p.textContent = `“${text}”`;
    card.appendChild(stars);
    card.appendChild(p);
    grid.appendChild(card);

    feedback.textContent = 'Thanks for your review!';
    feedback.style.color = 'var(--blue)';
    reviewForm.reset();
  });
}