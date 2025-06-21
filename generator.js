// generator.js
// Handles UI logic for AvatarVerse generator page

// Placeholder for Multiavatar function (to be replaced with actual integration)
function generateMultiavatar(seed, options) {
  // Return a sample SVG for now
  return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${options.bgcolor}"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-size="32">${seed[0] || '?'}</text></svg>`;
}

let selectedBgColor = '#FFD700'; // Default color

function updatePreview() {
  const seed = document.getElementById('seed').value || 'Avatar';
  const bgcolor = selectedBgColor;
  const overlay = document.getElementById('overlay').value;
  const theme = document.querySelector('input[name="theme"]:checked').value;
  const part = document.getElementById('part').value;

  // Generate SVG (replace with real Multiavatar call)
  const svg = generateMultiavatar(seed, { bgcolor, theme, part });

  const preview = document.getElementById('avatar-preview');
  preview.innerHTML = svg;

  // Animate preview
  preview.classList.remove('animate-in');
  void preview.offsetWidth; // force reflow
  preview.classList.add('animate-in');

  // Overlay text
  if (overlay) {
    const overlayDiv = document.createElement('div');
    overlayDiv.className = 'avatar-overlay';
    overlayDiv.textContent = overlay;
    preview.appendChild(overlayDiv);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const inputs = document.querySelectorAll('#avatar-form input, #avatar-form select');
  inputs.forEach(input => {
    input.addEventListener('input', updatePreview);
    input.addEventListener('change', updatePreview);
  });

  // Color button logic
  const colorBtns = document.querySelectorAll('.color-btn');
  colorBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      colorBtns.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedBgColor = btn.getAttribute('data-color');
      updatePreview();
    });
  });
  // Set default selected
  if (colorBtns.length) {
    colorBtns[0].classList.add('selected');
  }
  updatePreview();

  // Download PNG (html2canvas integration placeholder)
  document.getElementById('download-btn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Download functionality will use html2canvas.');
  });

  // Submit to Community Wall (placeholder)
  document.getElementById('submit-btn').addEventListener('click', function(e) {
    e.preventDefault();
    alert('Avatar will be submitted to the community wall (backend integration needed).');
  });

  // Animate form groups in sequence
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach((group, i) => {
    setTimeout(() => group.classList.add('animate-in'), 120 * i);
  });

  // Confetti burst on Generate
  function confettiBurst() {
    const colors = ['#FFD700', '#2ECC40', '#3A8DFF', '#FFEF8F', '#FF7B7B'];
    const confettiCount = 36;
    for (let i = 0; i < confettiCount; i++) {
      const conf = document.createElement('div');
      conf.className = 'confetti';
      conf.style.background = colors[Math.floor(Math.random() * colors.length)];
      conf.style.left = (50 + Math.random() * 30 - 15) + '%';
      conf.style.top = '55%';
      conf.style.transform = `rotate(${Math.random() * 360}deg)`;
      conf.style.setProperty('--confetti-x', (Math.random() * 2 - 1) * 120 + 'px');
      conf.style.setProperty('--confetti-y', (-Math.random() * 180 - 80) + 'px');
      document.body.appendChild(conf);
      setTimeout(() => conf.remove(), 1200);
    }
  }
  const genBtn = document.getElementById('generate-btn');
  if (genBtn) {
    genBtn.addEventListener('click', confettiBurst);
  }

  // Randomize seed button logic
  const randomWords = ['PixelHero', 'CyberCat', 'NeonNinja', 'Astra', 'Nova', 'Byte', 'Echo', 'Vibe', 'Spark', 'Zenith', 'Blitz', 'Luna', 'Orbit', 'Quark', 'Jolt'];
  const randomizeBtn = document.getElementById('randomize-seed');
  const seedInput = document.getElementById('seed');
  if (randomizeBtn && seedInput) {
    randomizeBtn.addEventListener('click', function() {
      const word = randomWords[Math.floor(Math.random() * randomWords.length)];
      seedInput.value = word;
      seedInput.dispatchEvent(new Event('input'));
    });
  }

  // Shake animation for preview if empty seed
  if (genBtn) {
    genBtn.addEventListener('click', function() {
      if (!seedInput.value.trim()) {
        const preview = document.getElementById('avatar-preview');
        preview.classList.remove('shake');
        void preview.offsetWidth;
        preview.classList.add('shake');
        setTimeout(() => preview.classList.remove('shake'), 500);
      }
    });
  }
}); 