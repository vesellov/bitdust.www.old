$(document).ready(function() {
	var body = document.body;
	var html = document.documentElement;
    var height = Math.max( body.scrollHeight, body.offsetHeight, 
        html.clientHeight, html.scrollHeight, html.offsetHeight );
	$('#parallax-image-bg-1').css('height', height);
	$('#parallax-image-bg-2').css('height', height);
    $(window).bind('scroll', function(e) {
        parallax();
    });
});

function parallax() {
    var scrollPosition = $(window).scrollTop();
    $('#parallax-image-bg-1').css('top',(0 - (scrollPosition * .18))+'px' );
    $('#parallax-image-bg-2').css('top',(0 - (scrollPosition * .25))+'px' );
}       