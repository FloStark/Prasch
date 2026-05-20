document.addEventListener('DOMContentLoaded', () => {

    // ===== Scroll Reveal (IntersectionObserver) =====
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
        observer.observe(el);
    });

    // ===== Smooth Scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const offset = 80; // header height
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });

                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                if (navLinks) navLinks.classList.remove('open');
            }
        });
    });

    // ===== Header scroll effect =====
    const header = document.getElementById('header');
    const landingChoice = document.getElementById('landing-choice');

    if (header) {
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            
            // Toggle visibility based on landing page
            if (landingChoice) {
                if (scrollPos > window.innerHeight * 0.8) {
                    header.classList.add('visible');
                } else {
                    header.classList.remove('visible');
                }
            } else {
                header.classList.add('visible');
            }

            header.classList.toggle('scrolled', scrollPos > 30);
        }, { passive: true });

        // Check on load
        if (!landingChoice) header.classList.add('visible');
    }

    // ===== Mobile Menu Toggle =====
    const toggle = document.getElementById('mobileToggle');
    const navLinksArr = document.getElementById('navLinks');
    if (toggle && navLinksArr) {
        toggle.addEventListener('click', () => {
            navLinksArr.classList.toggle('open');
        });
    }

    // ===== Sticky CTA Visibility =====
    const stickyCta = document.querySelector('.sticky-cta');
    if (stickyCta) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        }, { passive: true });
    }



    // ===== Cookie Banner Logic =====
    const cookieBanner = document.querySelector('.cookie-banner');
    const acceptBtn = document.getElementById('acceptCookies');
    const mapContainer = document.querySelector('.contact-map');
    
    function loadMap() {
        if (mapContainer && !mapContainer.classList.contains('accepted')) {
            const iframe = mapContainer.querySelector('iframe');
            if (iframe) {
                // Ensure map is visible and source is set if not already done by standard HTML
                mapContainer.classList.add('accepted');
            }
        }
    }

    if (cookieBanner && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => {
            cookieBanner.classList.add('visible');
        }, 1500);
    } else if (localStorage.getItem('cookiesAccepted')) {
        loadMap();
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookieBanner.classList.remove('visible');
            loadMap();
        });
    }

    // Manual activation from placeholder
    const loadMapBtn = document.getElementById('activateMap');
    if (loadMapBtn) {
        loadMapBtn.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            if (cookieBanner) cookieBanner.classList.remove('visible');
            loadMap();
        });
    }

    // ===== FAQ Accordion Logic =====
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isOpen = question.getAttribute('aria-expanded') === 'true';
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.style.maxHeight = null;
                }
            });

            // Toggle current FAQ
            question.setAttribute('aria-expanded', !isOpen);
            const answer = question.nextElementSibling;
            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // ===== Paint Calculator Logic =====
    const calcWidth = document.getElementById('wall-width');
    const calcHeight = document.getElementById('wall-height');
    const calcCoats = document.getElementById('coat-count');
    const calcResult = document.getElementById('needed-liters');

    function calculatePaint() {
        const w = parseFloat(calcWidth.value) || 0;
        const h = parseFloat(calcHeight.value) || 0;
        const c = parseInt(calcCoats.value) || 1;
        
        // 0.15 Liter per m² is a safe pro-average for one coat
        const totalM2 = w * h;
        const totalLiters = (totalM2 * 0.15 * c).toFixed(1);
        
        calcResult.textContent = totalLiters;

        // Visual feedback
        if (totalLiters > 0) {
            calcResult.style.color = 'var(--red)';
        } else {
            calcResult.style.color = 'var(--midnight)';
        }
    }

    if (calcWidth && calcHeight && calcCoats) {
        [calcWidth, calcHeight, calcCoats].forEach(el => {
            el.addEventListener('input', calculatePaint);
        });
    }

});
