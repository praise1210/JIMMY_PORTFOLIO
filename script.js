
// ==========================================
// JIMMY JAREZ - PORTFOLIO JAVASCRIPT
// ==========================================


// ==========================================
// 0. LOADING SCREEN
// ==========================================

const preloader = document.querySelector("#preloader");

window.addEventListener("load", () => {

    if (preloader) {

        preloader.classList.add("fade-out");

        setTimeout(() => {

            preloader.style.display = "none";

        }, 800);

    }

});


document.addEventListener("DOMContentLoaded", () => {


    // ==========================================
    // 1. ACCESSIBILITY SETTINGS
    // ==========================================

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    // ==========================================
    // 2. BACKGROUND IMAGE SLIDESHOW
    // ==========================================

    const backgroundImages = document.querySelectorAll(
        ".background-image"
    );

    if (backgroundImages.length > 1 && !prefersReducedMotion) {

        let currentBackground = 0;

        setInterval(() => {

            // Hide current image

            backgroundImages[currentBackground].classList.remove("active");

            // Move to next image

            currentBackground =
                (currentBackground + 1) % backgroundImages.length;

            // Show next image

            backgroundImages[currentBackground].classList.add("active");

        }, 6000);

    }


    // ==========================================
    // 3. SCROLL REVEAL ANIMATIONS
    // ==========================================

    const revealElements = document.querySelectorAll(
        ".section, .specialty-card, .hero-content, .hero-visual"
    );

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("reveal");
        });

        const observer = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    }


    // ==========================================
    // 4. MOBILE NAVIGATION MENU
    // ==========================================

    const menuToggle = document.querySelector("#menu-toggle");

    const mobileNav = document.querySelector("#nav-links");

    const menuIcon = menuToggle
        ? menuToggle.querySelector("i")
        : null;


    function closeMobileMenu() {

        if (!menuToggle || !mobileNav) return;

        mobileNav.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        if (menuIcon) {

            menuIcon.classList.remove("fa-xmark");

            menuIcon.classList.add("fa-bars");

        }

    }


    function openMobileMenu() {

        if (!menuToggle || !mobileNav) return;

        mobileNav.classList.add("active");

        menuToggle.setAttribute("aria-expanded", "true");

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

        if (menuIcon) {

            menuIcon.classList.remove("fa-bars");

            menuIcon.classList.add("fa-xmark");

        }

    }


    if (menuToggle && mobileNav) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                mobileNav.classList.contains("active");

            if (isOpen) {

                closeMobileMenu();

            } else {

                openMobileMenu();

            }

        });


        // CLOSE MENU WHEN A LINK IS CLICKED

        const mobileLinks = mobileNav.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                closeMobileMenu();

            });

        });


        // CLOSE MENU WHEN ESCAPE IS PRESSED

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                closeMobileMenu();

                menuToggle.focus();

            }

        });


        // CLOSE MENU WHEN CLICKING OUTSIDE

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                mobileNav.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (!clickedInsideMenu && !clickedToggle) {

                closeMobileMenu();

            }

        });


        // CLOSE MENU WHEN SCREEN RETURNS TO DESKTOP

        window.addEventListener("resize", () => {

            if (window.innerWidth > 750) {

                closeMobileMenu();

            }

        });

    }


    // ==========================================
    // 5. SMOOTH NAVIGATION
    // ==========================================

    const navigationLinks = document.querySelectorAll(
        ".nav-links a, .nav-button, .hero-buttons a"
    );

    navigationLinks.forEach(link => {

        link.addEventListener("click", function(event) {

            const targetId = this.getAttribute("href");

            if (!targetId || !targetId.startsWith("#")) {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                event.preventDefault();

                targetSection.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });

                history.replaceState(null, "", targetId);

            }

        });

    });


    // ==========================================
    // 6. ACTIVE NAVIGATION HIGHLIGHT
    // ==========================================

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-links a"
    );

    function updateActiveNavigation() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;

            if (window.scrollY >= sectionTop) {

                currentSection = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    // ==========================================
    // 7. TECHNOLOGY ICON INTERACTIONS
    // ==========================================

    const technologyIcons = document.querySelectorAll(
        ".tech-icons i"
    );

    technologyIcons.forEach(icon => {

        icon.addEventListener("mouseenter", () => {

            icon.style.color = "#ffffff";

        });

        icon.addEventListener("mouseleave", () => {

            icon.style.color = "";

        });

    });


    // ==========================================
    // 8. PROJECT CARD INTERACTION
    // ==========================================

    const projectCards = document.querySelectorAll(
        ".project-card"
    );

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.borderColor = "#d6a84f";

        });

        card.addEventListener("mouseleave", () => {

            card.style.borderColor = "";

        });

    });


    // ==========================================
    // 9. ANIMATED TYPING HEADLINE
    // ==========================================

    const typingElement = document.querySelector(
        ".typing-text"
    );

    if (typingElement) {

        const titles = [
            "a Frontend Engineer",
            "a Full-Stack Developer",
            "a Software Developer",
            "an AI Enthusiast"
        ];

        let titleIndex = 0;

        let characterIndex = 0;

        let deleting = false;


        if (prefersReducedMotion) {

            typingElement.textContent = titles[0];

        } else {

            function typeEffect() {

                const currentTitle = titles[titleIndex];

                if (!deleting) {

                    typingElement.textContent =
                        currentTitle.substring(
                            0,
                            characterIndex + 1
                        );

                    characterIndex++;

                    if (characterIndex === currentTitle.length) {

                        deleting = true;

                        setTimeout(typeEffect, 1800);

                        return;

                    }

                    setTimeout(typeEffect, 90);

                } else {

                    typingElement.textContent =
                        currentTitle.substring(
                            0,
                            characterIndex - 1
                        );

                    characterIndex--;

                    if (characterIndex === 0) {

                        deleting = false;

                        titleIndex =
                            (titleIndex + 1) % titles.length;

                        setTimeout(typeEffect, 400);

                        return;

                    }

                    setTimeout(typeEffect, 45);

                }

            }

            typeEffect();

        }

    }


    // ==========================================
    // 10. BACK TO TOP BUTTON
    // ==========================================

    const backToTopButton = document.querySelector("#back-to-top");

    if (backToTopButton) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 350) {

                backToTopButton.classList.add("visible");

            } else {

                backToTopButton.classList.remove("visible");

            }

        }, { passive: true });


        backToTopButton.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: prefersReducedMotion ? "auto" : "smooth"
            });

        });

    }


    // ==========================================
    // 11. CONSOLE WELCOME MESSAGE
    // ==========================================

    console.log(
        "%c Welcome to Jimmy Jarez's Portfolio! ",
        "background: #d6a84f; color: #080808; font-size: 16px; font-weight: bold; padding: 10px;"
    );

    console.log(
        "Full-Stack Developer | Frontend Engineer | AI Enthusiast"
    );


});