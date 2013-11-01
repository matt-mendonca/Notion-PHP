$.noConflict();
(function($){
    window.appJS = window.appJS || {};

    appJS.main = function() {
        var init = function() {
            console.log('app js init');
        };

        return {
            init: init
        }
    }();

    $(document).ready(function() {
        appJS.main.init();
    });
})(jQuery);