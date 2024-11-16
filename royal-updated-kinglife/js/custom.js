(function ($) {
  "use strict";
  var nav_offset_top = $(".header_area").height() + 50;

  console.log("VERSION 1.0.0 published")

  const observer = new IntersectionObserver((events) => {
    events.forEach((event) => {
      if (event.isIntersecting) {
        event.target.classList.add("fade-in-div");
        return;
      }

      event.target.classList.remove("fade-in-div");
    });
  });

  const leftFadeInElements = document.querySelectorAll(".left-fade-in");
  leftFadeInElements.forEach((myElement) => {
    observer.observe(myElement);
  });

  var btn = $("#button");

  $(window).scroll(function () {
    if ($(window).scrollTop() > 300) {
      btn.addClass("show");
    } else {
      btn.removeClass("show");
    }
  });

  btn.on("click", function (e) {
    e.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "300");
  });

  /** Index mail send  */

  $("#contactForm").submit(function (e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const name = form.get("name");
    const subject = form.get("subject");
    const message = form.get("message");
    const body = "Merhabalar,%0D%0A" + message + "%0D%0A%0D%0A%0D%0A" + `Saygılarımla ${name},`; // <br /> ...
    window.location.href = `mailto:info@kinglifesuite.com?Subject=${subject}&body=${body}&`;
    return false;
  });

  /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

  //* Navbar Fixed
  function navbarFixed() {
    if ($(".header_area").length) {
      $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll >= nav_offset_top) {
          $(".header_area").addClass("navbar_fixed");
        } else {
          $(".header_area").removeClass("navbar_fixed");
        }
      });
    }
  }
  navbarFixed();

  function testimonialSlider() {
    if ($(".testimonial_slider").length) {
      $(".testimonial_slider").owlCarousel({
        loop: true,
        margin: 30,
        items: 2,
        nav: false,
        autoplay: true,
        dots: true,
        smartSpeed: 1500,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1,
          },
          768: {
            items: 2,
          },
        },
      });
    }
  }
  testimonialSlider();

  /* ===== Parallax Effect===== */

  function parallaxEffect() {
    $(".bg-parallax").parallax();
  }
  parallaxEffect();

  $("select").niceSelect();
  $("#datetimepicker11,#datetimepicker1").datetimepicker({
    daysOfWeekDisabled: [0, 6],
  });

  /*---------gallery isotope js-----------*/
  function galleryMasonry() {
    if ($("#gallery").length) {
      $("#gallery").imagesLoaded(function () {
        // images have loaded
        // Activate isotope in container
        $("#gallery").isotope({
          itemSelector: ".gallery_item",
          layoutMode: "masonry",
          animationOptions: {
            duration: 750,
            easing: "linear",
          },
        });
      });
    }
  }
  galleryMasonry();

  /*----------------------------------------------------*/
  /*  Simple LightBox js
    /*----------------------------------------------------*/
  $(".imageGallery1 .light").simpleLightbox();
})(jQuery);
