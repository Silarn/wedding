/*
 * Application
 *
 */

(function($) {
    
    var $k;
    var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
    var galState = false;
    var offsets = {};
    var lastScroll = 0;
    var History = window.History;
    History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        History.log(State.data, State.title, State.url);
    });
    function exec() {
        if ($('body').hasClass('pace-over')) return;
        if (iOS) $('section').css('background-attachment', 'scroll');
        $('body').addClass('pace-over');
        $('#loading-logo').fadeOut();
        $('#layout-content').fadeIn(function(){
            
            $('.navbar-collapse').collapse({'toggle': false});
            $('body').scrollspy({ target: '#layout-nav', offset: 50 });
            $(window).on('activate.bs.scrollspy', function(e) {
                History.pushState(null, null, $("a[href^='#']", e.target).attr("href"));
                if ($("a[href^='#']", e.target).attr("href") === "#gallery") {
                    $('#galleryCar').carousel('cycle');
                } else {
                    $('#galleryCar').carousel('pause');
                }
                ga('send', 'event', 'navigate', 'scroll', window.location.hash);
            });
            
            $('.navbar-nav').click('li', function() {
                $('.navbar-collapse').collapse('hide');
                ga('send', 'event', 'navigate', 'nav', $(this).find('a').attr('href'));
            });
            
            $('#galleryCar').carousel({
                interval: 8000
            }).carousel('pause').css('height', ($(window).height()*(2/3))-50);
            
            if ($(window).width() >= 1200) $('#galleryCar').show();
            
            // handles the carousel thumbnails
            $('[id^=carousel-selector-]').click( function(){
              var id_selector = $(this).attr("id");
              var id = id_selector.substr(18);
              id = parseInt(id);
              $('#galleryCar').carousel(id);
              if ($(window).width() < 1200) {
                  galState = true;
                  $('#galleryCar').carousel('pause').css({'position': 'fixed', 'top': 0, 'right': 0, 'left': 0, 'bottom': 0, 'min-width': '100%', 'min-height': '100%', 'background': 'rgba(0,0,0,0.7)', 'z-index':2000}).fadeIn();
              }
              $('[id^=carousel-selector-]').removeClass('selected');
              $(this).addClass('selected');
            });
            $('#galleryCar img').click(function(){
                var gal = $('#galleryCar');
                if (!galState) {
                    if ($(window).width() >= 1200) gal.parent().css('min-height', gal.height());
                    gal.fadeOut(function(){
                        galState = true;
                        gal.carousel('pause');
                        gal.css({'position': 'fixed', 'top': 0, 'right': 0, 'left': 0, 'bottom': 0, 'min-width': '100%', 'min-height': '100%', 'background': 'rgba(0,0,0,0.7)', 'z-index':2000}).fadeIn();
                    });
                } else {
                    gal.fadeOut(function(){
                        galState = false;
                        gal.carousel('cycle');
                        gal.css({'position': '', 'top': '', 'right': '', 'left': '', 'bottom': '', 'min-width': '', 'min-height': '', 'background': '', 'z-index': ''});
                        if ($(window).width() < 1200) gal.hide();
                        else gal.fadeIn();
                        gal.parent().css('min-height', '');
                    });
                }
            });
            
            // when the carousel slides, auto update
            $('#galleryCar').on('slide.bs.carousel', function (e) {
              var id = $(e.relatedTarget).data('slide-number');
              id = parseInt(id);
              $('[id^=carousel-selector-]').removeClass('selected');
              $('[id=carousel-selector-'+id+']').addClass('selected');
            });
        
            $(document).tooltip({
                selector: "[data-toggle=tooltip]"
            })
        
            // Focus state for append/prepend inputs
            $('.input-group').on('focus', '.form-control', function () {
                $(this).closest('.input-group, .form-group').addClass('focus');
            }).on('blur', '.form-control', function () {
                $(this).closest('.input-group, .form-group').removeClass('focus');
            });
            
            $('.engage-img').click(function(e){
                e.stopPropagation();
                var img = $(this);
                var src = img.data('target');
                var bigImg = $('<img class="engage-big-img" src="'+src+'">');
                $('body').append(bigImg);
                bigImg.fadeIn();
                bigImg.click(function(){
                    $(this).fadeOut(function(){
                        $(this).remove();
                    });
                })
            });
            
            $(window).scroll(function(){
                var $win = $(this);
                if ($(this).scrollTop() >= $('#welcome').height()+$('#welcome-2').height()) {
                    $('#layout-nav').removeClass('navbar-fixed-bottom');
                    $('#layout-nav').addClass('navbar-fixed-top');
                    $('body').css('margin-top', '');
                } else if ($win.scrollTop()+$win.height() < $('#welcome').height()+$('#welcome-2').height() ) {
                    $('#layout-nav').removeClass('navbar-fixed-top');
                    $('#layout-nav').addClass('navbar-fixed-bottom');
                } else {
                    $('#layout-nav').removeClass('navbar-fixed-top').removeClass('navbar-fixed-bottom');
                    $('body').css('margin-top', '0');
                }
                $('.story-box, .story-proposal').each(function(){
                    var vPos = $(this).offset().top - $win.scrollTop();
                    if (vPos <= $win.height()*.65) {
                        $(this).addClass('in');
                    } else $(this).removeClass('in');
                });
                var timeHeight = $(window).scrollTop()-$('#story').offset().top-350 < 0 ? 0 : ($(window).scrollTop()-$('#story').offset().top-350 > $('.story-container').height()-100 ? $('.story-container').height()-100 : $(window).scrollTop()-$('#story').offset().top-350);
                $('#story-timeline').height(timeHeight);
                lastScroll = $(window).scrollTop();
            });
            $(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });
            var $win = $(window);
            if ($(this).scrollTop() >= $('#welcome').height()+$('#welcome-2').height()) {
                $('#layout-nav').removeClass('navbar-fixed-bottom');
                $('#layout-nav').addClass('navbar-fixed-top');
                $('body').css('margin-top', '');
            } else if ($win.scrollTop()+$win.height() < $('#welcome').height()+$('#welcome-2').height() ) {
                $('#layout-nav').removeClass('navbar-fixed-top');
                $('#layout-nav').addClass('navbar-fixed-bottom');
            } else {
                $('#layout-nav').removeClass('navbar-fixed-top').removeClass('navbar-fixed-bottom');
                $('body').css('margin-top', '0');
            }
            $('.story-box').each(function(){
                var vPos = $(this).offset().top - $win.scrollTop();
                if (vPos <= $win.height()*.65) {
                    $(this).addClass('in');
                } else $(this).removeClass('in');
            });
            var timeHeight = $(window).scrollTop()-$('#story').offset().top-350 < 0 ? 0 : ($(window).scrollTop()-$('#story').offset().top-350 > $('.story-container').height()-100 ? 'calc(100% -100px)' : $(window).scrollTop()-$('#story').offset().top-350);
            $('#story-timeline').height(timeHeight);
            $('section').each(function(){
                var $this = $(this);
                $this.children('.spacer').css({'width': $(window).width(), 'min-height': $(window).height()-50});
            });
            if (window.location.hash) {
                $(window).scrollTo(window.location.hash, 0, {offset: {top:-53}});
            }
            $('.open-directions').click(function(){
                $(this).closest('.row').find('.panel-container').slideToggle();
            });
            $('.print-directions').click(function(){
                var printCss = {
                    styleToAdd:'position:static;width:100%;height:auto;color:black !important;display:block;',
                };
                var target = $(this).closest('.row').find('.panel-container');
                target.printElement({"printMode": 'popup', 'printBodyOptions': printCss});
            });
            $('.event-img-container').click(function(){
                $('#'+$(this).data('target')).slideToggle();
                $("html, body").animate({scrollTop: $(this).offset().top});
            });
            $('.portrait').each(function(){
               $(this).css({'width': $(this).parent().width()});
            });
            var clone;
            $('.portrait').click(function(){
                var img = $(this).find('img');
                var port = $(this);
                if (port.hasClass('open')) {
                    img.css('width', 'auto');
                    if ($(window).width() < 768)
                        img.css('max-width', $(window).width() < 400 ? port.parent().width() : 400);
                    else
                        img.css('max-width', port.parent().width());
                    port.toggleClass('open');
                    port.animate({'top': img.data('topWas'), 'left': img.data('leftWas'), 'bottom': img.data('topWas')+img.height(), 'right': img.data('leftWas')+img.width(), 'width': img.width(), 'height': img.width()}, 500, function(){
                        $('body').removeClass('stop-scrolling');
                        img.css({'width': '', 'height': '', 'max-width': ''});
                        port.css({'width': '', 'height': '', 'position': '', 'left': '', 'top': '', 'right': '', 'bottom': '', 'margin': '0 auto', 'max-width': '', 'z-index': ''});
                        clone.remove();
                    });
                } else {
                    $('body').addClass('stop-scrolling');
                    img.data('topWas', img.offset().top - $(window).scrollTop());
                    img.data('leftWas', img.offset().left - $(window).scrollLeft());
                    clone = port.clone();
                    port.css({'position': 'fixed', 'height': img.height(), 'top': img.data('topWas'), 'bottom': img.data('topWas')+img.outerHeight(), 'left': img.data('leftWas'), 'margin': 0, 'z-index': 200, 'max-width': ($(window).width() < 768) ? 400 : '100%'});
                    port.after(clone);
                    port.animate({'top': ($(window).height()-port.height())/2, 'left': ($(window).width()-port.width())/2, 'bottom': ($(window).height()-port.height())/2, 'right': ($(window).width()-port.width())/2}, 500, function(){
                        port.css({'width': 'auto', 'height': 'auto'});
                        port.animate({'top': 0, 'left': 0, 'bottom': 0, 'right': 0, 'max-width': '100%'}, 500);
                        port.toggleClass('open');
                        img.animate({'width': 300, 'height': 'auto'});
                    });
                }
            });
            $('.story-proposal .proposal-container').click(function(){
                $(this).toggleClass('open');
                if ($(this).hasClass('open')) {
                    $('body').addClass('stop-scrolling');
                } else {
                    $(this).scrollTop(0);
                    $('body').removeClass('stop-scrolling');
                }
            });
            $k = skrollr.init({
                forceHeight: false,
                mobileCheck: function() {
                //hack - forces mobile version to be off
                    return false;
                },
                smoothScrolling: false
            });
            setInterval(function(){
                $k.refresh();
            }, 1000);
        });
        $('section').each(function(){
            var id = $(this).attr('id');
            offsets[id] = [$(this).offset().top, $(this).outerHeight()];
        });
    }
    
    Pace.once('done', exec);
    
    var geocoder;
    var directions;
    var omniReset, resetMdGm, mdpc, mdpcDir, mdpcCenter, gm2, gm2Dir, gm2Center, omni, omniCenter;
    var mapOptions;
    function MDPC() {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': '11612 Memorial Dr, Houston, TX 77024'
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var mdpcLoc = results[0].geometry.location;
                mapOptions.center = mdpcLoc;
                
                mdpc = new google.maps.Map(document.getElementById("mdpc-map"), mapOptions);
                mdpcText = document.getElementById("mdpc-panel");
    
                var marker = new google.maps.Marker({
                    map: mdpc,
                    position: mdpcLoc
                });
                
                geocoder.geocode({
                    'address': '4 Riverway, Houston, TX 77056'
                }, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var omniLoc = results[0].geometry.location;
                        mdpcDir = new google.maps.DirectionsRenderer();
                        mdpcDir.setMap(mdpc);
                        mdpcDir.setPanel(mdpcText);
                        var request = {
                            origin: omniLoc,
                            destination: mdpcLoc,
                            travelMode: google.maps.TravelMode.DRIVING
                        }
                        directions.route(request, function(result, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                mdpcDir.setDirections(result);
                            }
                        })
                    }
                });
                
                GM2(mdpcLoc);
            }
        });
    }
    function GM2(mdpcLoc) {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': '339 W 19th St, Houston, TX 77008'
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var gm2Loc = results[0].geometry.location;
                mapOptions.center = gm2Loc;
                
                gm2 = new google.maps.Map(document.getElementById("gm2-map"), mapOptions);
                gm2Text = document.getElementById("gm2-panel");
    
                var marker = new google.maps.Marker({
                    map: gm2,
                    position: gm2Loc
                });
                
                gm2Dir = new google.maps.DirectionsRenderer();
                gm2Dir.setMap(gm2);
                gm2Dir.setPanel(gm2Text);
                var request = {
                    origin: mdpcLoc,
                    destination: gm2Loc,
                    travelMode: google.maps.TravelMode.DRIVING
                }
                directions.route(request, function(result, status) {
                    if (status == google.maps.DirectionsStatus.OK) {
                        gm2Dir.setDirections(result);
                    }
                });
                
                google.maps.event.addDomListener(mdpc, "idle", function() {
                    mdpcCenter = mdpc.getCenter();
                });
                
                google.maps.event.addDomListener(gm2, "idle", function() {
                    gm2Center = mdpc.getCenter();
                });
                
                resetMdGm = function() {
                    mdpc.setCenter(mdpcCenter);
                    mdpcDir.setDirections(mdpcDir.getDirections());
                    mdpcDir.setPanel(mdpcDir.getPanel());
                    gm2.setCenter(gm2Center);
                    gm2Dir.setDirections(gm2Dir.getDirections());
                    gm2Dir.setPanel(gm2Dir.getPanel());
                }
                google.maps.event.addDomListener(window, 'resize', resetMdGm);
                $(window).click(function(){
                    if(window.dispatchEvent) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("resize", false, true);
                        window.dispatchEvent(evt);
                    } else {
                        window.fireEvent("onresize");
                    }
                });
            }
        });
    }
    function Omni() {
        geocoder = new google.maps.Geocoder();
        geocoder.geocode({
            'address': 'Four Riverway, Houston, TX 77056'
        }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var omniLoc = results[0].geometry.location;
                mapOptions.center = omniLoc;
                omni = new google.maps.Map(document.getElementById("omni-map"), mapOptions);
    
                var marker = new google.maps.Marker({
                    map: omni,
                    position: omniLoc
                });
                
                google.maps.event.addDomListener(omni, "idle", function() {
                    omniCenter = omni.getCenter();
                });
                
                omniReset = function() {
                    omni.setCenter(omniCenter);
                }
                google.maps.event.addDomListener(window, 'resize', omniReset);
                $(window).click(function(){
                    if(window.dispatchEvent) {
                        var evt = document.createEvent("HTMLEvents");
                        evt.initEvent("resize", false, true);
                        window.dispatchEvent(evt);
                    } else {
                        window.fireEvent("onresize");
                    }
                });
            }
        });
    }
    
    window.mapsInit = function() {
        mapOptions = {
            zoom: 12,
            center: '',
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            scrollwheel: false,
            draggable: false, 
            panControl: false, 
        };
        directions = new google.maps.DirectionsService();
        MDPC();
        Omni();
    }
    
    function loadScript() {
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js' +
          '?callback=mapsInit&key=AIzaSyCNX75nEnFyvoR5IZyThMDzyRocMo-FU6M';
      document.body.appendChild(script);
    }
    
    $(window).load(function() {
        setTimeout(function() {
            if (!$('body').hasClass('pace-over')) exec();
            if(window.dispatchEvent) {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("resize", false, true);
                window.dispatchEvent(evt);
            } else {
                window.fireEvent("onresize");
            }
        }, 100);
        
        loadScript();
    });
    
    $(window).resize(function(){
        $(".navbar-collapse").css({ maxHeight: $(window).height() - $(".navbar-header").height() + "px" });
        $('.portrait').each(function(){
            if (!$(this).hasClass('open')) {
                $(this).css({'width': $(this).parent().width()});
            }
        });
        $('#galleryCar').css('height', ($(window).height()*(2/3))-50);
        if ($(window).width() >= 1200 || galState) $('#galleryCar').show(); else $('#galleryCar').hide();
        $('section > .container').css({'min-height': ''});
        $('section').each(function(){
            var $this = $(this);
            $this.children('.spacer').css({'width': $(window).width(), 'min-height': $(window).height()-50});
        });
        $.each(offsets, function(name, val){
            if (lastScroll < val[0]) return;
            if (lastScroll > val[0]+val[1]) return;
            var currPercent = (lastScroll-val[0])/val[1];
            $(window).scrollTop($('#'+name).outerHeight()*currPercent+$('#'+name).offset().top);
        });
        $('section').each(function(){
            var id = $(this).attr('id');
            offsets[id] = [$(this).offset().top, $(this).outerHeight()];
        });
        lastScroll = $(window).scrollTop();
        $k.refresh();
    });
    

})(jQuery);