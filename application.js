$(document).ready(function () {
    // Initialize variables
    let lastScrollTop = 0;
    const headerHeight = $('header').outerHeight();

    /*
     * 1. Smooth Scrolling for navigation links
     */
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        
        // Close mobile menu if open
        $('#click').prop('checked', false);
        
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - headerHeight
            }, 800, 'swing');
        }
    });

    /*
     * 2. Active Navigation Link Update
     */
    function updateActiveLink() {
        const scrollPosition = $(window).scrollTop() + headerHeight + 50;

        // Check each section's position
        $('section').each(function() {
            const top = $(this).offset().top;
            const bottom = top + $(this).outerHeight();

            if (scrollPosition >= top && scrollPosition <= bottom) {
                const currentId = $(this).attr('id');
                $('nav a').removeClass('active-link');
                $(`nav a[href="#${currentId}"]`).addClass('active-link');
            }
        });
    }

    // Update active link on scroll
    $(window).on('scroll', function() {
        updateActiveLink();
    });

    /*
     * 3. Initialize AOS (Animate On Scroll)
     */
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50,
        disable: 'mobile'
    });

    /*
     * 4. Initialize Typed.js
     */
    const typed = new Typed('#typed', {
        strings: [
            "I'm a Data Analyst",
            "I'm <span style='color:#244D61;'>Sai Praveen</span>"
        ],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1000,
        startDelay: 500,
        loop: true,
        smartBackspace: true,
        showCursor: true,
        cursorChar: '|',
        autoInsertCss: true
    });

    /*
     * 5. Skills Section Infinite Scroll
     */
    function initializeScrollers() {
        const scrollers = document.querySelectorAll('.scroller');

        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            addScrollerAnimation(scrollers);
        }
    }

    function addScrollerAnimation(scrollers) {
        scrollers.forEach(scroller => {
            scroller.setAttribute('data-animated', true);

            const scrollerInner = scroller.querySelector('.scroller__inner');
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute('aria-hidden', true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

    initializeScrollers();

    /*
     * 6. Dripping Background Effect
     */
    function createDrippingBackground() {
        const container = document.getElementById('drippingColorsBackground');
        const colors = [
            '#add8e6', '#90ee90', '#ffffe0', '#dda0dd',
            '#ffb6c1', '#87cefa', '#f0e68c', '#fafad2',
            '#e0ffff', '#b0e0e6', '#ffdead', '#ffe4e1',
            '#d3d3d3', '#ffffff'
        ];

        for (let i = 0; i < 14; i++) {
            const drip = document.createElement('div');
            drip.classList.add('drip');
            drip.style.left = `${Math.random() * 100}vw`;
            drip.style.backgroundColor = colors[i];
            drip.style.animationDelay = `${i * 0.5}s`;
            container.appendChild(drip);
        }
    }

    createDrippingBackground();

    /*
     * 7. Mobile Menu Handling
     */
    $('.menu').on('click', function() {
        $('nav').toggleClass('active');
    });

    // Close mobile menu when clicking outside
    $(document).on('click', function(e) {
        if (!$(e.target).closest('header').length) {
            $('#click').prop('checked', false);
            $('nav').removeClass('active');
        }
    });

    /*
     * 8. Scroll to Top Button
     */
    const scrollTopButton = $('<button>', {
        class: 'scroll-top-btn',
        html: '<i class="bi bi-arrow-up"></i>'
    }).appendTo('body');

    // Show/Hide scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            scrollTopButton.addClass('show');
        } else {
            scrollTopButton.removeClass('show');
        }
    });

    // Scroll to top on button click
    scrollTopButton.click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    /*
     * 9. Image Lazy Loading
     */
    function lazyLoadImages() {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }

    /*
     * 10. Performance Optimization
     */
    // Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Debounced scroll handler
    const debouncedScroll = debounce(function() {
        updateActiveLink();
    }, 150);

    // Use debounced handler for scroll events
    $(window).on('scroll', debouncedScroll);

    /*
     * 11. Error Handling
     */
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
        return false;
    };

    /*
     * 12. Initial Setup
     */
    // Trigger initial active link update
    updateActiveLink();

    // Add loading attribute to images
    $('img').each(function() {
        if (!$(this).attr('loading')) {
            $(this).attr('loading', 'lazy');
        }
    });
});

// Add CSS variable for smooth scrolling to html element
document.documentElement.style.setProperty('--scroll-behavior', 'smooth');