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
    if ($('#articlebody').length > 0) {
        // Only on article edit page
        var simplemde = new SimpleMDE({ element: $("#articlebody")[0] });
    }
});