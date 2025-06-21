// challenges.js
// Handles Challenges page logic

const challenges = [
  {
    id: 1,
    theme: 'Cyberpunk Week',
    description: 'Create your best cyberpunk avatar!',
    leaderboard: [
      { name: '@cyberqueen', svg: '<svg width="60" height="60"><rect width="60" height="60" fill="#6c47ff"/></svg>', score: 12 },
      { name: '@neonbob', svg: '<svg width="60" height="60"><circle cx="30" cy="30" r="28" fill="#ff7b7b"/></svg>', score: 9 }
    ]
  },
  {
    id: 2,
    theme: 'Alien Invasion',
    description: 'Aliens have landed! Show us your best alien avatar.',
    leaderboard: [
      { name: '@extraterrestrial', svg: '<svg width="60" height="60"><ellipse cx="30" cy="30" rx="28" ry="20" fill="#00d084"/></svg>', score: 15 }
    ]
  }
];

function renderChallenges() {
  const list = document.getElementById('challenges-list');
  list.innerHTML = '';
  challenges.forEach((challenge, cidx) => {
    const div = document.createElement('div');
    div.className = 'challenge-block';
    div.innerHTML = `
      <h3>${challenge.theme}</h3>
      <p>${challenge.description}</p>
      <div class="challenge-leaderboard">
        <strong>Leaderboard:</strong>
        <ul>
          ${challenge.leaderboard.map((entry, lidx) => `<li style="animation-delay:${0.2 + lidx * 0.13}s"><span class="lb-avatar">${entry.svg}</span> ${entry.name} <span class="lb-score">${entry.score} pts</span></li>`).join('')}
        </ul>
      </div>
      <form class="challenge-submit-form" style="animation-delay:${0.2 + (challenge.leaderboard.length || 1) * 0.13}s">
        <input type="text" placeholder="Your seed or username" required>
        <button type="submit">Submit Avatar</button>
      </form>
    `;
    div.style.animationDelay = `${cidx * 0.18}s`;
    list.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderChallenges();
  document.getElementById('challenges-list').addEventListener('submit', function(e) {
    if (e.target.classList.contains('challenge-submit-form')) {
      e.preventDefault();
      alert('Avatar submitted to challenge! (backend integration needed)');
    }
  });
}); 