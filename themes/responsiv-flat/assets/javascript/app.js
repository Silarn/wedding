/*
 * Application
 *
 */

(function($) {

    $(document).tooltip({
        selector: "[data-toggle=tooltip]"
    })

    // Focus state for append/prepend inputs
    $('.input-group').on('focus', '.form-control', function () {
        $(this).closest('.input-group, .form-group').addClass('focus');
    }).on('blur', '.form-control', function () {
        $(this).closest('.input-group, .form-group').removeClass('focus');
    });
    
    $(document).ready(function(){
        $('section').css({'width': $(window).width(), 'height': $(window).height()});
        //$.stellar({'relative': true, 'verticalOffset': 700, ''});
        //$('section').parallax();
        var $k = skrollr.init();
    });
    
    $(window).resize(function(){
        $('section').css({'width': $(window).width(), 'height': $(window).height()});
        $k.refresg();
        //$k = skrollr.init();
    });
    

})(jQuery);