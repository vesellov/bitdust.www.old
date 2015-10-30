
var _debug = false;

var RootVisualizer = Automat.extend({

    construct: function(begin_state) {
        this.state = begin_state;
        this.name = "root_visualizer";
        this.main_id = undefined;
        this.sub_id = undefined;
        this.widgets = undefined;
        this.source_url = undefined;
        this.cache = {};
        debug.log('CREATED AUTOMAT ' + this.name)
    },

    A: function(event, args) {
        // Access method to interact with root_visualizer() machine.
        switch (this.state) {
            case 'SOURCE': {
                if ( event == 'link-clicked' && this.isURL("external",args) ) {
                    this.state = 'REDIRECTED';
                    this.doHideSource(event, args);
                    this.doSetURL(event, args);
                    this.doPushState(event, args);
                    this.doClearSub(event, args);
                    this.doClearMain(event, args);
                    this.doOpenLink(event, args);
                } else if ( event == 'state-changed' && this.isState("source",args) ) {
                    this.doReadState(event, args);
                    this.doRepalceState(event, args);
                    this.doUpdateSource(event, args);
                } else if ( event == 'link-clicked' && this.isURL("source",args) ) {
                    this.doSetURL(event, args);
                    this.doUpdateSource(event, args);
                    this.doPushState(event, args);
                } else if ( ( event == 'link-clicked' && this.isURL("sub",args) ) || ( event == 'state-changed' && this.isState("sub",args) ) ) {
                    this.state = 'SUB';
                    this.doHideSource(event, args);
                    this.doSetURL(event, args);
                    this.doReadState(event, args);
                    this.doRepalceState(event, args);
                    this.doPushState(event, args);
                    this.doShowSub(event, args);
                } else if ( ( event == 'link-clicked' && this.isURL("widgets",args) ) || ( event == 'state-changed' && this.isState("widgets",args) ) ) {
                    this.state = 'WIDGETS';
                    this.doHideSource(event, args);
                    this.doSetURL(event, args);
                    this.doReadState(event, args);
                    this.doRepalceState(event, args);
                    this.doPushState(event, args);
                    this.doShowWidgets(event, args);
                } else if ( ( event == 'link-clicked' && this.isURL("main",args) ) || ( event == 'state-changed' && this.isState("main",args) ) ) {
                    this.state = 'MAIN';
                    this.doHideSource(event, args);
                    this.doSetURL(event, args);
                    this.doReadState(event, args);
                    this.doRepalceState(event, args);
                    this.doPushState(event, args);
                    this.doShowMenus(event, args);
                    this.doShowLogo(event, args);
                }
                break;
            }
            case 'AT_STARTUP': {
                if ( event == 'init' && this.isState("sub",args) ) {
                    this.state = 'SUB';
                    this.doInit(event, args);
                    this.doReadState(event, args);
                    this.doShowLogo(event, args);
                    this.doShowSub(event, args);
                    this.doPushState(event, args);
                } else if ( event == 'init' && this.isState("widgets",args) ) {
                    this.state = 'WIDGETS';
                    this.doInit(event, args);
                    this.doReadState(event, args);
                    this.doShowWidgets(event, args);
                    this.doPushState(event, args);
                } else if ( event == 'init' && this.isState("source",args) ) {
                    this.state = 'SOURCE';
                    this.doInit(event, args);
                    this.doReadState(event, args);
                    this.doShowSource(event, args);
                    this.doPushState(event, args);
                } else if ( event == 'init' && this.isState("main",args) ) {
                    this.state = 'MAIN';
                    this.doInit(event, args);
                    this.doReadState(event, args);
                    this.doShowLogo(event, args);
                    this.doShowMenus(event, args);
                    this.doPushState(event, args);
                }
                break;
            }
            case 'MAIN': {
                if ( event == 'link-clicked' && this.isURL("source",args) ) {
                    this.state = 'SOURCE';
                    this.doHideMenus(event, args);
                    this.doHideLogo(event, args);
                    this.doSetURL(event, args);
                    this.doShowSource(event, args);
                    this.doPushState(event, args);
                } else if ( event == 'menu-clicked' ) {
                    this.state = 'SUB';
                    this.doSetMain(event, args);
                    this.doPushState(event, args);
                    this.doHideMenus(event, args);
                    this.doHideLogo(event, args);
                    this.doShowSub(event, args);
                } else if ( event == 'link-clicked' && this.isURL("external",args) ) {
                    this.state = 'REDIRECTED';
                    this.doHideMenus(event, args);
                    this.doHideLogo(event, args);
                    this.doSetURL(event, args);
                    this.doPushState(event, args);
                    this.doOpenLink(event, args);
                }
                break;
            }
            case 'SUB': {
                if ( event == 'link-clicked' && this.isURL("source",args) ) {
                    this.state = 'SOURCE';
                    this.doHideSub(event, args);
                    this.doHideLogo(event, args);
                    this.doSetURL(event, args);
                    this.doClearMain(event, args);
                    this.doShowSource(event, args);
                    this.doPushState(event, args);
                } else if ( event == 'state-changed' || event == 'empty-space-clicked' || ( event == 'link-clicked' && this.isURL("main",args) ) ) {
                    this.state = 'MAIN';
                    this.doHideSub(event, args);
                    this.doSetURL(event, args);
                    this.doClearMain(event, args);
                    this.doRepalceState(event, args);
                    this.doShowMenus(event, args);
                    this.doShowLogo(event, args);
                } else if ( event == 'sub-menu-clicked' && this.hasWidgets(event, args) ) {
                    this.state = 'WIDGETS';
                    this.doHideSub(event, args);
                    this.doHideLogo(event, args);
                    this.doSetSub(event, args);
                    this.doPushState(event, args);
                    this.doShowWidgets(event, args);
                } else if ( event == 'link-clicked' && this.isURL("external",args) ) {
                    this.state = 'REDIRECTED';
                    this.doHideSub(event, args);
                    this.doHideLogo(event, args);
                    this.doSetURL(event, args);
                    this.doPushState(event, args);
                    this.doClearSub(event, args);
                    this.doClearMain(event, args);
                    this.doOpenLink(event, args);
                }
                break;
            }
            case 'WIDGETS': {
                if ( event == 'link-clicked' && this.isURL("source",args) ) {
                    this.state = 'SOURCE';
                    this.doHideWidgets(event, args);
                    this.doSetURL(event, args);
                    this.doHideLogo(event, args);
                    this.doShowSource(event, args);
                    this.doPushState(event, args);
                } else if ( event == 'link-clicked' && this.isURL("external",args) ) {
                    this.state = 'REDIRECTED';
                    this.doHideWidgets(event, args);
                    this.doSetURL(event, args);
                    this.doPushState(event, args);
                    this.doClearSub(event, args);
                    this.doClearMain(event, args);
                    this.doOpenLink(event, args);
                } else if ( event == 'link-clicked' && this.isURL("main",args) ) {
                    this.state = 'MAIN';
                    this.doHideWidgets(event, args);
                    this.doHideLogo(event, args);
                    this.doSetURL(event, args);
                    this.doClearSub(event, args);
                    this.doClearMain(event, args);
                    this.doPushState(event, args);
                    this.doShowMenus(event, args);
                    this.doShowLogo(event, args);
                } else if ( event == 'empty-space-clicked' || event == 'state-changed' || ( event == 'link-clicked' && this.isURL("sub",args) ) ) {
                    this.state = 'SUB';
                    this.doHideWidgets(event, args);
                    this.doSetURL(event, args);
                    this.doClearSub(event, args);
                    this.doRepalceState(event, args);
                    this.doShowLogo(event, args);
                    this.doShowSub(event, args);
                }
                break;
            }
            case 'REDIRECTED': {
                break;
            }
        }
    },
    
    hasWidgets: function(event, args) {
    	try {
    		return menus[this.main_id].items[this.sub_id]['box'] != undefined;
    	} catch (e) {
	    	try {
	    		return menus[this.main_id].items[args]['box'] != undefined;
	    	} catch (e) {
	    		return false;
	    	}
    	}
	},
	
    isState: function(flag, args) {
    	var data = this._read_state(args);
    	debug.log('isState(' + flag + ')? : ', tostr(data), window.location.href);
    	if (flag == "sub") {
    		return ( data && data["main"] != undefined && data['sub'] == undefined );
    	} else if (flag == "widgets") {
    		return ( data && data["sub"] != undefined && data["main"] != undefined );
    	} else if (flag == "source") {
    		return ( data && data["source"] != undefined );
    	}
    	if (flag == "main") {
    		if ( data == undefined ) {
    			return true;
    		} else if ( Object.keys(data).length == 0 ) {
    			return true;
    		} else if (data.hasOwnProperty("/") ) {
    			return true
    		} else if ( data["source"] != undefined ) {
    			var u = URI(data["source"]);
            	if ((u.host() == "" || u.host() == 'bitdust.io' || u.host() == 'localhost') && 
               		 u.pathname() == '/') {
               		return true;
            	}    			
    		}
    	}
    	alert("incorrect data in the function isState(" + flag + ") : ", data);
    	return false;
    },

    isURL: function(flag, args) {
    	var uri = URI(args);
    	//debug.log('isURL(' + flag + '), ', uri, uri.host(), uri.host());
    	if (flag == "external") {
            
        	return (uri.host() != "" && 
        			uri.host() != 'bitdust.io' && 
        			uri.host() != 'localhost' &&
        			uri.host() != '127.0.0.1') 
    	} else if (flag == "main"){
        	return ((uri.host() == "" ||
        			uri.host() == 'bitdust.io' || 
        			uri.host() == 'localhost') && 
        			uri.pathname() == '/') 
		} else if (flag == "sub"){
        	return false; // TODO
		} else if (flag == "widgets"){
			return false; // TODO
		} else if (flag == "source"){
	    	return ((uri.host() == "" ||
        			uri.host() == 'bitdust.io' || 
        			uri.host() == 'localhost') &&
        			uri.pathname() != '/') // TODO
		}
    },

    doInit: function(event, args) {
        createMenus();
    },
    
    doReadState: function(event, args) {
    	var data = this._read_state(args);
    	debug.log('doReadState', tostr(data));
    	if (data && Object.keys(data).length > 0 && ( event == "state-changed" || event == "init" )) {
	        this.main_id = undefined;
	        this.sub_id = undefined;
	        this.widgets = undefined;
	        this.source_url = undefined;
	    	if (data['source'] != undefined) {
	    		this.source_url = data['source'];  // URI.decode(data['source']);
	    	}
	    	if (data['sub'] != undefined) {
	    		this.sub_id = data['sub'];
	    		this.widgets = data['widgets'];    		
	    	}
	    	if (data['main'] != undefined) {
	    		this.main_id = data['main'];
    		}
    		debug.log("doReadState ", [this.main_id, this.sub_id, this.widgets, this.source_url]);
    	} else {
    		debug.log("doReadState skip");
    	}
    },

    doPushState: function(event, args) {
		var histurl = "";
//		if (this.main_id != undefined) {
//			histurl += "main=" + this.main_id + "&";
//		}
//		if (this.sub_id != undefined) {
//			histurl += "sub=" + this.sub_id + "&";
//		}
		if (this.source_url != undefined) {
			//histurl += "source=" + URI.encode(this.source_url).replace("#", "%23") + "&";
			histurl = this.source_url;
		}
		histurl = URI(histurl).normalize().toString();
//	    if (histurl == "") {
//	    	histurl = '';
//	    }
	    //histurl = '/' + histurl;
	    var data = this._make_state(); 
		debug.log('doPushState: ', histurl, tostr(data));
        try {
            window.history.pushState(data, null, histurl);
        } catch (e) {
        }
		//History.pushState(dat, null, histurl);
    },
	
	doRepalceState: function(event, args) {
		var histurl = "";
//		if ( event == 'state-changed' || event == 'empty-space-clicked') { 
//		if (this.main_id != undefined) {
//			histurl += "main=" + this.main_id + "&";
//		}
//		if (this.sub_id != undefined) {
//			histurl += "sub=" + this.sub_id + "&";
//		}
		if (this.source_url != undefined) {
			//histurl += "source=" + URI.encode(this.source_url).replace('#',"%23") + "&";
			//dat['source'] = this.source_url;
			histurl = this.source_url;
		}
		histurl = URI(histurl).normalize().toString();
//	    if (histurl == "") {
//	    	histurl = '';
//	    }
	    //histurl = '/' + histurl;
	    var data = this._make_state(); 
		debug.log('doRepalceState: ', histurl, tostr(data));
        try {
            window.history.replaceState(data, null, histurl);
        } catch (e) {
        }
		//History.replaceState(dat, null, histurl);
//		}
    },

    doSetURL: function(event, args) {
    	if (event == 'link-clicked') {
    		var uri = URI(URI.decode(args));
    		debug.log(args, uri, uri.fragment(), uri.toString());
    		if (("#"+uri.fragment()) == uri.toString()) {
    			uri = URI(this.source_url + "#" + uri.fragment()); 
    		}
    		if ((uri.host() == "" || uri.host() == 'bitdust.io' || uri.host() == 'localhost') 
                    && uri.pathname() == '/') {
    			this.source_url = undefined;
    		} else {
    			this.source_url = uri.toString().replace(/^\/+|\/+$/g, '');
	    		//if(this.source_url.substr(-1) == '/') {
	    		//	this.source_url = this.source_url.substr(0, this.source_url.length - 1);
	    		//}
    		}
    	} else {
    		this.source_url = undefined;
    	}
    	debug.log('doSetURL: ', this.source_url);
    },
    
    doSetMain: function(event, args) {
    	this.main_id = args
    },

    doClearMain: function(event, args) {
    	this.main_id = undefined;
    },

    doSetSub: function(event, args) {
    	this.sub_id = args;
    },
    
    doClearSub: function(event, args) {
    	this.sub_id = undefined;
    },

    doShowMenus: function(event, args) {
    	debug.log('doShowMenus');
        for (other_id in menus) {
            $('#'+other_id).fadeIn();
        }
    },

    doHideMenus: function(event, args) {
    	debug.log('doHideMenus');
        for (other_id in menus) {
            $('#'+other_id).fadeOut();
        }
    },

    doShowSub: function(event, args) {
    	debug.log('doShowSub');
    	if (menus[this.main_id]['box'] != undefined) {
    		$('#'+menus[this.main_id].box).fadeIn();
    	}
        for (sub_id in menus[this.main_id].items) {
            $('#'+sub_id).fadeIn();
        }
    },

    doHideSub: function(event, args) {
    	debug.log('doHideSub');
    	if (menus[this.main_id]['box'] != undefined) {
    		$('#'+menus[this.main_id].box).fadeOut();
    	}
        for (sub_id in menus[this.main_id].items) {
            $('#'+sub_id).fadeOut();
        }
    },

    doShowWidgets: function(event, args) {
    	debug.log('doShowWidgets');
    	var boxes = menus[this.main_id].items[this.sub_id]['box'];
    	if ( boxes != undefined) {
    		if (boxes.constructor === Array) { 
	    		for (i in boxes) {
	    			$('#'+boxes[i]).fadeIn();
	    		}
    		} else {
    			$('#'+boxes).fadeIn();
    		}
    	}
    },
    
    doHideWidgets: function(event, args) {
    	debug.log('doHideWidgets');
    	var boxes = menus[this.main_id].items[this.sub_id]['box'];
    	if ( boxes != undefined) {
    		if (boxes.constructor === Array) { 
	    		for (i in boxes) {
	    			$('#'+boxes[i]).fadeOut();
	    		}
    		} else {
    			$('#'+boxes).fadeOut();
    		}
    	}
    },

    doShowLogo: function(event, args) {
    	debug.log('doShowLogo');
    	if (this.main_id != undefined && this.sub_id == undefined ) {
     	    if (menus[this.main_id]['logo'] != undefined) { 
				if (menus[this.main_id].logo != 'off') {
					$('#main_page_logo').fadeIn();
				}
			}
		} else if ( this.main_id != undefined && this.sub_id != undefined ) {
		    if (menus[this.main_id].items[this.sub_id]['logo'] != undefined) {
		  		if (menus[this.main_id].items[this.sub_id].logo != 'off') {
		  			$('#main_page_logo').fadeIn();
		  		}
		    }
    	} else {
    		$('#main_page_logo').fadeIn();
    	}
    },
    
    doHideLogo: function(event, args) {
    	debug.log('doHideLogo');
    	if ( this.main_id != undefined && this.sub_id == undefined ) {
    		if (menus[this.main_id]['logo'] != undefined) {
				if (menus[this.main_id].logo == 'off') {
					$('#main_page_logo').fadeOut();
				}
    		}
		} else if ( this.main_id != undefined && this.sub_id != undefined ) {
			if (menus[this.main_id].items[this.sub_id]['logo'] != undefined) {
		  		if (menus[this.main_id].items[this.sub_id].logo == 'off') {
		  			$('#main_page_logo').fadeOut();
		  		}
			}
    	}
    },

    doOpenLink: function(event, args) {
    	$("#main_page_logo").fadeOut(400);
		$("#main_page_content").fadeOut(400, function() {
			if (!_debug){
				window.location.href = args;
			}
		});
	},
	
    doShowSource: function(event, args) {
    	var srcurl = this.source_url || args;
//    	var srcurl = args;
//    	if (srcurl == undefined) {
//    		srcurl = this.source_url;
//    	}
    	var q = URI(srcurl).search(true);
    	// debug.log(q['source']);
    	if (q['source']) {
    		srcurl = URI.decode(q['source']).replace(/^\/+|\/+$/g, '');
//    		if(srcurl.substr(-1) == '/') {
//    			srcurl = srcurl.substr(0, srcurl.length - 1);
//    		}
    	}
        debug.log('doShowSource: ' + srcurl);
	    $("#main_page_logo").fadeOut(400);
	    $("#main_page_content").fadeOut(400);
    	if (this.cache.hasOwnProperty(srcurl)) {
    		var data = this.cache[srcurl];
			debug.log('from cache: ', srcurl, data.length)
    		this._set_source(data, srcurl);
    	} else {
    		this._request_source(srcurl, function(u,d) {
    			$("#page_container").fadeIn(400);
    		});
    	}
    },

    doUpdateSource: function(event, args) {
    	var srcurl = this.source_url || args;
//    	if (srcurl == undefined) {
//    		srcurl = this.source_url;
//    	}
    	debug.log("doUpdateSource", args, this.source_url, srcurl);
    	var q = URI(srcurl).search(true);
    	debug.log(srcurl, q);
    	if (q['source']) {
    		srcurl = URI.decode(q['source']).replace(/^\/+|\/+$/g, '');
//    		if(srcurl.substr(-1) == '/') {
//    			srcurl = srcurl.substr(0, srcurl.length - 1);
//    		}
    	}
    	debug.log('doUpdateSource: ' + srcurl);
    	if (this.cache.hasOwnProperty(srcurl)) {
    		data = this.cache[srcurl];
			debug.log('from cache: ', srcurl, data.length)
    		this._set_source(data, srcurl);
    	} else {
    		this._request_source(srcurl);
    	}
    },
   
    doHideSource: function(event, args) {
    	debug.log('doHideSource: ' + args);
    	$("#page_container").fadeOut(400);
	    $("#main_page_logo").fadeIn(400);
	    $("#main_page_content").fadeIn(400);
    },

    _make_state: function() {
		var data = {};
		if (this.main_id != undefined) {
			data['main'] = this.main_id;
		}
		if (this.sub_id != undefined) {
			data['sub'] = this.sub_id;
		}
		if (this.source_url != undefined) {
			data['source'] = this.source_url;
		}
		debug.log('_make_state: ', tostr(data));
		return data;
    },
    
    _read_state: function(args) {
    	var data = undefined;
		var u = URI(window.location.href); 
    	if (u.search() && u.search(true)["source"] != undefined) {
    		debug.log("_read_state 1 ", u);
    		u = URI.decode(u.search(true)["source"].replace(/^\/+|\/+$/g, ''));
//    		if (u.substr(-1) == '/') {
//    			u = u.substr(0, u.length - 1);
//    		}
    		data = {'source': u};
    	} else if (u.path() != "/") {
    		u = URI(u.path()+u.query()+u.fragment()).toString();
    		debug.log("_read_state 2 ", u);
    		u = u.replace(/^\/+|\/+$/g, '');
//    		if (u.substr(-1) == '/') {
//    			u = u.substr(0, u.length - 1);
//    		}
//    		debug.log("_read_state 2 ", u);
//    		if (u.substr(0) == '/') {
//    			u = u.substr(1, u.length);
//    		}
    		debug.log("_read_state 2 ", u);
    		if (u.length > 1) {
    			data = {'source': u}; 
    		}
    	} else {
    		var hist = window.history.state;
    		debug.log("_read_state 3 ", hist);
	    	if (hist) {
	    		data = window.history.state.data;
	    	}
    	}
    	return data;
    },
    
    _request_source: function(requrl, done_callback) {
    	var u = URI(requrl);
    	if (u.host() != "" && ( u.host() == 'bitdust.io' ||
    							u.host() == 'localhost' ||
    							u.host() == '127.0.0.1' )) {
    		u = URI(u.path()+u.query()+u.fragment());
//    		if (u.toString().substr(0) == '/') {
//    			u = URI(u.toString().substr(1, u.toString().length));
//    		}
    		u = URI(u.toString().replace(/^\/+|\/+$/g, ''));
    	}
    	debug.log("clean: ", u.toString());
    	var srcurl = u.fragment("").toString();
    	if (srcurl == "") {
    		srcurl = URI(this.source_url).fragment("").toString();
    	}
    	if (srcurl == "") {
    		debug.log('ERROR in _request_source: ', requrl, '  redirect!!!')
    		if (!_debug){
    			window.location.href = "/";
    		}
    	}
		debug.log('_request_source: ', srcurl, this.source_url);
		$.ajax({
			url: srcurl, context : { url: srcurl, root: this, requrl: this.source_url }
		}).done ( function (data) {
        	this.root.cache[this.url] = data;
			debug.log('cached: ', this.url, data.length, this.requrl)
        	this.root._set_source(data, this.requrl);
			if (done_callback) {
				done_callback(this.url, data);
			}
		}).fail(function(){
			debug.log('failed: ', this.url, this.requrl)
    		if (!_debug){
    			window.location.href = "/";
    		}
		});
    },
    
    _set_source: function(data, requrl) {
    	var dom = $.parseHTML(data);
    	var dom_page_content = $(dom).find("#page_content");
    	var new_content = dom_page_content.html();
    	//$("#page_content").empty();
    	//$("#page_content").append(page_content);
    	debug.log('_set_source ' + data.length + 'bytes cached, found ' + new_content.length + 'bytes in #page_content')
    	$("#page_content").replaceWith("<div id=page_content>" + new_content + "</div>");
    	$("#page_container").css('display', 'block');
		var frag = URI(requrl).fragment();
		if (frag) {
			var my_delay = setTimeout(function(frg){
				var target_offset = $("#"+frg).offset().top;
				debug.log('fragment: ', frg, target_offset);
				$("#page_container").scrollTop(target_offset - 50);
				debug.log('ok  ', $("#page_container").scrollTop());
			}, 100, frag);
        }
    	var href_list = [];
	    $("#page_content").find('a').each(function(e) {
	    	$(this).click(function(e){
    			menuLinkClicked(e); 
    		});
	    	$(this).addClass("mmlink");
	    	href_list.push($(this).attr("href"));
	    });
	    for (var i = 0; i < href_list.length; i++) {
	    	var u = URI(href_list[i]);
	    	if (u.host() != "" && 
	    		u.suffix() == 'html' &&
	    		u.host() in ['bitdust.io', 'localhost', '127.0.0.1'] ) {
				u = URI(u.path()+u.query()+u.fragment());
//	    		if (u.toString().substr(0) == '/') {
//	    			u = URI(u.toString().substr(1, u.toString().length));
//	    		}
	    		u = URI(u.toString().replace(/^\/+|\/+$/g, ''));
				var srcurl = u.fragment("").toString();
				if (srcurl == "") {
					srcurl = URI(this.source_url).fragment("").toString();
				}
				if (srcurl != "") {
					$.ajax({
						url: srcurl, 
						context : { url: srcurl, root: this }
					}).done(function(data) {
						this.root.cache[this.url] = data;
						debug.log('cached: ', this.url, data.length)
					});
				}
	    	}
	    }
    }    
   
});


