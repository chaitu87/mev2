$(function() {
    $('#sidebar').scotchPanel({
        containerSelector: 'body',
        direction: 'right',
        duration: 300,
        transition: 'ease',
        clickSelector: '.btn-toggle',
        distanceX: '70%',
        enableEscapeKey: true
    });
});