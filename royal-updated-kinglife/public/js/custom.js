(($) => {
  'use strict';
  
  // Constants
  const VERSION = '1.0.0';
  const SCROLL_SPEED = 300;
  const SCROLL_THRESHOLD = 300;
  const NAV_OFFSET_TOP = $('.header_area').height() + 50;

  // Log version
  console.log(`VERSION ${VERSION} published`);

  // Initialize components
  const init = () => {
    initScrollToTop();
    initNavbar();
    initTestimonialSlider();
    initGallery();
    initParallax();
    initContactForm();
    initFadeInEffects();
  };

  // Scroll to top functionality
  const initScrollToTop = () => {
    const btn = $('#button');
    
    $(window).scroll(() => {
      btn.toggleClass('show', $(window).scrollTop() > SCROLL_THRESHOLD);
    });

    btn.on('click', (e) => {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, SCROLL_SPEED);
    });
  };

  // Contact form handler
  const initContactForm = () => {
    $('#contactForm').submit((e) => {
      e.preventDefault();
      const form = new FormData(e.target);
      const mailData = {
        name: form.get('name'),
        subject: form.get('subject'),
        message: form.get('message')
      };

      const body = `Merhabalar,%0D%0A${mailData.message}%0D%0A%0D%0A%0D%0ASaygılarımla ${mailData.name},`;
      window.location.href = `mailto:info@kinglifesuite.com?Subject=${mailData.subject}&body=${body}&`;
      return false;
    });
  };

  // Navbar functionality
  const initNavbar = () => {
    if (!$('.header_area').length) return;
    
    $(window).scroll(() => {
      $('.header_area').toggleClass('navbar_fixed', 
        $(window).scrollTop() >= NAV_OFFSET_TOP
      );
    });
  };

  // Testimonial slider
  const initTestimonialSlider = () => {
    const $slider = $('.testimonial_slider');
    if (!$slider.length) return;

    $slider.owlCarousel({
      loop: true,
      margin: 30,
      items: 2,
      nav: false,
      autoplay: true,
      dots: true,
      smartSpeed: 1500,
      responsiveClass: true,
      responsive: {
        0: { items: 1 },
        768: { items: 2 }
      }
    });
  };

  // Gallery functionality
  const initGallery = () => {
    const $gallery = $('#gallery');
    if (!$gallery.length) return;

    $gallery.imagesLoaded(() => {
      $gallery.isotope({
        itemSelector: '.gallery_item',
        layoutMode: 'masonry',
        animationOptions: {
          duration: 750,
          easing: 'linear'
        }
      });
    });

    // Initialize lightbox
    $('.imageGallery1 .light').simpleLightbox();
  };

  // Parallax effect
  const initParallax = () => {
    $('.bg-parallax').parallax();
    $('select').niceSelect();
  };

  // Fade in effects
  const initFadeInEffects = () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          entry.target.classList.toggle('fade-in-div', entry.isIntersecting);
        });
      }
    );

    document.querySelectorAll('.left-fade-in')
      .forEach(element => observer.observe(element));
  };

  // Initialize everything when DOM is ready
  $(init);
})(jQuery);