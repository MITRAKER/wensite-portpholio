// ═══════════════════════════════════════════
//  ROBCO TERMINAL OS — MITRA KERMANIAN
//  script.js
// ═══════════════════════════════════════════

// ── Custom cursor ──
const dot = document.getElementById('cursorDot');
document.addEventListener('mousemove', e => {
  dot.style.left = e.clientX + 'px';
  dot.style.top  = e.clientY + 'px';
});

// ── Boot sequence ──
const bootLines  = document.querySelectorAll('#bootLog p');
const bootFill   = document.getElementById('bootFill');
const bootEnter  = document.getElementById('bootEnter');
let lineIndex = 0;

function bootStep() {
  if (lineIndex < bootLines.length) {
    bootLines[lineIndex].classList.add('show', 'ok');
    lineIndex++;
    bootFill.style.width = (lineIndex / bootLines.length * 85) + '%';
    setTimeout(bootStep, 280 + Math.random() * 220);
  } else {
    bootFill.style.width = '100%';
    setTimeout(() => { bootEnter.style.display = 'block'; }, 400);
  }
}
setTimeout(bootStep, 400);

function enterTerminal() {
  document.getElementById('bootScreen').classList.add('hidden');
  document.getElementById('terminalWrap').style.display = 'block';
}
// Make enterTerminal globally accessible for the onclick attribute
window.enterTerminal = enterTerminal;

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

// ── Skill bars (animate on scroll into view) ──
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('animate'); });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-fill').forEach(f => skillObs.observe(f));

// ── Section reveal on scroll ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(s => revealObs.observe(s));

// ── Email toast notification ──
const emailBtn = document.getElementById('emailBtn');
if (emailBtn) {
  emailBtn.addEventListener('click', () => {
    const old = document.querySelector('.toast');
    if (old) old.remove();
    const toast = document.createElement('div');
    toast.textContent = '>> TRANSMISSION INITIATED...';
    toast.style.cssText = [
      'position:fixed', 'bottom:2rem', 'right:2rem',
      'background:#000', 'color:#3dff6e',
      'border:1px solid #3dff6e',
      'padding:0.85rem 1.5rem',
      "font-family:'Share Tech Mono',monospace",
      'font-size:0.85rem', 'z-index:9999',
      'box-shadow:0 0 20px #3dff6e', 'letter-spacing:2px'
    ].join(';');
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  });
}

// ── AI Orbs — mouse parallax ──
const orbs = document.querySelectorAll('.ai-orb');
let targetX = window.innerWidth  / 2;
let targetY = window.innerHeight / 2;
let lerpX   = targetX;
let lerpY   = targetY;

document.addEventListener('mousemove', e => {
  targetX = e.clientX;
  targetY = e.clientY;
});

(function animLoop() {
  lerpX += (targetX - lerpX) * 0.07;
  lerpY += (targetY - lerpY) * 0.07;
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  orbs.forEach(orb => {
    const depth = parseFloat(orb.dataset.depth) || 0.05;
    const dx = (lerpX - cx) * depth;
    const dy = (lerpY - cy) * depth;
    orb.style.transform = `translate(${dx}px, ${dy}px)`;
  });
  requestAnimationFrame(animLoop);
})();
