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
        if (progress > 100) progress = 100;
        progressBar.style.width = `${progress}%`;

        if (progress === 100) {
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
    if (savedTheme) {
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
        if (theme === 'light') {
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
    if (typeof particlesJS !== 'undefined') {
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
    if (typeof VanillaTilt !== 'undefined') {
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
                        onUpdate: function () {
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
        btn.addEventListener('click', function (e) {

            // Check if it's an anchor to prevent default if needed, 
            // but we want anchors to still navigate unless it's a form submit button
            if (this.tagName === 'BUTTON' && this.type === 'submit') {
                // Form submission prevents default in the submit event handler now
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
        });
    });

    /* ==========================================================================
       Contact Form Submission
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const icon = submitBtn.querySelector('i');
            const text = submitBtn.querySelector('span');
            const originalText = text.innerText;

            text.innerText = "Sending...";
            icon.className = "fas fa-spinner fa-spin";
            if (formStatus) formStatus.style.display = 'none';

            try {
                // IMPORTANT: Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' 
                // with your actual EmailJS Service ID and Template ID.
                await emailjs.sendForm(
                    'service_a6xk86j',
                    'template_kqjhfeh',
                    contactForm,
                    'F3a-ADh-4dEFV5QgP'
                );
                if (formStatus) {
                    formStatus.innerText = "Message sent successfully!";
                    formStatus.style.color = "#00ff88";
                    formStatus.style.display = "block";
                }
                contactForm.reset();
                text.innerText = "Message Sent!";
                icon.className = "fas fa-check";
            } catch (error) {
                console.log("FULL ERROR:", error);
                alert(JSON.stringify(error));

                if (formStatus) {
                    formStatus.innerText = "Failed to send message. Please try again.";
                    formStatus.style.color = "#ff3b30";
                    formStatus.style.display = "block";
                }
            }

            setTimeout(() => {
                text.innerText = originalText;
                icon.className = "fas fa-paper-plane";
            }, 3000);
        });
    }

    /* ==========================================================================
       Modals Logic
       ========================================================================== */
    const projectsModal = document.getElementById('projects-modal');
    const skillsModal = document.getElementById('skills-modal');
    const viewProjectsBtn = document.getElementById('view-projects-btn');
    const viewSkillsBtn = document.getElementById('view-skills-btn');
    const closeBtns = document.querySelectorAll('.close-modal');

    const allProjectsData = [
        {
            name: "ATS Resume Checker Application",
            tags: ["Java", "Spring Boot", "React JS"],
            icon: "fa-file-alt",
            color: "#00c3ff",
            desc: "Built a web app to analyze resumes for ATS compatibility. Used Spring Boot to match resume keywords with job descriptions."
        },
        {
            name: "AI Chatbot Web Application",
            tags: ["Java", "Spring Boot", "JavaScript"],
            icon: "fa-robot",
            color: "#b700ff",
            desc: "Built a web-based chatbot for real-time user responses. Used Spring Boot to process input and generate replies."
        },
        {
            name: "Task Manager Application",
            tags: ["Java", "Spring Boot", "React JS", "MySQL"],
            icon: "fa-tasks",
            color: "#00ff88",
            desc: "Developed a task management web application to organize daily tasks efficiently."
        },
   {
    name: "Spider-Man Universe Project",
    tags: ["HTML", "CSS", "JavaScript", "API"],
    icon: "fa-spider",
    color: "#e11d48",
    desc: "Interactive Spider-Man themed web project showcasing characters, movie details, animations, and dynamic API-based content."
},
{
    name: "Employee Management System",
    tags: ["Java", "Spring Boot", "MySQL", "React JS"],
    icon: "fa-users",
    color: "#00c3ff",
    desc: "Employee management application with CRUD operations, employee records management, and admin dashboard."
},
        {
            name: "Weather Dashboard",
            tags: ["HTML", "CSS", "JavaScript"],
            icon: "fa-cloud-sun",
            color: "#00aaff",
            desc: "Interactive web app providing real-time weather updates and 7-day forecasts using external APIs."
        }
    ];

    const allSkillsData = [
        { name: "Core Java", icon: "fab fa-java", color: "#f89820" },
        { name: "Advanced Java", icon: "fab fa-java", color: "#f89820" },
        { name: "JavaScript", icon: "fab fa-js", color: "#f7df1e" },
        { name: "React JS", icon: "fab fa-react", color: "#61dafb" },
        { name: "HTML", icon: "fab fa-html5", color: "#e34f26" },
        { name: "CSS", icon: "fab fa-css3-alt", color: "#1572b6" },
        { name: "Bootstrap", icon: "fab fa-bootstrap", color: "#7952b3" },
        { name: "Spring Boot", icon: "fas fa-leaf", color: "#6db33f" },
        { name: "REST APIs", icon: "fas fa-plug", color: "#00c853" },
        { name: "JDBC", icon: "fas fa-database", color: "#4caf50" },
        { name: "Servlets", icon: "fas fa-server", color: "#ff9800" },
        { name: "JSP", icon: "fas fa-code", color: "#2196f3" },
        { name: "MySQL", icon: "fas fa-database", color: "#00758f" },
        { name: "Oracle", icon: "fas fa-database", color: "#f80000" },
        { name: "SQL", icon: "fas fa-database", color: "#336791" },
        { name: "Git", icon: "fab fa-git-alt", color: "#f05032" },
        { name: "GitHub", icon: "fab fa-github", color: "#ffffff" },
        { name: "VS Code", icon: "fas fa-laptop-code", color: "#007acc" },
        { name: "Eclipse IDE", icon: "fas fa-moon", color: "#2c2255" },
        { name: "Postman", icon: "fas fa-paper-plane", color: "#ff6c37" },
        { name: "AWS Basics", icon: "fas fa-cloud", color: "#ff9900" }
    ];

    if (viewProjectsBtn) {
        viewProjectsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            populateProjectsModal();
            projectsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (viewSkillsBtn) {
        viewSkillsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            populateSkillsModal();
            skillsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectsModal.classList.remove('active');
            skillsModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === projectsModal) {
            projectsModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        if (e.target === skillsModal) {
            skillsModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    function populateProjectsModal() {
        const grid = document.querySelector('.modal-projects-grid');
        if (!grid) return;

        let html = '';
        allProjectsData.forEach(p => {
            let tagsHtml = p.tags.map(t => `<span>${t}</span>`).join('');
            html += `
            <div class="project-card" style="margin: 0; width: 100%;">
                <div class="project-img" style="height: 150px;">
                    <div class="img-placeholder" style="background: linear-gradient(45deg, #1a1c29, #252840);">
                        <i class="fas ${p.icon} fa-3x" style="color: ${p.color};"></i>
                    </div>
                </div>
                <div class="project-content" style="padding: 20px;">
                    <div class="project-tags">
                        ${tagsHtml}
                    </div>
                    <h3 style="font-size: 1.2rem;">${p.name}</h3>
                    <p style="font-size: 0.9rem; margin-bottom: 15px;">${p.desc}</p>
                    <div class="project-links">
                        <a href="#" class="link">Live Demo <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>`;
        });
        grid.innerHTML = html;
    }

    function populateSkillsModal() {
        const grid = document.querySelector('.modal-skills-grid');
        if (!grid) return;

        let html = '';
        allSkillsData.forEach(skill => {
            html += `
        <div class="modal-skill-card">
            <i class="${skill.icon}" style="color:${skill.color};"></i>
            <span>${skill.name}</span>
        </div>`;
        });

        grid.innerHTML = html;
    }
});


// Auto scroll from stats buttons
document.addEventListener("DOMContentLoaded", function () {
    const statBoxes = document.querySelectorAll(".stat-box");

    if (statBoxes[1]) {
        statBoxes[1].addEventListener("click", function () {
            document.getElementById("projects").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    if (statBoxes[2]) {
        statBoxes[2].addEventListener("click", function () {
            document.getElementById("skills").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }
});