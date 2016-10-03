/**
 * Created by hotovec on 3.10.2016.
 */



    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
    if (window.addEventListener) // older FF
        window.addEventListener('DOMMouseScroll', preventDefault, false);
    window.onwheel = preventDefault; // modern standard
    window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
    window.ontouchmove = preventDefault; // mobile
    document.onkeydown = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

$(function () {

    var clickOrTouch = 'ontouchstart' in window ? 'touchend' : 'click';

    $('.btn_hamburger').on(clickOrTouch, function () {
        $('.offcanvas').toggleClass('off-canvas-open');

        if ($('.offcanvas').hasClass('off-canvas-open')) {
            disableScroll();
        } else {
            enableScroll();
        }
        return false;
    });

    var $viewport = $('.viewport');

    var myScroll = new IScroll('.viewport', {
        mouseWheel: true,
        momentum: true,
        scrollbars: false,
        snap: false,
        click: true
    });

    updateNav();

    $(window).on('resize', updateNav);

    // function to update iScroll
    function updateNav() {
        //console.log('nav_height: ' + $nav.height());
        $viewport.height(window.innerHeight - 160);
        myScroll.refresh();
    }
});
