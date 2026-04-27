document.addEventListener("DOMContentLoaded", () => {
    
    // Register GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    /* ==========================================================================
       Preloader Logic
       ========================================================================== */
    const preloader = document.getElementById('preloader');
    const progressBar = document.getElementById('loader-progress');
    
    // Simulate loading progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if(progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;
        
        if(progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                gsap.to(preloader, {
                    opacity: 0,
                    duration: 0.8,
                    onComplete: () => {
                        preloader.style.display = 'none';
                        initAnimations(); // Start enter animations
                    }
                });
            }, 500);
        }
    }, 150);

    /* ==========================================================================
       Custom Mouse Cursor
       ========================================================================== */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    // Check if device is touch capable to hide cursor logic if needed
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (!isTouchDevice) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            // Direct mapping for dot
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            // Delayed mapping for outline using animate for smoother effect
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });

        // Add hover effect to links and buttons
        const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .stat-box');
        
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
            });
        });
    } else {
        // Hide custom cursor on mobile
        cursorDot.style.display = 'none';
        cursorOutline.style.display = 'none';
        document.querySelector('*').style.cursor = 'auto';
    }


    /* ==========================================================================
       Theme Toggle (Dark/Light)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check saved theme
    const savedTheme = localStorage.getItem('portfolio-theme');
    if(savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if(theme === 'light') {
            themeIcon.className = 'fas fa-moon';
        } else {
            themeIcon.className = 'fas fa-sun';
        }
    }

    /* ==========================================================================
       Navbar & Mobile Menu
       ========================================================================== */
    const navbar = document.getElementById('navbar');
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    // Scrolled state
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active link based on scroll position
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Mobile menu toggle
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('open');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            menuBtn.classList.remove('open');
            navLinks.classList.remove('active');
        });
    });


    /* ==========================================================================
       Typed.js Initialization
       ========================================================================== */
    const typed = new Typed('#typed', {
        strings: ['Web Developer', 'Problem Solver', 'Tech Enthusiast', 'Fast Learner'],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 1500,
        loop: true,
        smartBackspace: true
    });


    /* ==========================================================================
       Initialize Plugins
       ========================================================================== */
    
    // Initialize Particles.js if available
    if(typeof particlesJS !== 'undefined') {
        particlesJS("particles-js", {
            "particles": {
                "number": { "value": 40, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#00c3ff", "#b700ff", "#00ff88"] },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } },
                "size": { "value": 3, "random": true, "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } },
                "line_linked": { "enable": true, "distance": 150, "color": "#ffffff", "opacity": 0.1, "width": 1 },
                "move": { "enable": true, "speed": 1, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "bubble" },
                    "onclick": { "enable": true, "mode": "repulse" },
                    "resize": true
                },
                "modes": {
                    "bubble": { "distance": 250, "size": 0, "duration": 2, "opacity": 0, "speed": 3 },
                    "repulse": { "distance": 400, "duration": 0.4 }
                }
            },
            "retina_detect": true
        });
    }

    // Initialize VanillaTilt if available
    if(typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.2,
        });
    }

    /* ==========================================================================
       Animations Logic (GSAP)
       ========================================================================== */
    function initAnimations() {
        
        // Hero Timeline
        const tlHero = gsap.timeline();
        tlHero.from(".navbar", { y: -50, opacity: 0, duration: 0.8, ease: "power3.out" })
              .from(".hero-greeting", { y: 20, opacity: 0, duration: 0.5 }, "-=0.4")
              .from(".hero-name", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
              .from(".hero-role", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
              .from(".hero-desc", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
              .from(".hero-cta", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
              .from(".hero-socials .social-icon", { y: 20, opacity: 0, duration: 0.4, stagger: 0.1 }, "-=0.3")
              .from(".hero-visual", { scale: 0.8, opacity: 0, duration: 1, ease: "back.out(1.5)" }, "-=1");

        // General Scroll Reveals
        const revealElements = document.querySelectorAll(".gs-reveal");
        revealElements.forEach((elem) => {
            gsap.fromTo(elem, 
                { y: 50, opacity: 0 }, 
                { 
                    y: 0, opacity: 1, 
                    duration: 0.8, 
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        // Left Reveals
        document.querySelectorAll(".gs-reveal-left").forEach((elem) => {
            gsap.fromTo(elem, 
                { x: -50, opacity: 0 }, 
                { 
                    x: 0, opacity: 1, 
                    duration: 0.8, 
                    ease: "power3.out",
                    scrollTrigger: { trigger: elem, start: "top 85%" }
                }
            );
        });

        // Right Reveals
        document.querySelectorAll(".gs-reveal-right").forEach((elem) => {
            gsap.fromTo(elem, 
                { x: 50, opacity: 0 }, 
                { 
                    x: 0, opacity: 1, 
                    duration: 0.8, 
                    ease: "power3.out",
                    scrollTrigger: { trigger: elem, start: "top 85%" }
                }
            );
        });

        // Skills Progress Bar Animation
        const skillBars = document.querySelectorAll('.progress-fill');
        skillBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            gsap.to(bar, {
                width: targetWidth,
                duration: 1.5,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: bar.closest('.skill-category'),
                    start: "top 80%",
                }
            });
        });

        // Counter Animation
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = parseFloat(counter.getAttribute('data-target'));
            let isFloat = target % 1 !== 0;
            
            ScrollTrigger.create({
                trigger: counter,
                start: "top 90%",
                once: true,
                onEnter: () => {
                    gsap.to({ value: 0 }, {
                        value: target,
                        duration: 2,
                        ease: "power1.out",
                        onUpdate: function() {
                            counter.innerText = isFloat ? this.targets()[0].value.toFixed(2) : Math.floor(this.targets()[0].value);
                        }
                    });
                }
            });
        });
    }

    /* ==========================================================================
       Button Ripple Effect
       ========================================================================== */
    const rippleButtons = document.querySelectorAll('.btn-ripple');
    rippleButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            
            // Check if it's an anchor to prevent default if needed, 
            // but we want anchors to still navigate unless it's a form submit button
            if(this.tagName === 'BUTTON' && this.type === 'submit') {
                e.preventDefault(); // Handle form submission manually if needed
            }

            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.className = 'ripple';
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            
            this.appendChild(ripples);
            
            setTimeout(() => {
                ripples.remove();
            }, 600);

            // Simulation of form submission for the demo
            if(this.tagName === 'BUTTON' && this.type === 'submit') {
                const icon = this.querySelector('i');
                const text = this.querySelector('span');
                const originalText = text.innerText;
                
                text.innerText = "Sending...";
                icon.className = "fas fa-spinner fa-spin";
                
                setTimeout(() => {
                    text.innerText = "Message Sent!";
                    icon.className = "fas fa-check";
                    document.getElementById('contact-form').reset();
                    
                    setTimeout(() => {
                        text.innerText = originalText;
                        icon.className = "fas fa-paper-plane";
                    }, 3000);
                }, 1500);
            }
        });
    });

});
