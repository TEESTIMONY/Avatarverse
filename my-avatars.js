// my-avatars.js
// Handles My Avatars page logic

function loadMyAvatars() {
  let avatars = [];
  try {
    avatars = JSON.parse(localStorage.getItem('myAvatars')) || [];
  } catch (e) {
    avatars = [];
  }
  return avatars;
}

function renderMyAvatars() {
  const grid = document.getElementById('my-avatars-grid');
  const emptyDiv = document.getElementById('my-avatars-empty');
  const downloadAllBtn = document.getElementById('download-all-btn');
  const avatars = loadMyAvatars();
  grid.innerHTML = '';
  if (avatars.length === 0) {
    emptyDiv.style.display = '';
    downloadAllBtn.style.display = 'none';
    return;
  } else {
    emptyDiv.style.display = 'none';
    downloadAllBtn.style.display = avatars.length > 1 ? '' : 'none';
  }
  avatars.forEach((avatar, i) => {
    const card = document.createElement('div');
    card.className = 'community-card';
    card.style.animationDelay = (0.1 * i) + 's';
    card.innerHTML = `
      <div class="community-avatar">${avatar.svg}</div>
      <div class="community-overlay">${avatar.overlay || ''}</div>
    `;
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderMyAvatars();
  const downloadAllBtn = document.getElementById('download-all-btn');
  if (downloadAllBtn) {
    downloadAllBtn.addEventListener('click', function() {
      alert('Download all avatars (feature coming soon!)');
    });
  }
}); 