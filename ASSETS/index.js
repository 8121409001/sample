document.addEventListener("DOMContentLoaded", () => {
    
    // --- Mobile Responsive Hamburger Engine ---
    const hamburger = document.getElementById("hamburgerMenu");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        navMenu.classList.toggle("open");
    });

    // Close menu when navigation targets are clicked
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            navMenu.classList.remove("open");
        });
    });

    // --- Smooth Scroll Navigation Interceptor & Active Monitor ---
    const sections = document.querySelectorAll("section");
    
    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 150; 

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    });

    // --- Smooth Content Scroll Reveal Engine ---
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealOnScroll = () => {
        const triggerBottom = (window.innerHeight / 10 * 8.5);
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < triggerBottom) {
                element.classList.add("visible");
            }
        });
    };

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Primary immediate invocation

    // --- Production Testimonials Carousel Engine ---
    const slider = document.getElementById("carouselSlider");
    const slides = document.querySelectorAll(".carousel-slide");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const dotsContainer = document.getElementById("carouselDots");
    
    let currentSlideIndex = 0;
    const totalSlides = slides.length;

    // Build functional dots
    slides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot-indicator");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => navigateToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const indicators = document.querySelectorAll(".dot-indicator");

    const updateCarouselUI = () => {
        slider.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        slides.forEach((slide, idx) => {
            slide.classList.toggle("active", idx === currentSlideIndex);
        });

        indicators.forEach((dot, idx) => {
            dot.classList.toggle("active", idx === currentSlideIndex);
        });
    };

    const navigateToSlide = (index) => {
        currentSlideIndex = index;
        updateCarouselUI();
    };

    nextBtn.addEventListener("click", () => {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateCarouselUI();
    });

    prevBtn.addEventListener("click", () => {
        currentSlideIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;
        updateCarouselUI();
    });

    // Automatic rotation sequence (8 seconds interval)
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
        updateCarouselUI();
    }, 8000);
});