;(function($){
    "use strict"
    var nav_offset_top = $('.header_area').height()+50;

    
    const observer = new IntersectionObserver(events => {
        events.forEach(event => {
            if (event.isIntersecting) {
                event.target.classList.add('fade-in-div');
                return;
            }
        
            event.target.classList.remove('fade-in-div');
        });
    });
    
    const leftFadeInElements = document.querySelectorAll('.left-fade-in');
    leftFadeInElements.forEach(myElement => {observer.observe(myElement);});
          

    /** LANG */

    $('#lang-en').click(function(){
        select_language("en")
    });


    $('#lang-tr').click(function(){
        select_language("tr")
    });

    /** LANG END */

    /** Index mail send  */

    $('#contactForm').submit(function(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const name = form.get("name");
        const subject = form.get("subject");
        const message = form.get("message");
        const body = message + '\n' + `Saygılarımla ${name},`;
        window.location.href = `mailto:info@kinglifesuite.com?Subject=${subject}&body=${body}&`;
        return false
    });


    /*$('#contactForm').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            subject: {
                required: true,
                minlength: 4
            },
            number: {
                required: true,
                minlength: 5
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 20
            }
        },
        messages: {
            name: {
                required: "come on, you have a name, don't you?",
                minlength: "your name must consist of at least 2 characters"
            },
            subject: {
                required: "come on, you have a subject, don't you?",
                minlength: "your subject must consist of at least 4 characters"
            },
            number: {
                required: "come on, you have a number, don't you?",
                minlength: "your Number must consist of at least 5 characters"
            },
            email: {
                required: "no email, no message"
            },
            message: {
                required: "um...yea, you have to write something to send this form.",
                minlength: "thats all? really?"
            }
        }
    }).submit(function(e) {
        e.preventDefault();

        console.log("!LOGOGOGOfirst");
        const form = new FormData(e.target);
        const name = form.get("name");
        const email = form.get("email");
        const subject = form.get("subject");
        const message = form.get("message");
        console.log(name, email, subject, message, "!LOGOGOGO");
        //href="mailto:info@kinglifesuite.com?Subject=KingLifeSuiteHakkında%20Contact"
        return false
    });*/


    /** */


    /*-------------------------------------------------------------------------------
	  Navbar 
	-------------------------------------------------------------------------------*/

	//* Navbar Fixed  
    function navbarFixed(){
        if ( $('.header_area').length ){ 
            $(window).scroll(function() {
                var scroll = $(window).scrollTop();   
                if (scroll >= nav_offset_top ) {
                    $(".header_area").addClass("navbar_fixed");
                } else {
                    $(".header_area").removeClass("navbar_fixed");
                }
            });
        };
    };
    navbarFixed();
    
    function testimonialSlider(){
        if ( $('.testimonial_slider').length ){
            $('.testimonial_slider').owlCarousel({
                loop:true,
                margin: 30,
                items: 2,
                nav:false,
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
                }
            })
        }
    }
    testimonialSlider();
    
    //------- Mailchimp js --------//  

    function mailChimp(){
        $('#mc_embed_signup').find('form').ajaxChimp();
    }
    mailChimp();
    
    /* ===== Parallax Effect===== */
	
	function parallaxEffect() {
    	$('.bg-parallax').parallax();
	}
	parallaxEffect();
    
    
    $('select').niceSelect();
    $('#datetimepicker11,#datetimepicker1').datetimepicker({
        daysOfWeekDisabled: [0, 6]
    });
    
     /*---------gallery isotope js-----------*/
    function galleryMasonry(){
        if ( $('#gallery').length ){
            $('#gallery').imagesLoaded( function() {
              // images have loaded
                // Activate isotope in container
                $("#gallery").isotope({
                    itemSelector: ".gallery_item",
                    layoutMode: 'masonry',
                    animationOptions: {
                        duration: 750,
                        easing: 'linear'
                    }
                });
            })
        }
    }
    galleryMasonry();
	
	/*----------------------------------------------------*/
    /*  Simple LightBox js
    /*----------------------------------------------------*/
    $('.imageGallery1 .light').simpleLightbox();

})(jQuery)