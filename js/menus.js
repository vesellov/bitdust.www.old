
var menus = {};

var offset = 3.3;

var frame = 0;

var last_url = null;

function tostr(obj, ndeep) {
	if(obj == null){ return String(obj); }
	switch(typeof obj){
	    case "string": return '"'+obj+'"';
	    case "function": return obj.name || obj.toString();
	    case "object":
	      var indent = Array(ndeep||1).join(' '), isArray = Array.isArray(obj);
	      return '{['[+isArray] + Object.keys(obj).map(function(key){
	           return ' ' + indent + key + ': ' + tostr(obj[key], (ndeep||1)+1);
	      }).join(',') + ' ' + indent + '}]'[+isArray];
	    default: return obj.toString();
	}
}

function rgb2hex(rgb){
	 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?([\d\.]+)[\s+]?\)/i);
	 return (rgb && rgb.length === 5) ? "#" +
	  ("0" + Math.floor(parseFloat(rgb[4],10)*255).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
	  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function menuMouseClick(e) {
	if (lock) { return false; }
    if(!e){ var e = window.event; }
    var t = e.currentTarget || e.srcElement;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
    	window.event.cancelBubble = true;
    }
    debug.log('menu-clicked ' + t.id)
    lock = true;
    root_visualizer.event('menu-clicked', t.id)
    lock = false;
    return false;
}

function subMenuMouseClick(e) {
	if (lock) { return false; }
    if(!e){ var e = window.event; }
    var t = e.currentTarget || e.srcElement;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
    	window.event.cancelBubble = true;
    }
    debug.log('sub-menu-clicked ' + t.id)
    lock = true;
    root_visualizer.event('sub-menu-clicked', t.id);
    lock = false;
    return false;
}

function boxMouseClick(e) {
	if (lock) { return false; }
    if(!e){ var e = window.event; }
    var t = e.currentTarget || e.srcElement;
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
    	window.event.cancelBubble = true;
    }
    debug.log('box-clicked ' + t.id)
    lock = true;
    root_visualizer.event('box-clicked', t.id);
    lock = false;
    return false;
}

function emptySpaceMouseClick(e) {
	if (lock) { return false; }
    if(!e){ var e = window.event; }
    debug.log('empty-space-clicked')
    lock = true;
    root_visualizer.event('empty-space-clicked');
    lock = false;
}

function menuLinkClicked(e) {
	if (lock) { return false; }
    if(!e){ var e = window.event; }
    var t = e.currentTarget || e.srcElement;
    if (e.stopPropagation) {
        e.preventDefault();    
        e.stopPropagation();
    } else {
    	window.event.cancelBubble = true;
    	window.event.returnValue = false;
    }
    var href = '';
    try {
    	href = t.getAttribute('href');
    } catch (exc1) {
    	try {
    		href = t.attributes.href.value;
    	} catch (exc2) {
    		href = t.attributes.href.textContent;
    	}
    }
    debug.log('link-clicked ' + href)
    lock = true;
    root_visualizer.event('link-clicked', href);
    lock = false;
    return false;
}

function updateMenus() {
    var content = document.getElementById('main_page_content');
    var logo = document.getElementById('main_page_logo');
    var Pos = 0.0;
    var N = $('.main_page_menu').length;
    var ScreenScale = Math.min(2.0, $(content).width() / $(content).height()); 
    var R = Math.min($(content).width() * 0.3, $(logo).width() * 0.6); 
    var X_scale = 1.0;
    var Y_scale = 1.0;
    var Y_offset = 0;
    if ($(content).width() < 800) {
    	Y_offset = 40;
    	X_scale = 1.0;
        Y_scale = 1.0;
    }
    if ($(content).width() < 570) {
    	Y_offset = 80;
    	X_scale = 1.8;
        Y_scale = 1.2;
    }
    for (id in menus) {
        var menu = document.getElementById(id);
        var a = (( Pos - offset ) / N) * Math.PI * 2; 
    	var x = ScreenScale * X_scale * R * Math.cos(a);
    	var y = Y_scale * R * Math.sin(a);
		x += $(content).width() / 2.0;
    	y += (($(content).height()) / 2.0) + Y_offset;
    	var w = $(menu).width()+20;
    	var h = w;
        $('#'+id).css({
        	'left':  x + 'px', 
        	'top': y + 'px',
        	'height': $(menu).width() + 'px',
        	'line-height': $(menu).width() + 'px',
        	'margin-left': (-$(menu).width()/2) + 'px',
        	'margin-top': (-$(menu).width()/2) + 'px',
        });
        Pos += 1.0;
    }
}

function updateSubMenus() {
    var content = document.getElementById('main_page_content');
    if ($(content).width() < 800) {
	    for (id in menus) {
	        for (sub_id in menus[id].items) {
	            var submenu = document.getElementById(sub_id);
	            $(submenu).css('position', 'inherit');
	        }
		}
    } else {
	    for (id in menus) {
	        for (sub_id in menus[id].items) {
	            var submenu = document.getElementById(sub_id);
	            $(submenu).css('position', 'fixed');
	            for (s in menus[id].items[sub_id].style) {
	                if (navigator.appVersion.indexOf('MSIE 7') > -1 && s == 'backgroundColor') {
	                	var h = rgb2hex(menus[id].items[sub_id].style[s]);
	            		submenu.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr="+h+",endColorstr="+h+")";
	                } else {
	                    submenu.style[s] = menus[id].items[sub_id].style[s];
	                }
	            }
	            switch (menus[id].items[sub_id].align) {
		        	case 'center': {
		                $(submenu).css({'margin-left': '-' + ($(submenu).width()/2+20) + 'px'});
		                //$(submenu).css({'margin-top': '-' + ($(submenu).height()/2+10) + 'px'});
		                //$(submenu).css({'margin-left': 'calc(-50%)'});
		        		break;
		        	}
		        	case 'left': {
		                $(submenu).css({'margin-left': '-' + ($(submenu).width()+40) + 'px'});
		                //$(submenu).css({'margin-top': '-' + ($(submenu).height()/2+10) + 'px'});
		        		break;
		        	}
		        	case 'right': {
		        		break;
		        	}
	            }
	        }
	    }
    }
}


function updateBoxes() {
    var content = document.getElementById('main_page_content');
    if ($(content).width() < 800) {
		for (boxid in boxes) {
			var boxdata = boxes[boxid];
		    var box = document.getElementById(boxid);
		    $(box).css('position', 'inherit');
		    $(box).css('width', 'inherit');
	    	$(box).css({'margin-top': '0px'});
	    	$(box).css({'margin-left': '0px'});
	    	$(box).css({'left': 'auto'});
	    	$(box).css({'top': 'auto'});
	    	$(box).css({'right': 'auto'});
	    	$(box).css({'bottom': 'auto'});
		}
    } else {
		for (boxid in boxes) {
			var boxdata = boxes[boxid];
		    var box = document.getElementById(boxid);
		    $(box).css('position', 'fixed');
		    if ('left' in boxdata) { box.style.left = boxdata.left; }
		    if ('right' in boxdata) { box.style.right = boxdata.right; }
		    if ('top' in boxdata) { box.style.top = boxdata.top; }
		    if ('bottom' in boxdata) { box.style.bottom = boxdata.bottom; }
		    if ('width' in boxdata) { $(box).css({'width': boxdata.width}); }
		    if ('max-width' in boxdata) { $(box).css({'max-width': boxdata['max-width']}); }
		    if ('max-height' in boxdata) { $(box).css({'max-height': boxdata['max-height']}); }
		    if (boxdata['align'] == 'center') {
		    	$(box).css({'margin-left': '-' + ($(box).width()/2+20) + 'px'});
		    }
		    if (boxdata['valign'] == 'center') {
		    	$(box).css({'margin-top': '-' + ($(box).height()/2+20) + 'px'});
		    }
		    if ('margin-left' in boxdata) { $(box).css({'margin-left': boxdata['margin-left']}); }
		}
    }
}

function animateMenus() {
	frame += 10;
	if (frame > 99) {
		frame = 0;
	}
	var i = 0;
    for (id in menus) {
    	i += 0.4;
        var menu = document.getElementById(id);
    	var a = ((frame) / 100.0) * Math.PI * 2; 
    	var x = 50 + 50 * Math.cos(a) + frame;
    	if (x > 100) {
    		x -= 100;
    	}
    	var y = 50 + 25 * Math.sin(a);
    	var newPos = (x) + '% ' + (y) + '%';
        $('#'+id).css('backgroundPosition', newPos); 
    }
} 

function loopMenus() {
	setInterval(animateMenus, 100);
}

function createMenus() {
    var content = document.getElementById('main_page_content');
    for (id in menus) {
        var menu = document.getElementById(id);
        menu.onclick = function (e) { menuMouseClick(e); };
        
        for (sub_id in menus[id].items) {
            var submenu = document.getElementById(sub_id);
            for (s in menus[id].items[sub_id].style) {
                if (navigator.appVersion.indexOf('MSIE 7') > -1 && s == 'backgroundColor') {
                	var h = rgb2hex(menus[id].items[sub_id].style[s]);
            		submenu.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr="+h+",endColorstr="+h+")";
                } else {
                    submenu.style[s] = menus[id].items[sub_id].style[s];
                }
            }
            switch (menus[id].items[sub_id].align) {
	        	case 'center': {
	                $(submenu).css({'margin-left': '-' + ($(submenu).width()/2+20) + 'px'});
	                //$(submenu).css({'margin-top': '-' + ($(submenu).height()/2+10) + 'px'});
	                //$(submenu).css({'margin-left': 'calc(-50%)'});
	        		break;
	        	}
	        	case 'left': {
	                $(submenu).css({'margin-left': '-' + ($(submenu).width()+40) + 'px'});
	                //$(submenu).css({'margin-top': '-' + ($(submenu).height()/2+10) + 'px'});
	        		break;
	        	}
	        	case 'right': {
	        		break;
	        	}
            }
        	submenu.onclick = function(e) { subMenuMouseClick(e); };
            //if ( menus[id].items[sub_id]['box'] != undefined ) {
            	//createBoxes(sub_id, menus[id].items[sub_id].box);
            //}
        }
    }; 

    content.onclick = function(e) { emptySpaceMouseClick(e); };
    
	var elements = document.getElementsByTagName("a"); 
	for(var i=0; i<elements.length; i++) {
	    if (  elements[i].className == 'mmlink' || 
	    	  elements[i].className == 'top_menu_item' ||
	    	  elements[i].parentNode.id == 'copyright') { 
    		elements[i].onclick = function(e){
    			menuLinkClicked(e); 
    		}
	    }
	};
	
	updateMenus();
	updateSubMenus()
	updateBoxes();
	
	window.onresize = function() {
		updateMenus();
		updateSubMenus()
		updateBoxes();
	};
	
	loopMenus();
	
}

function setUpHistory() {
	//debug.log(window.location.href);
	//var target = URI(History.getState().url).toString();
	
//	var urlEnd = target.indexOf("?");
//	if(urlEnd == -1){
//	    urlEnd = target.length;
//	}
//	if (urlEnd > 0){
//	    if (target[urlEnd - 1] == "/"){
//	        target = target.substr(0, urlEnd-1) + target.substr(urlEnd);
//	    }    
//	}
//	if(target.substr(-1) == '/') {
//		target = target.substr(0, target.length - 1);
//	}
	
	var hist = window.history.state;
	//var target = window.history.state.url;
	debug.log('setUpHistory ', hist);
	//History.replaceState(History.getState().data, History.getState().title, target);

	window.addEventListener('popstate', function(e){
	//History.Adapter.bind(window, 'statechange', function(){ 
		//var hist = History.getState();
		var hist = window.history.state;
		if (hist) {
			debug.log('statechange: ', hist.url, tostr(hist.data), ' lock: ' + lock);
			if ( ! lock ) { 
				root_visualizer.event('state-changed', hist);
			}
		}
		return false;
	});

}

