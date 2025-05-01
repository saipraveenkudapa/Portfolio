$(document).ready(function () {
   
    let lastScrollTop = 0;
    const headerHeight = $('header').outerHeight();

    
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        
        
        $('#click').prop('checked', false);
        
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - headerHeight
            }, 800, 'swing');
        }
    });

    
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

    
    $(window).on('scroll', function() {
        updateActiveLink();
    });

    
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 50,
        disable: 'mobile'
    });

    
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

   
    $('.menu').on('click', function() {
        $('nav').toggleClass('active');
    });

    
    $(document).on('click', function(e) {
        if (!$(e.target).closest('header').length) {
            $('#click').prop('checked', false);
            $('nav').removeClass('active');
        }
    });

   
    const scrollTopButton = $('<button>', {
        class: 'scroll-top-btn',
        html: '<i class="bi bi-arrow-up"></i>'
    }).appendTo('body');

  
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            scrollTopButton.addClass('show');
        } else {
            scrollTopButton.removeClass('show');
        }
    });

   
    scrollTopButton.click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    
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

    
    const debouncedScroll = debounce(function() {
        updateActiveLink();
    }, 150);

 
    $(window).on('scroll', debouncedScroll);

    
    window.onerror = function(msg, url, lineNo, columnNo, error) {
        console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
        return false;
    };

   
    updateActiveLink();

   
    $('img').each(function() {
        if (!$(this).attr('loading')) {
            $(this).attr('loading', 'lazy');
        }
    });
});

document.documentElement.style.setProperty('--scroll-behavior', 'smooth');
