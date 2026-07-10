// ============================================
// SCRIPT INTERACTIVO - PORQUE TÍ
// ============================================

// Variables globales
let isPlaying = false;
let currentTime = 0;
const duration = 293; // 4:53 en segundos

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEventListeners();
    initializeSmoothScroll();
    initializeAnimations();
});

// ============================================
// EVENT LISTENERS
// ============================================

function initializeEventListeners() {
    // Play button
    const playBtn = document.getElementById('playBtn');
    if (playBtn) {
        playBtn.addEventListener('click', togglePlay);
    }

    // Reproducir button
    const reproducirBtn = document.getElementById('reproducirBtn');
    if (reproducirBtn) {
        reproducirBtn.addEventListener('click', togglePlay);
    }

    // Progress bar
    const progressBar = document.getElementById('progressBar');
    const playerProgress = document.querySelector('.player-progress');
    if (playerProgress) {
        playerProgress.addEventListener('click', (e) => {
            const width = playerProgress.offsetWidth;
            const x = e.offsetX;
            currentTime = (x / width) * duration;
            updateProgress();
        });
    }

    // Volume button
    const volumeBtn = document.getElementById('volumeBtn');
    if (volumeBtn) {
        volumeBtn.addEventListener('click', toggleVolume);
    }

    // Scroll events para animaciones
    window.addEventListener('scroll', handleScroll);
}

// ============================================
// REPRODUCCIÓN DE MÚSICA
// ============================================

function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayButton();
    simulateAudioPlayback();
    showNotification(isPlaying ? '♥ Reproduciendo...' : 'Pausado');
}

function updatePlayButton() {
    const playBtn = document.getElementById('playBtn');
    const reproducirBtn = document.getElementById('reproducirBtn');
    
    if (playBtn) {
        playBtn.textContent = isPlaying ? '⏸' : '▶';
    }
    if (reproducirBtn) {
        reproducirBtn.textContent = isPlaying ? '♥ PAUSAR' : '♥ REPRODUCIR';
    }
}

function simulateAudioPlayback() {
    if (isPlaying) {
        const interval = setInterval(() => {
            if (!isPlaying) {
                clearInterval(interval);
                return;
            }
            currentTime += 0.1;
            if (currentTime >= duration) {
                currentTime = 0;
                isPlaying = false;
                updatePlayButton();
                showNotification('♥ Canción finalizada');
                clearInterval(interval);
                return;
            }
            updateProgress();
        }, 100);
    }
}

function updateProgress() {
    const progressBar = document.getElementById('progressBar');
    const currentTimeSpan = document.getElementById('currentTime');
    
    if (progressBar) {
        const percentage = (currentTime / duration) * 100;
        progressBar.style.width = percentage + '%';
    }
    
    if (currentTimeSpan) {
        currentTimeSpan.textContent = formatTime(currentTime);
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function toggleVolume() {
    const volumeBtn = document.getElementById('volumeBtn');
    if (volumeBtn) {
        if (volumeBtn.textContent === '🔊') {
            volumeBtn.textContent = '🔇';
            showNotification('Volumen desactivado');
        } else {
            volumeBtn.textContent = '🔊';
            showNotification('Volumen activado');
        }
    }
}

// ============================================
// NOTIFICACIONES
// ============================================

function showNotification(message) {
    // Crear notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(193, 122, 122, 0.95);
        color: white;
        padding: 1rem 2rem;
        border-radius: 50px;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
        animation: slideIn 0.3s ease;
        z-index: 2000;
    `;

    document.body.appendChild(notification);

    // Añadir animación
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Remover después de 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initializeSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Botón de scroll en hero
    const scrollBtn = document.querySelector('.scroll-btn');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            const historiaSection = document.getElementById('historia');
            if (historiaSection) {
                historiaSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// ============================================
// TIMELINE
// ============================================

function scrollToTimeline(index) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const item = timelineItems[index];
    
    if (item) {
        item.scrollIntoView({ behavior: 'smooth', block: 'center' });
        item.style.animation = 'pulse 0.6s ease';
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

function handleScroll() {
    // Header effect
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        if (header) header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        if (header) header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }

    // Actualizar navegación activa
    updateActiveNav();
}

function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
}

// ============================================
// INTERACTIVIDAD ADICIONAL
// ============================================

// Hearts aleatorios al hacer scroll
window.addEventListener('scroll', () => {
    if (Math.random() < 0.02) {
        createFloatingHeart();
    }
});

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.textContent = '♥';
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        font-size: ${10 + Math.random() * 20}px;
        color: rgba(193, 122, 122, ${0.3 + Math.random() * 0.4});
        pointer-events: none;
        animation: floatUp ${3 + Math.random() * 3}s linear forwards;
        z-index: 100;
    `;

    document.body.appendChild(heart);

    // Añadir animación si no existe
    if (!document.querySelector('style[data-hearts]')) {
        const style = document.createElement('style');
        style.setAttribute('data-hearts', 'true');
        style.textContent = `
            @keyframes floatUp {
                to {
                    transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                    opacity: 0;
                }
            }
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// ============================================
// GALERÍA CON LIGHTBOX
// ============================================

function initializeGallery() {
    const galeriaItems = document.querySelectorAll('.galeria-item');
    
    galeriaItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                openLightbox(img.src);
            }
        });
    });
}

function openLightbox(src) {
    const lightbox = document.createElement('div');
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 3000;
        animation: fadeIn 0.3s ease;
    `;

    const img = document.createElement('img');
    img.src = src;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        object-fit: contain;
        animation: zoomIn 0.3s ease;
    `;

    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = `
        position: absolute;
        top: 2rem;
        right: 2rem;
        background: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transition: all 0.3s ease;
    `;

    closeBtn.addEventListener('mouseover', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.4)';
    });

    closeBtn.addEventListener('mouseout', () => {
        closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
    });

    closeBtn.addEventListener('click', () => {
        lightbox.remove();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.remove();
        }
    });

    lightbox.appendChild(img);
    lightbox.appendChild(closeBtn);
    document.body.appendChild(lightbox);

    // Añadir estilos de animación si no existen
    if (!document.querySelector('style[data-lightbox]')) {
        const style = document.createElement('style');
        style.setAttribute('data-lightbox', 'true');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes zoomIn {
                from {
                    opacity: 0;
                    transform: scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Cerrar con ESC
    const closeOnEsc = (e) => {
        if (e.key === 'Escape') {
            lightbox.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    };
    document.addEventListener('keydown', closeOnEsc);
}

// Inicializar galería cuando esté lista
setTimeout(initializeGallery, 500);

// ============================================
// ENVÍO DE CARTA (Opcional)
// ============================================

function handleCartaSubmit() {
    showNotification('♥ Gracias por tu amor ♥');
}

// ============================================
// UTILIDADES
// ============================================

// Función para obtener parámetros de URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Log de depuración (comentado por defecto)
function logDebug(message) {
    // console.log('[Porque Tí]', message);
}

logDebug('Script cargado correctamente');
