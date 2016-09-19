$('.pro-position').click(function(){
	$(this).next().slideToggle();
});

$('#myTopnav li').click(function(){
	var href = $(this).find(">:first-child").attr('href');
	
    $('html, body').animate({
        scrollTop: $(href).offset().top
    }, 500);
});
