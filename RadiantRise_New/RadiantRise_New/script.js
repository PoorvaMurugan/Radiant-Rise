// JavaScript functionality will be added here
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close when clicking a link
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // Tab switching logic removed (Converted to CSS Hover Dropdowns)


    // Testimonial Carousel
    const initTestimonialSlider = () => {
        const track = document.getElementById('testimonialTrack');
        const dotsContainer = document.getElementById('testimonialDots');
        if (!track) return;

        const slides = Array.from(track.children);
        const slideWidth = slides[0].getBoundingClientRect().width + 30; // Width + margin
        let currentIndex = 0;

        // Setup simple auto-slide
        const moveToSlide = (index) => {
            // Need to handle infinite loop properly or just rewind
            // For simple rewind:
            if (index >= slides.length) {
                index = 0;
            } else if (index < 0) {
                index = slides.length - 1;
            }

            track.style.transform = `translateX(-${index * slideWidth}px)`;
            currentIndex = index;
            updateDots(index);
        };

        const updateDots = (index) => {
            // Basic dots
            const dots = dotsContainer.children;
            for (let d = 0; d < dots.length; d++) {
                dots[d].classList.remove('active');
            }
            if (dots[index]) dots[index].classList.add('active');
        };

        // Create dots
        slides.forEach((_, i) => {
            // Only need dots for possible start positions? 
            // Simplifying: 1 dot per slide
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                moveToSlide(i);
                // Reset timer?
            });
            dotsContainer.appendChild(dot);
        });

        // Auto slide
        setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, 3000); // 3 seconds
    };

    initTestimonialSlider();

    // Animated Counters
    const statsSection = document.querySelector('.about-stats');
    const counters = document.querySelectorAll('.stat-number');
    let started = false; // Function runs only once

    if (statsSection && counters.length > 0) {
        const statsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                counters.forEach((counter) => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // Animation duration in ms
                    const increment = target / (duration / 16); // 60fps

                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current) + "+";
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target + "+";
                        }
                    };
                    updateCounter();
                });
                started = true;
            }
        });

        statsObserver.observe(statsSection);
    }

    // Scroll Animations Observer
    const scrollElements = document.querySelectorAll('.animate-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('active');
    };

    // Use IntersectionObserver for better performance
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                displayScrollElement(entry.target);
                // Optional: Stop observing once visualized
                scrollObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    scrollElements.forEach((el) => {
        scrollObserver.observe(el);
    });

    // Blog Modal Logic
    const blogData = {
        1: {
            title: "Why Real Estate is the Best Investment in 2026",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=800&auto=format&fit=crop",
            content: `
                <p>Real estate has consistently proven to be one of the most stable and appreciating asset classes. In 2026, the market trends suggest a significant upswing in residential property values, especially in developing metropolitans like Chennai.</p>
                <p>Unlike volatile stock markets, property offers tangible security and dual income streams via rental yields and capital appreciation. With new infrastructure projects connecting suburban areas, now is the perfect time to invest in emerging hotspots.</p>
                <p>At RadiantRise, we identify these high-growth zones to ensure our customers get the maximum ROI on their investments.</p>
            `
        },
        2: {
            title: "The Rise of Smart Homes in Chennai",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
            content: `
                <p>The concept of 'luxury' has evolved. It's no longer just about space; it's about convenience. Smart homes equipped with IoT devices allow residents to control lighting, climate, and security with a single tap on their smartphones.</p>
                <p>We are integrating these smart technologies into our upcoming villa projects to provide a seamless living experience. From automated gate systems to energy-efficient smart lighting, the future of living is here.</p>
            `
        },
        3: {
            title: "Sustainable Living: The Future of Housing",
            image: "https://images.unsplash.com/photo-1600596542815-2a4d9fdb2243?q=80&w=800&auto=format&fit=crop",
            content: `
                <p>Sustainability is not just a buzzword; it's a necessity. We are committed to green building practices, including rainwater harvesting, solar power generation, and waste management systems.</p>
                <p>Living in a sustainable community not only reduces your carbon footprint but also lowers utility bills significantly. Our latest 'Green Valley' project exemplifies this commitment with over 40% open green spaces.</p>
            `
        },
        4: {
            title: "Maximizing Space in Modern Apartments",
            image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800&auto=format&fit=crop",
            content: `
                <p>Small spaces don't have to feel cramped. By using smart furniture like murphy beds, hidden storage units, and light color palettes, you can transform a compact apartment into an airy sanctuary.</p>
                <p>Our designers focus on ergonomic layouts that ensure every square foot is utilized effectively without compromising on aesthetic appeal.</p>
            `
        },
        5: {
            title: "Investing in Plot vs. Built-up Villa",
            image: "https://images.unsplash.com/photo-1582408921715-18e7806365c1?q=80&w=800&auto=format&fit=crop",
            content: `
                <p>Deciding between buying a piece of land or a ready-to-move-in villa? Plots offer flexibility for custom construction, while villas provide immediate occupation and community amenities.</p>
                <p>Both have unique advantages. Plots typically appreciate faster in developing areas, whereas villas offer higher rental demand from day one.</p>
            `
        },
        6: {
            title: "Home Loans: A Step-by-Step Guide for 2026",
            image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=800&auto=format&fit=crop",
            content: `
                <p>Navigating the mortgage market can be daunting. In 2026, many banks are offering green home loan incentives for sustainable projects.</p>
                <p>Ensure your credit score is in top shape and keep your paperwork ready to secure the best interest rates. Our financial advisors are here to help you through the entire process.</p>
            `
        }
    };

    const modalOverlay = document.getElementById('blogModal');
    const blogCards = document.querySelectorAll('.blog-card');
    const closeBtn = document.querySelector('.close-modal');

    if (modalOverlay) {
        // Function to open modal by ID
        const openBlogModal = (id) => {
            const data = blogData[id];
            if (data) {
                document.getElementById('modalTitle').innerText = data.title;
                document.getElementById('modalImg').src = data.image;
                document.getElementById('modalText').innerHTML = data.content;

                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        };

        blogCards.forEach(card => {
            card.addEventListener('click', () => {
                const id = card.getAttribute('data-id');
                openBlogModal(id);
            });
        });

        // Check for ?id=X in URL
        const urlParams = new URLSearchParams(window.location.search);
        const blogId = urlParams.get('id');
        if (blogId) {
            openBlogModal(blogId);
        }

        const closeModal = () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        };

        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        // Close on outside click
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    console.log("RadiantRise scripts loaded");

    // Project Details Tab Switching and Lightbox
    const projectTabs = document.querySelectorAll('.project-details-section .tab-btn');
    const activeImg = document.getElementById('activePlanImage');
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.querySelector('.close-lightbox');

    if (projectTabs.length > 0 && activeImg) {
        projectTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs
                projectTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');

                // Change image source
                const newImgSrc = tab.getAttribute('data-image');
                if (newImgSrc) {
                    activeImg.src = newImgSrc;
                    activeImg.alt = tab.innerText;
                }
            });
        });

        // Open Lightbox
        activeImg.parentElement.addEventListener('click', () => {
            if (activeImg.src) {
                lightbox.style.display = "block";
                lightboxImg.src = activeImg.src;
                document.body.style.overflow = "hidden"; // Prevent scroll
            }
        });

        // Close Lightbox
        const hideLightbox = () => {
            lightbox.style.display = "none";
            document.body.style.overflow = "";
        };

        if (closeLightbox) closeLightbox.addEventListener('click', hideLightbox);

        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) hideLightbox();
            });
        }
    }
});
