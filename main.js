$(document).ready(function() {
    adjustSizing();
    stickNavbar();
    navbarHighlight();
    $('.mobile-navbar').css('visibility', 'hidden');

    var toggle  = document.querySelector(".c-hamburger");
    (toggle.classList.contains("is-active") === true) ? toggle.classList.remove("is-active") : toggle.classList.add("is-active");
});

$(window).resize(adjustSizing);

$(window).scroll(function() {
    stickNavbar();
});

// Animate scrolling between sections
$('.enterButton,.brand').click(function(){
    $('html, body').animate({
        scrollTop: $( $.attr(this, 'href') ).offset().top
    }, 500);
    return false;
});

$('.enterButton').click(function(){
    $('.mobile-navbar').css('visibility', 'visible');
});

//  Adjust the sizing of elements to best fit the current display
function adjustSizing() {
    if (($('.navbar-fixed').width() != '8') && (($(window).width() < 1000) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))) {
        $(".c-hamburger").click();
    }

    $('#welcome').height($(window).height());
    $('#new-york').width($(window).width());
    $('.navbar-container').height($(window).height());
}

// Fixing navbar if not on welcome page
function stickNavbar() {
    if ($('#welcome').isOnScreen() == false) {
        $('.navbar-fixed').addClass('stuck');
        $('.menu-close').addClass('menu-stuck');

    } else {
        $('.navbar-fixed').removeClass('stuck');
        $('.menu-close').removeClass('menu-stuck');
    }
}

// Highlighting appropriate section in navbar
function navbarHighlight() {
    $('.section').each(function() {
        if ($(this).isOnScreen()) {
            $("." + $(this).attr("id") + "li").addClass('select');
        } else {
            $("." + $(this).attr("id") + "li").removeClass('select');
        };
    });
}

// Check to see if element is in the viewport
$.fn.isOnScreen = function(){
    
    var win = $(window);
    
    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();
    
    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();
    
    return (!(viewport.right <= bounds.left || viewport.left >= bounds.right || viewport.bottom <= bounds.top || viewport.top >= bounds.bottom));
    
};    

// Handles closing of nav bar
(function() {

    var toggle = document.querySelector(".c-hamburger");

    toggle.addEventListener( "click", function(e) {
      e.preventDefault();
      if($('.navbar-fixed').width() != '8') {

        $('.navbar-fixed').animate({width: '8px'},250);
        $('.menu-close-container').animate({left: '8px'},250);
        $('.body').animate({marginLeft: '8px'},250);
        
      } else {

        $('.navbar-fixed').animate({width: '280px'},250);
        $('.menu-close-container').animate({left: '280px'},250);
        $('.body').animate({marginLeft: '280px'},250);

      }

      (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
    });

})();

// Allow use of arrow keys to jump from section to section
$(document).keydown(function(e) {
    switch(e.which) {
        case 38: // up
            $('.section').each(function() {
                if ($(this).isOnScreen()) {
                    $(document).scrollTop( $( "#" + $(this).prev().first().attr("id")).offset().top ); 
                };
            });           
        break;

        case 40: // down
            if ($('#welcome').isOnScreen()) {
                $(".enterButton").click();
            } else if ($('#about').isOnScreen()) {
                $(document).scrollTop( $( "#experience-anchor").offset().top );
            } else if ($('#experience').isOnScreen()) {
                $(document).scrollTop( $( "#skills-anchor").offset().top );
            } else if ($('#skills').isOnScreen()) {
                $(document).scrollTop( $( "#projects-anchor").offset().top );
            } else if ($('#projects').isOnScreen()) {
                $(document).scrollTop( $( "#contact-anchor").offset().top );
            }  
        break;


        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});
