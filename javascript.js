/* ============================================================
   LUXURY BIRTHDAY WEBSITE — SCRIPT.JS
   Author: Made with Love for Ali Nawaz ❤️
   ============================================================ */

'use strict';

/* ===================== STATE ===================== */
const State = {
  currentScreen: 1,
  totalScreens: 8,
  isTransitioning: false,
  musicPlaying: false,
  candleBlown: false,
  envelopeOpened: false,
  lightboxOpen: false,
  lightboxIndex: 0,
  confettiActive: false,
  fireworksActive: false,
  fireworksTimer: null,
  confettiParticles: [],
  fireworkParticles: [],
};

/* ===================== DOM REFS ===================== */
const DOM = {
  screens:         () => document.querySelectorAll('.screen'),
  screen:          (n) => document.getElementById(`screen-${n}`),
  navPrev:         document.getElementById('nav-prev'),
  navNext:         document.getElementById('nav-next'),
  screenDots:      document.getElementById('screen-dots'),
  musicPlayer:     document.getElementById('music-player'),
  musicBtn:        document.getElementById('music-btn'),
  musicIconPlay:   document.getElementById('music-icon-play'),
  musicIconPause:  document.getElementById('music-icon-pause'),
  bgMusic:         document.getElementById('bg-music'),
  openSurpriseBtn: document.getElementById('open-surprise-btn'),
  particleCanvas:  document.getElementById('particle-canvas'),
  confettiCanvas:  document.getElementById('confetti-canvas'),
  fireworksCanvas: document.getElementById('fireworks-canvas'),
  globalHearts:    document.getElementById('global-hearts'),
  lightbox:        document.getElementById('lightbox'),
  lightboxImg:     document.getElementById('lightbox-img'),
  lightboxCaption: document.getElementById('lightbox-caption'),
  lightboxClose:   document.getElementById('lightbox-close'),
  lightboxPrev:    document.getElementById('lightbox-prev'),
  lightboxNext:    document.getElementById('lightbox-next'),
  envelopeWrapper: document.getElementById('envelope-wrapper'),
  envelopeFlap:    document.getElementById('envelope-flap'),
  envelopeLetter:  document.getElementById('envelope-letter'),
  envelopeHint:    document.getElementById('envelope-click-hint'),
  blowCandleBtn:   document.getElementById('blow-candle-btn'),
  candleFlame:     document.getElementById('candle-flame'),
  cakeMessage:     document.getElementById('cake-message'),
  finalStarsBg:    document.getElementById('final-stars-bg'),
  finalHeartsFloat:document.getElementById('final-hearts-float'),
};

/* ===================== GALLERY DATA ===================== */
const galleryImages = [
  { src: 'images/Ali0.jpeg',  caption: 'A Moment In Time' },
  { src: 'images/Ali01.jpeg', caption: 'You Are My Everything' },
  { src: 'images/Ali02.jpeg', caption: 'My Favourite Person' },
  { src: 'images/Ali03.jpeg', caption: 'Always In My Heart' },
  { src: 'images/Ali04.jpeg', caption: 'Forever & Always' },
];

/* ============================================================
   PARTICLE SYSTEM (Background Canvas - Screen 1)
   ============================================================ */
const ParticleSystem = (() => {
  const canvas = DOM.particleCanvas;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame = null;
  let running = false;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      size:  Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.6
        ? `rgba(201,168,76,${Math.random() * 0.5 + 0.1})`
        : `rgba(255,255,255,${Math.random() * 0.3 + 0.05})`,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    };
  }

  function init() {
    resize();
    particles = [];
    const count = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < count; i++) particles.push(createParticle());
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.pulse += p.pulseSpeed;
      const alpha = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
    if (running) animFrame = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    draw();
  }

  function stop() {
    running = false;
    if (animFrame) cancelAnimationFrame(animFrame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener('resize', () => { resize(); init(); });
  init();

  return { start, stop };
})();

/* ============================================================
   CONFETTI SYSTEM
   ============================================================ */
const ConfettiSystem = (() => {
  const canvas = DOM.confettiCanvas;
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame = null;
  let running = false;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  const colors = [
    '#c9a84c','#e8c97a','#f5e0a0','#8b1a28','#b02840',
    '#ff6b6b','#ffd700','#ff69b4','#ffffff','#6b0f1a'
  ];

  function createParticle() {
    return {
      x:       Math.random() * canvas.width,
      y:       -20,
      color:   colors[Math.floor(Math.random() * colors.length)],
      size:    Math.random() * 8 + 4,
      speedX:  (Math.random() - 0.5) * 4,
      speedY:  Math.random() * 3 + 2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 8,
      shape:   Math.random() > 0.5 ? 'rect' : 'circle',
      opacity: 1,
      gravity: 0.08,
    };
  }

  function burst(count = 80) {
    for (let i = 0; i < count; i++) {
      const p = createParticle();
      p.x = Math.random() * canvas.width;
      p.y = Math.random() * canvas.height * 0.3;
      p.speedX = (Math.random() - 0.5) * 8;
      p.speedY = Math.random() * 6 - 2;
      particles.push(p);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.x += p.speedX;
      p.y += p.speedY;
      p.speedY += p.gravity;
      p.speedX *= 0.99;
      p.rotation += p.rotSpeed;
      if (p.y > canvas.height * 0.7) p.opacity -= 0.015;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === 'rect') {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });

    particles = particles.filter(p => p.opacity > 0 && p.y < canvas.height + 50);

    if (running) animFrame = requestAnimationFrame(draw);
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    draw();
  }

  function stop() {
    running = false;
    if (animFrame) cancelAnimationFrame(animFrame);
    particles = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function trigger(count) {
    if (!running) { start(); }
    burst(count);
  }

  window.addEventListener('resize', resize);
  resize();

  return { start, stop, trigger, burst };
})();

/* ============================================================
   FIREWORKS SYSTEM
   ============================================================ */
const FireworksSystem = (() => {
  const canvas = DOM.fireworksCanvas;
  const ctx = canvas.getContext('2d');
  let rockets = [];
  let sparks  = [];
  let animFrame = null;
  let running = false;
  let launchInterval = null;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  const colors = [
    '#c9a84c','#e8c97a','#f5e0a0','#ff6b6b','#ffd700',
    '#ff69b4','#ffffff','#8b1a28','#b02840','#ff4500'
  ];

  function createRocket() {
    const x = canvas.width * (0.2 + Math.random() * 0.6);
    return {
      x, y: canvas.height + 10,
      targetY: canvas.height * (0.1 + Math.random() * 0.4),
      speed: 8 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
      trail: [],
    };
  }

  function explode(x, y, color) {
    const count = 80 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
      const speed = Math.random() * 6 + 2;
      sparks.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.3 ? color : colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2.5 + 1,
        opacity: 1,
        gravity: 0.12,
        friction: 0.97,
      });
    }
  }

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Rockets
    rockets = rockets.filter(r => {
      r.y -= r.speed;
      r.trail.push({ x: r.x, y: r.y });
      if (r.trail.length > 10) r.trail.shift();

      r.trail.forEach((t, i) => {
        ctx.save();
        ctx.globalAlpha = i / r.trail.length * 0.5;
        ctx.fillStyle = r.color;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      if (r.y <= r.targetY) {
        explode(r.x, r.y, r.color);
        return false;
      }
      return true;
    });

    // Sparks
    sparks = sparks.filter(s => {
      s.x  += s.vx;
      s.y  += s.vy;
      s.vy += s.gravity;
      s.vx *= s.friction;
      s.vy *= s.friction;
      s.opacity -= 0.018;

      ctx.save();
      ctx.globalAlpha = Math.max(0, s.opacity);
      ctx.fillStyle = s.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      return s.opacity > 0;
    });

    if (running) animFrame = requestAnimationFrame(draw);
  }

  function launch() {
    rockets.push(createRocket());
  }

  function start() {
    if (running) return;
    running = true;
    resize();
    draw();
    launch();
    launchInterval = setInterval(launch, 600);
  }

  function stop() {
    running = false;
    if (launchInterval) clearInterval(launchInterval);
    if (animFrame) cancelAnimationFrame(animFrame);
    rockets = [];
    sparks  = [];
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  window.addEventListener('resize', resize);
  resize();

  return { start, stop, launch };
})();

/* ============================================================
   FLOATING HEARTS
   ============================================================ */
const HeartsSystem = (() => {
  const container = DOM.globalHearts;
  const heartChars = ['❤', '❤️', '♥', '💕', '💗', '💖', '💓'];
  let intervals = [];

  function createHeart() {
    const heart = document.createElement('span');
    heart.className = 'floating-heart';
    heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 1.2 + 0.6;
    heart.style.fontSize = size + 'rem';
    const duration = Math.random() * 8 + 6;
    heart.style.animationDuration = duration + 's';
    heart.style.animationDelay = '0s';
    heart.style.color = Math.random() > 0.5
      ? 'rgba(176,40,64,0.8)'
      : 'rgba(255,100,130,0.7)';
    container.appendChild(heart);
    setTimeout(() => { if (heart.parentNode) heart.remove(); }, duration * 1000);
  }

  function start() {
    stop();
    createHeart();
    const id = setInterval(createHeart, 900);
    intervals.push(id);
  }

  function stop() {
    intervals.forEach(id => clearInterval(id));
    intervals = [];
    container.innerHTML = '';
  }

  return { start, stop, createHeart };
})();

/* ============================================================
   SCREEN NAVIGATION
   ============================================================ */
const Navigation = (() => {

  function buildDots() {
    DOM.screenDots.innerHTML = '';
    for (let i = 1; i <= State.totalScreens; i++) {
      const dot = document.createElement('div');
      dot.className = 'screen-dot' + (i === State.currentScreen ? ' active' : '');
      dot.dataset.target = i;
      dot.addEventListener('click', () => goTo(i));
      DOM.screenDots.appendChild(dot);
    }
  }

  function updateDots() {
    document.querySelectorAll('.screen-dot').forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === State.currentScreen);
    });
  }

  function updateArrows() {
    DOM.navPrev.classList.toggle('hidden', State.currentScreen <= 1);
    DOM.navNext.classList.toggle('hidden', State.currentScreen >= State.totalScreens);
  }

  function goTo(target) {
    if (State.isTransitioning || target === State.currentScreen) return;
    if (target < 1 || target > State.totalScreens) return;

    State.isTransitioning = true;

    const currentEl = DOM.screen(State.currentScreen);
    const targetEl  = DOM.screen(target);

    // Lifecycle hooks
    onScreenLeave(State.currentScreen);

    currentEl.classList.add('exit-left');
    currentEl.classList.remove('active');

    setTimeout(() => {
      currentEl.classList.remove('exit-left');
      targetEl.classList.add('active');
      State.currentScreen = target;

      updateDots();
      updateArrows();
      onScreenEnter(target);

      setTimeout(() => { State.isTransitioning = false; }, 700);
    }, 400);
  }

  function next() { goTo(State.currentScreen + 1); }
  function prev() { goTo(State.currentScreen - 1); }

  function init() {
    DOM.navPrev.addEventListener('click', prev);
    DOM.navNext.addEventListener('click', next);

    // Keyboard
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   prev();
    });

    // Touch / Swipe
    let touchStartX = 0, touchStartY = 0;
    document.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    document.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) next();
        else prev();
      }
    }, { passive: true });

    buildDots();
    updateArrows();
  }

  return { init, goTo, next, prev };
})();

/* ============================================================
   SCREEN LIFECYCLE HOOKS
   ============================================================ */
function onScreenLeave(screenNum) {
  if (screenNum === 1) ParticleSystem.stop();
  if (screenNum === 8) {
    FireworksSystem.stop();
    ConfettiSystem.stop();
  }
}

function onScreenEnter(screenNum) {
  // Screen-specific initializations
  switch (screenNum) {
    case 1:
      ParticleSystem.start();
      break;

    case 2:
      animateGalleryItems();
      break;

    case 3:
      resetEnvelope();
      break;

    case 4:
      animateLetterText();
      break;

    case 5:
      animateReasonCards();
      break;

    case 6:
      resetCake();
      break;

    case 7:
      animatePrayerCard();
      break;

    case 8:
      startFinalScreen();
      break;
  }
}

/* ============================================================
   SCREEN 1: WELCOME
   ============================================================ */
function initScreen1() {
  ParticleSystem.start();

  DOM.openSurpriseBtn.addEventListener('click', function(e) {
    // Ripple effect
    createRipple(e, this);

    // Start music
    MusicPlayer.startMusic();

    // Show navigation
    DOM.navPrev.classList.remove('hidden');
    DOM.navNext.classList.remove('hidden');
    DOM.screenDots.classList.remove('hidden');
    DOM.musicPlayer.classList.remove('hidden');

    // Go to gallery
    setTimeout(() => Navigation.goTo(2), 400);
  });
}

function createRipple(e, btn) {
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  const size = Math.max(rect.width, rect.height);
  ripple.style.width  = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.left   = (e.clientX - rect.left - size / 2) + 'px';
  ripple.style.top    = (e.clientY - rect.top  - size / 2) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 700);
}

/* ============================================================
   MUSIC PLAYER
   ============================================================ */
const MusicPlayer = (() => {
  function startMusic() {
    DOM.bgMusic.volume = 0;
    DOM.bgMusic.play().then(() => {
      State.musicPlaying = true;
      updateIcon(true);
      fadeIn();
    }).catch(() => {
      // Autoplay blocked — show player, user can click
      updateIcon(false);
    });
  }

  function fadeIn() {
    let vol = 0;
    const id = setInterval(() => {
      vol = Math.min(0.55, vol + 0.02);
      DOM.bgMusic.volume = vol;
      if (vol >= 0.55) clearInterval(id);
    }, 120);
  }

  function toggle() {
    if (State.musicPlaying) {
      DOM.bgMusic.pause();
      State.musicPlaying = false;
      updateIcon(false);
    } else {
      DOM.bgMusic.play().catch(() => {});
      State.musicPlaying = true;
      updateIcon(true);
    }
  }

  function updateIcon(playing) {
    DOM.musicIconPlay.style.display  = playing ? 'none' : 'block';
    DOM.musicIconPause.style.display = playing ? 'block' : 'none';
  }

  DOM.musicBtn.addEventListener('click', toggle);

  return { startMusic, toggle };
})();

/* ============================================================
   SCREEN 2: GALLERY & LIGHTBOX
   ============================================================ */
function animateGalleryItems() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach((item, i) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
      item.style.opacity = '1';
      item.style.transform = 'translateY(0)';
    }, i * 100 + 100);
  });
}

function initLightbox() {
  const items = document.querySelectorAll('.gallery-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      openLightbox(parseInt(item.dataset.index));
    });
  });

  DOM.lightboxClose.addEventListener('click', closeLightbox);
  DOM.lightboxPrev.addEventListener('click', () => lightboxNav(-1));
  DOM.lightboxNext.addEventListener('click', () => lightboxNav(1));

  DOM.lightbox.querySelector('.lightbox-backdrop').addEventListener('click', closeLightbox);

  document.addEventListener('keydown', e => {
    if (!State.lightboxOpen) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft')  lightboxNav(-1);
    if (e.key === 'ArrowRight') lightboxNav(1);
  });
}

function openLightbox(index) {
  State.lightboxOpen = true;
  State.lightboxIndex = index;
  updateLightboxImg();
  DOM.lightbox.classList.remove('hidden');
  DOM.lightbox.style.opacity = '0';
  requestAnimationFrame(() => {
    DOM.lightbox.style.transition = 'opacity 0.3s ease';
    DOM.lightbox.style.opacity = '1';
  });
}

function closeLightbox() {
  DOM.lightbox.style.opacity = '0';
  setTimeout(() => {
    DOM.lightbox.classList.add('hidden');
    State.lightboxOpen = false;
  }, 300);
}

function lightboxNav(dir) {
  State.lightboxIndex = (State.lightboxIndex + dir + galleryImages.length) % galleryImages.length;
  const wrap = DOM.lightboxImg.parentElement;
  wrap.style.opacity = '0';
  wrap.style.transform = 'scale(0.95)';
  setTimeout(() => {
    updateLightboxImg();
    wrap.style.transition = 'opacity 0.3s, transform 0.3s';
    wrap.style.opacity = '1';
    wrap.style.transform = 'scale(1)';
  }, 200);
}

function updateLightboxImg() {
  const img = galleryImages[State.lightboxIndex];
  DOM.lightboxImg.src = img.src;
  DOM.lightboxCaption.textContent = img.caption;
}

/* ============================================================
   SCREEN 3: ENVELOPE ANIMATION
   ============================================================ */
function resetEnvelope() {
  if (!State.envelopeOpened) return;
  State.envelopeOpened = false;
  DOM.envelopeFlap.classList.remove('open');
  DOM.envelopeLetter.classList.remove('opened');
  if (DOM.envelopeHint) DOM.envelopeHint.style.opacity = '1';
}

function initEnvelope() {
  DOM.envelopeWrapper.addEventListener('click', () => {
    if (State.envelopeOpened) {
      // Navigate to letter screen
      Navigation.goTo(4);
      return;
    }
    openEnvelope();
  });
}

function openEnvelope() {
  State.envelopeOpened = true;

  // Step 1: Flap opens
  DOM.envelopeFlap.classList.add('open');

  // Step 2: Letter slides out
  setTimeout(() => {
    DOM.envelopeLetter.classList.add('opened');
  }, 500);

  // Step 3: Hint changes
  setTimeout(() => {
    if (DOM.envelopeHint) {
      DOM.envelopeHint.textContent = '✦ Tap to Read the Letter ✦';
    }
  }, 1200);
}

/* ============================================================
   SCREEN 4: LOVE LETTER ANIMATION
   ============================================================ */
function animateLetterText() {
  const paragraphs = document.querySelectorAll('#screen-4 .letter-text p');
  paragraphs.forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transform = 'translateY(16px)';
    p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      p.style.opacity = '1';
      p.style.transform = 'translateY(0)';
    }, i * 150 + 300);
  });

  const closing = document.querySelectorAll('#screen-4 .letter-closing > *');
  closing.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(12px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, paragraphs.length * 150 + i * 200 + 400);
  });
}

/* ============================================================
   SCREEN 5: REASONS ANIMATION
   ============================================================ */
function animateReasonCards() {
  const cards = document.querySelectorAll('.reason-card');
  cards.forEach((card, i) => {
    const delay = parseInt(card.dataset.delay || 0);
    card.style.animationDelay = (delay + 100) + 'ms';
    card.style.animationDuration = '0.6s';
    // Re-trigger animation
    card.style.animation = 'none';
    card.offsetHeight; // reflow
    card.style.animation = `reasonEntrance 0.6s ease ${delay + 100}ms forwards`;
  });
}

/* ============================================================
   SCREEN 6: BIRTHDAY CAKE
   ============================================================ */
function resetCake() {
  if (State.candleBlown) return;
  DOM.candleFlame.classList.remove('extinguished');
  DOM.cakeMessage.classList.add('hidden');
  DOM.blowCandleBtn.style.display = 'inline-flex';
}

function initCake() {
  DOM.blowCandleBtn.addEventListener('click', function(e) {
    if (State.candleBlown) return;
    State.candleBlown = true;

    createRipple(e, this);

    // Blow out candle — wind puff animation
    blowOutCandle();

    setTimeout(() => {
      // Show confetti & fireworks
      ConfettiSystem.trigger(120);
      FireworksSystem.start();

      // Show message
      DOM.cakeMessage.classList.remove('hidden');
      DOM.blowCandleBtn.style.opacity = '0';
      DOM.blowCandleBtn.style.pointerEvents = 'none';

      // Stop fireworks after 8s
      setTimeout(() => {
        FireworksSystem.stop();
        ConfettiSystem.stop();
        State.candleBlown = false; // allow reset
      }, 8000);
    }, 800);
  });
}

function blowOutCandle() {
  const flame = DOM.candleFlame;
  // Quick flutter then extinguish
  flame.style.animation = 'none';
  flame.style.transform = 'scaleX(3) translateX(10px)';
  flame.style.transition = 'transform 0.2s ease, opacity 0.3s ease';
  setTimeout(() => {
    flame.style.opacity = '0';
    setTimeout(() => {
      flame.classList.add('extinguished');
      flame.style.opacity = '1';
      flame.style.transform = '';
      flame.style.transition = '';
    }, 300);
  }, 200);
}

/* ============================================================
   SCREEN 7: PRAYER
   ============================================================ */
function animatePrayerCard() {
  const card = document.querySelector('#screen-7 .prayer-card');
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px) scale(0.97)';
  card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  setTimeout(() => {
    card.style.opacity = '1';
    card.style.transform = 'translateY(0) scale(1)';
  }, 200);

  const paragraphs = document.querySelectorAll('#screen-7 .prayer-text p');
  paragraphs.forEach((p, i) => {
    p.style.opacity = '0';
    p.style.transform = 'translateX(-10px)';
    p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    setTimeout(() => {
      p.style.opacity = '1';
      p.style.transform = 'translateX(0)';
    }, i * 200 + 600);
  });
}

/* ============================================================
   SCREEN 8: FINAL SCREEN
   ============================================================ */
function startFinalScreen() {
  // Background stars
  createFinalStars();

  // Floating hearts inside card
  createFinalFloatingHearts();

  // Fireworks & confetti
  setTimeout(() => {
    FireworksSystem.start();
    ConfettiSystem.trigger(100);
  }, 500);

  setTimeout(() => ConfettiSystem.trigger(80), 2500);
  setTimeout(() => ConfettiSystem.trigger(60), 5000);

  // Stop fireworks after 15s
  setTimeout(() => {
    FireworksSystem.stop();
  }, 15000);

  // Animate content
  const content = document.querySelector('.final-content');
  content.style.opacity = '0';
  content.style.transform = 'translateY(30px) scale(0.96)';
  content.style.transition = 'opacity 1s ease, transform 1s ease';
  setTimeout(() => {
    content.style.opacity = '1';
    content.style.transform = 'translateY(0) scale(1)';
  }, 300);
}

function createFinalStars() {
  const container = DOM.finalStarsBg;
  if (!container) return;
  container.innerHTML = '';
  const count = 40;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('span');
    star.className = 'final-star-el';
    star.textContent = Math.random() > 0.5 ? '✦' : '★';
    star.style.left   = Math.random() * 100 + '%';
    star.style.top    = Math.random() * 100 + '%';
    star.style.fontSize = (Math.random() * 0.8 + 0.4) + 'rem';
    star.style.color  = Math.random() > 0.5 ? '#c9a84c' : 'rgba(255,255,255,0.4)';
    const dur = Math.random() * 3 + 2;
    star.style.animationDuration  = dur + 's';
    star.style.animationDelay     = Math.random() * 3 + 's';
    container.appendChild(star);
  }
}

function createFinalFloatingHearts() {
  const container = DOM.finalHeartsFloat;
  if (!container) return;
  container.innerHTML = '';

  function addHeart() {
    const h = document.createElement('span');
    h.className = 'final-floating-heart';
    h.textContent = Math.random() > 0.5 ? '❤' : '♥';
    h.style.left   = Math.random() * 100 + '%';
    h.style.bottom = '0';
    h.style.color  = `rgba(${Math.random() > 0.5 ? '176,40,64' : '255,100,130'},${Math.random() * 0.5 + 0.4})`;
    const dur = Math.random() * 5 + 4;
    h.style.animationDuration = dur + 's';
    h.style.animationDelay = '0s';
    container.appendChild(h);
    setTimeout(() => h.remove(), dur * 1000);
  }

  addHeart();
  const id = setInterval(addHeart, 800);
  // Store cleanup
  DOM.finalHeartsFloat._cleanupId = id;
}

/* ============================================================
   GLOBAL FLOATING HEARTS
   ============================================================ */
function initGlobalHearts() {
  HeartsSystem.start();
}

/* ============================================================
   WINDOW RESIZE
   ============================================================ */
window.addEventListener('resize', () => {
  // Re-size canvases handled inside each system
});

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  // Navigation
  Navigation.init();

  // Screen 1
  initScreen1();
  ParticleSystem.start();

  // Gallery lightbox
  initLightbox();

  // Envelope
  initEnvelope();

  // Cake
  initCake();

  // Global hearts
  initGlobalHearts();

  // Start on screen 1
  onScreenEnter(1);

  // Add glass hover micro-interactions to all glass cards
  document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2;
      const y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;
      card.style.transform = `perspective(1000px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) translateZ(4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s ease';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });

  // Reason cards — exclude glass tilt for reason cards on mobile
  if (window.innerWidth <= 768) {
    document.querySelectorAll('.reason-card').forEach(card => {
      card.onmousemove = null;
    });
  }

  console.log('💕 Happy Birthday Ali Nawaz! Made with Love by Alishba ❤️');
});
