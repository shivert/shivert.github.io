$('.pro-position').click(function(){
	$(this).next().slideToggle();
	$(this).find(".rotate").toggleClass("down"); 
});

$('#myTopnav li:not(:last-child)').click(function(){
	var href = $(this).find(">:first-child").attr('href');

	$("#myTopnav").removeClass("responsive");
	
    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, 500);
});

$('.envelope').click(function(){
	var href = $(this).find(">:first-child").attr('href');
	
    $('html, body').animate({
        scrollTop: $('#contact').offset().top
    }, 500);
});
