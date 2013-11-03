$.noConflict();
(function($){
    window.appJS = window.appJS || {};

    appJS.main = function() {
        var init = function() {
             $(document).pjax('.pjax-link', '#pjax-container');
        };

        return {
            init: init
        }
    }();

    $(document).ready(function() {
        appJS.main.init();
    });
})(jQuery);