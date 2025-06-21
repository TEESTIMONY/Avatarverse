// community.js
// Handles Community Wall UI logic

// Placeholder avatars
const avatars = [
  {
    id: 1,
    seed: 'Alice',
    overlay: '@alice',
    svg: '<svg width="100" height="100"><circle cx="50" cy="50" r="48" fill="#6c47ff"/></svg>',
    reactions: { heart: 2, fire: 1, laugh: 0 },
    created: Date.now() - 100000
  },
  {
    id: 2,
    seed: 'Bob',
    overlay: '@bob',
    svg: '<svg width="100" height="100"><rect width="100" height="100" fill="#ff7b7b"/></svg>',
    reactions: { heart: 1, fire: 3, laugh: 2 },
    created: Date.now() - 50000
  }
];

function renderGrid() {
  const grid = document.getElementById('community-grid');
  grid.innerHTML = '';
  avatars.forEach((avatar, idx) => {
    const card = document.createElement('div');
    card.className = 'community-card';
    card.style.opacity = '0';
    card.innerHTML = `
      <div class="community-avatar">${avatar.svg}</div>
      <div class="community-overlay">${avatar.overlay}</div>
      <div class="community-reactions">
        <button class="react-btn" data-type="heart" data-idx="${idx}" tabindex="0" aria-label="React with heart"><span class="react-emoji">❤️</span> <span class="react-count">${avatar.reactions.heart}</span></button>
        <button class="react-btn" data-type="fire" data-idx="${idx}" tabindex="0" aria-label="React with fire"><span class="react-emoji">🔥</span> <span class="react-count">${avatar.reactions.fire}</span></button>
        <button class="react-btn" data-type="laugh" data-idx="${idx}" tabindex="0" aria-label="React with laugh"><span class="react-emoji">😂</span> <span class="react-count">${avatar.reactions.laugh}</span></button>
      </div>
      <button class="remix-btn" data-idx="${idx}" tabindex="0" aria-label="Remix this Avatar"><span style="margin-right:0.5em;">🔄</span>Remix this Avatar</button>
    `;
    grid.appendChild(card);
  });
  // Animate grid items in
  const cards = grid.querySelectorAll('.community-card');
  cards.forEach((card, i) => {
    setTimeout(() => { card.classList.add('animated'); card.style.opacity = '1'; }, 90 * i);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderGrid();

  document.getElementById('sort').addEventListener('change', function(e) {
    if (e.target.value === 'liked') {
      avatars.sort((a, b) => (b.reactions.heart + b.reactions.fire + b.reactions.laugh) - (a.reactions.heart + a.reactions.fire + a.reactions.laugh));
    } else {
      avatars.sort((a, b) => b.created - a.created);
    }
    renderGrid();
  });

  document.getElementById('community-grid').addEventListener('click', function(e) {
    if (e.target.classList.contains('react-btn')) {
      const idx = e.target.getAttribute('data-idx');
      const type = e.target.getAttribute('data-type');
      avatars[idx].reactions[type]++;
      // Animate the reaction count
      const countSpan = e.target.querySelector('.react-count');
      countSpan.classList.remove('jump');
      void countSpan.offsetWidth;
      countSpan.classList.add('jump');
      setTimeout(() => countSpan.classList.remove('jump'), 350);
      renderGrid();
    }
    if (e.target.classList.contains('remix-btn')) {
      const idx = e.target.getAttribute('data-idx');
      alert('Remix: would open generator with seed ' + avatars[idx].seed);
    }
  });

  // Back to Top button logic
  const backToTop = document.getElementById('back-to-top');
  function toggleBackToTop() {
    if (window.scrollY > 200) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  window.addEventListener('scroll', toggleBackToTop);
  backToTop.addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    backToTop.blur();
  });
}); 