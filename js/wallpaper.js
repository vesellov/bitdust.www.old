var current_wallpaper = 0;

var wallpapers_list;

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else var expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

function eraseCookie(name) {
	createCookie(name,"",-1);
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}

function nextSlide() {
	current_wallpaper = getRandomInt(0, wallpapers_list.length-1);
	//debug.log('vegas do next slide : ' + current_wallpaper);
	createCookie('current_wallpaper', current_wallpaper, 1);
	$.vegas( { 
		src: wallpapers_list[current_wallpaper], 
		fade: 4000} );
	setTimeout(nextSlide, 15000);
}

function runSlideShow(wallpapers) {
	wallpapers_list = wallpapers;
	current_wallpaper = readCookie('current_wallpaper');
	var first_fade = 4000;
	if (current_wallpaper === null) {
		current_wallpaper = getRandomInt(0, wallpapers_list.length-1);
		createCookie('current_wallpaper', current_wallpaper, 1);
		debug.log('vegas created new cookie: ' + current_wallpaper);
	} else {
		current_wallpaper = parseInt(current_wallpaper, 10);
		first_fade = 0;
		debug.log('vegas loaded from cookie: ' + current_wallpaper);
	}
    var cache = [];
    for (var i in wallpapers_list) {
        if (wallpapers_list[i]) {
            var cacheImage = document.createElement("img");
            cacheImage.src = wallpapers_list[i];
            cache.push(cacheImage);
        }
    }
	$.vegas({
		src: wallpapers_list[current_wallpaper],
		fade: first_fade,
		loading: false
	});
	$('body').bind('vegascomplete', function(e, bg) {
		//var img = $(bg).attr('src');
		//debug.log('vegascomplete: ' + img);
	});
	setTimeout(nextSlide, 7000);
}

