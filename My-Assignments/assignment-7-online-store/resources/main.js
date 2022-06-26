$(function() {
    const menuItems = $('.menu-item');
    menuItems.click(function() {
        menuItems.removeClass('selected');
        $(this).addClass('selected');

        const contentElements = $('.content');
        const dataContent = '.' + $(this).data('content');
        contentElements.addClass('hidden');
        $(dataContent).removeClass('hidden');
    });
});