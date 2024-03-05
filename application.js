$(document).ready(function () {
    // Smooth scrolling for navigation links
    $('a[href^="#"]').click(function (e) {
        var target = $(this).attr('href');
        e.preventDefault();

        // Scroll to the top if the target is "#home" or the actual top of the document
        if (target === '#' || target === '#home') {
            $('html, body').animate({
                scrollTop: 0
            }, 500);
        } else {
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 500);
        }
    });

    // Update active menu link on scroll
    $(window).on('scroll', function () {
    var currentPosition = $(this).scrollTop();

        // Check if we're at the top of the page
        if (currentPosition <= 100) { // You might need to adjust this threshold
            $('nav a').removeClass('active-link');
            $('nav').find('a[href="#home"]').addClass('active-link'); // Make sure this matches your "Home" section's ID
        } else {
            $('section').each(function () {
                var top = $(this).offset().top - 100,
                    bottom = top + $(this).outerHeight();

                if (currentPosition >= top && currentPosition <= bottom) {
                    $('nav a').removeClass('active-link');
                    $('nav').find('a[href="#' + $(this).attr('id') + '"]').addClass('active-link');
                }
            });
            }
    });
    const scrollers = document.querySelectorAll(".scroller");
      addAnimation();

    function addAnimation() {
      scrollers.forEach((scroller) => {
        scroller.setAttribute("data-animated", true);

        const scrollerInner = scroller.querySelector(".scroller__inner");
        const scrollerContent = Array.from(scrollerInner.children);
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          duplicatedItem.setAttribute("aria-hidden", true);
          scrollerInner.appendChild(duplicatedItem);
        });
      });
    }

    // Initial highlight for "Home" or current section on page load
    $(window).trigger('scroll');

    
});
