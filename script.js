// ========== CONFIGURATION ==========
// Set your featured YouTube video ID here (empty = hidden)
const FEATURED_YOUTUBE_ID = ''; // Example: 'dQw4w9WgXcQ'

// ========== BOOT SCREEN ==========
const bootScreen = document.getElementById('boot-screen');
const bootSkip = document.querySelector('.boot-skip');
let booted = false;

function hideBootScreen() {
    if (booted) return;
    booted = true;
    bootScreen.classList.add('hidden');
    // Trigger cinematic reveal
    document.body.style.animation = 'cameraPushIn 1s ease-out';
}

// Auto-hide after boot animation
setTimeout(() => {
    hideBootScreen();
}, 2000);

// Skip button
bootSkip.addEventListener('click', hideBootScreen);

// Check if already booted this session
if (sessionStorage.getItem('anoziejohn_booted')) {
    hideBootScreen();
} else {
    sessionStorage.setItem('anoziejohn_booted', 'true');
}

// ========== TYPING EFFECT ==========
const typewriter = document.getElementById('typewriter');
const phrases = [
    'Verified Blood Strike Creator',
    'Hand-Drawn Visual Artist',
    'Funny Blood Strike Content'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pause before new phrase
    }
    
    setTimeout(typeWriter, typingSpeed);
}

// Start typing after boot
setTimeout(typeWriter, 2500);

// ========== PARTICLES CANVAS ==========
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationId = null;
let isTabHidden = false;

// Set canvas size
function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class
class Particle {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = ['#00F0FF', '#2979FF', '#B026FF', '#FF2E97', '#FF8A00'][Math.floor(Math.random() * 5)];
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > window.innerWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > window.innerHeight) this.speedY *= -1;
    }
    
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Create particles (scale based on screen size)
const particleCount = Math.min(50, Math.floor(window.innerWidth / 30));
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animate particles
function animateParticles() {
    if (isTabHidden) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    animationId = requestAnimationFrame(animateParticles);
}

animateParticles();

// Pause animation when tab is hidden
document.addEventListener('visibilitychange', () => {
    isTabHidden = document.hidden;
    if (!isTabHidden) {
        animateParticles();
    }
});

// ========== CITY SKYLINE GENERATION ==========
const citySkyline = document.getElementById('city-skyline');

function generateCity() {
    const buildingCount = Math.floor(window.innerWidth / 60);
    
    for (let i = 0; i < buildingCount; i++) {
        const building = document.createElement('div');
        building.className = 'city-building';
        const width = 30 + Math.random() * 40;
        const height = 100 + Math.random() * 200;
        building.style.width = width + 'px';
        building.style.height = height + 'px';
        building.style.left = (i * 50) + 'px';
        
        // Add windows
        const windowCount = Math.floor(Math.random() * 10) + 5;
        for (let j = 0; j < windowCount; j++) {
            const window = document.createElement('div');
            window.className = 'city-window';
            window.style.left = (Math.random() * (width - 10) + 5) + 'px';
            window.style.top = (Math.random() * (height - 20) + 10) + 'px';
            window.style.animationDelay = (Math.random() * 2) + 's';
            building.appendChild(window);
        }
        
        citySkyline.appendChild(building);
    }
}

generateCity();

// ========== FLOATING SHAPES MOUSE PARALLAX ==========
const shapes = document.querySelectorAll('.shape');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 10;
        shape.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
});

// ========== NAVBAR ==========
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
    });
});

// Active section highlighting
const sections = document.querySelectorAll('.section');

function updateActiveLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);

// ========== SCROLL PROGRESS BAR ==========
const scrollProgress = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ========== SECTION REVEAL ON SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ========== 3D CARD TILT EFFECT ==========
const cards = document.querySelectorAll('.card, .art-card, .bs-card, .contact-card, .artist-card, .profile-frame');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// Touch drag for mobile
cards.forEach(card => {
    let startX, startY;
    
    card.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    card.addEventListener('touchmove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.touches[0].clientX - startX;
        const y = e.touches[0].clientY - startY;
        const rotateX = -y / 20;
        const rotateY = x / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    });
    
    card.addEventListener('touchend', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    });
});

// ========== IMAGE LOADING ==========
const images = document.querySelectorAll('img');

images.forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// ========== LIGHTBOX ==========
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxCounter = document.getElementById('lightbox-counter');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const artCards = document.querySelectorAll('.art-card');
const profileFrame = document.querySelector('.profile-frame');
const artistCard = document.querySelector('.artist-card');

let lightboxImages = [];
let currentLightboxIndex = 0;
let isGalleryMode = false;

// Collect all artwork images
artCards.forEach(card => {
    const img = card.querySelector('.art-img');
    const caption = card.querySelector('.caption-text').textContent;
    lightboxImages.push({ src: img.src, caption: caption });
});

// Open lightbox for profile picture
profileFrame.addEventListener('click', () => {
    isGalleryMode = false;
    const img = profileFrame.querySelector('.profile-img');
    openLightbox(img.src, 'AnozieJOHN Profile', false);
});

// Open lightbox for artist portrait
artistCard.addEventListener('click', () => {
    isGalleryMode = false;
    const img = artistCard.querySelector('.artist-img');
    openLightbox(img.src, 'Anozie John - The Artist', false);
});

// Open lightbox for artwork cards
artCards.forEach((card, index) => {
    card.addEventListener('click', () => {
        isGalleryMode = true;
        currentLightboxIndex = index;
        openLightbox(lightboxImages[index].src, lightboxImages[index].caption, true);
    });
});

function openLightbox(src, caption, isGallery) {
    lightboxImg.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    
    if (isGallery) {
        lightboxPrev.style.display = 'flex';
        lightboxNext.style.display = 'flex';
        lightboxCounter.textContent = `${currentLightboxIndex + 1}/${lightboxImages.length}`;
        lightboxCounter.style.display = 'block';
    } else {
        lightboxPrev.style.display = 'none';
        lightboxNext.style.display = 'none';
        lightboxCounter.style.display = 'none';
    }
    
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close on ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// Previous/Next
function showPrev() {
    if (!isGalleryMode) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    lightboxImg.src = lightboxImages[currentLightboxIndex].src;
    lightboxCaption.textContent = lightboxImages[currentLightboxIndex].caption;
    lightboxCounter.textContent = `${currentLightboxIndex + 1}/${lightboxImages.length}`;
}

function showNext() {
    if (!isGalleryMode) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
    lightboxImg.src = lightboxImages[currentLightboxIndex].src;
    lightboxCaption.textContent = lightboxImages[currentLightboxIndex].caption;
    lightboxCounter.textContent = `${currentLightboxIndex + 1}/${lightboxImages.length}`;
}

lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Arrow keys
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') showPrev();
    if (e.key === 'ArrowRight') showNext();
});

// Swipe support
let touchStartX = 0;
let touchEndX = 0;

lightbox.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

lightbox.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            showNext();
        } else {
            showPrev();
        }
    }
}

// ========== COPY UID ==========
const copyUid = document.getElementById('copy-uid');
const uidNumber = document.getElementById('uid-number');

copyUid.addEventListener('click', () => {
    navigator.clipboard.writeText(uidNumber.textContent).then(() => {
        showToast('UID copied ✔');
    });
});

// ========== TOAST NOTIFICATION ==========
const toast = document.getElementById('toast');

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('active');
    
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
}

// ========== FEATURED YOUTUBE VIDEO ==========
const featuredVideo = document.getElementById('featured-video');
const tvContent = document.getElementById('tv-content');

if (FEATURED_YOUTUBE_ID) {
    featuredVideo.classList.add('active');
    tvContent.innerHTML = `<iframe src="https://www.youtube.com/embed/${FEATURED_YOUTUBE_ID}" allowfullscreen></iframe>`;
}

// ========== KILL FEED ==========
const killFeed = document.getElementById('kill-feed');
const killMessages = [
    'AnozieJOHN eliminated Boredom',
    'AnozieJOHN double-killed Procrastination',
    'AnozieJOHN headshot Laziness',
    'AnozieJOHN mega-killed Bad Vibes',
    'AnozieJOHN ultra-killed Negativity',
    'AnozieJOHN rampage destroyed Stress',
    'AnozieJOHN godlike obliterated FOMO'
];

let killIndex = 0;

function rotateKillFeed() {
    const killText = killFeed.querySelector('.kill-text');
    killText.textContent = killMessages[killIndex];
    killIndex = (killIndex + 1) % killMessages.length;
}

setInterval(rotateKillFeed, 10000);

// ========== BACK TO TOP ==========
const backToTop = document.getElementById('back-to-top');

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ========== AUTO-UPDATING YEAR ==========
document.getElementById('current-year').textContent = new Date().getFullYear();

// ========== KONAMI CODE EASTER EGG ==========
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            triggerEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// Logo tap for mobile
let logoTaps = 0;
const navLogo = document.querySelector('.nav-logo');

navLogo.addEventListener('click', () => {
    logoTaps++;
    if (logoTaps >= 5) {
        triggerEasterEgg();
        logoTaps = 0;
    }
    
    setTimeout(() => {
        logoTaps = 0;
    }, 2000);
});

function triggerEasterEgg() {
    showToast('🎉 SECRET UNLOCKED 🎉');
    
    // Create firework effect
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            createFirework();
        }, i * 100);
    }
}

function createFirework() {
    const firework = document.createElement('div');
    firework.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${['#00F0FF', '#FF2E97', '#FFE600', '#2979FF', '#B026FF'][Math.floor(Math.random() * 5)]};
        border-radius: 50%;
        left: ${Math.random() * 100}vw;
        top: ${Math.random() * 100}vh;
        z-index: 100002;
        pointer-events: none;
        box-shadow: 0 0 20px currentColor;
        animation: explode 1s ease-out forwards;
    `;
    
    document.body.appendChild(firework);
    
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

// Add explode animation
const style = document.createElement('style');
style.textContent = `
    @keyframes explode {
        0% { transform: scale(1); opacity: 1; }
        100% { transform: scale(20); opacity: 0; }
    }
    @keyframes cameraPushIn {
        0% { transform: scale(0.95); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// ========== SMOOTH SCROLL WITH OFFSET ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Navbar height
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    });
});

// ========== INITIALIZATION COMPLETE ==========
console.log('🎮 AnozieJOHN website loaded successfully!');
console.log('🔥 Built with pure HTML, CSS, and JavaScript');
console.log('🎨 All artwork is hand-drawn. No AI-generated art.');
