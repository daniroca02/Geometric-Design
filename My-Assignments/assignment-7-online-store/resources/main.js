$(function () {
    const getProductHTML = function (productObj, productArrayName) {
        return `<div class="product-wrapper" data-id="${productObj.id}">
        <div class="product-image-wrapper" style="background-image: url("assets/${productArrayName}/${productObj.imgUrl}")"></div>
        <div class="series-and-price-wrapper">
            <div class="series">${productObj.series}</div>
            <div class="price">${productObj.currency + productObj.price}</div>
        </div>
    </div>
    `;
    };

    // const stringToArray = function(string) {

    // };

    // const showProductArray = function (contentELement) {
    //     for (let i = 0; i < productArray.length; ++i) {
    //         let productObj = productArray[i],
    //             productArrayName = $(contentELement).data('array'),
    //             productHTML = getProductHTML(productObj, productArrayName);
    //         $(contentELement).append(productHTML);
    //     }
    // };

    // const menuItems = $('.menu-item');
    // for (let i = 0; i < menuItems.length; ++i) {
    //     let dataContent = '.' + $(this).data('content');
    //     // productArray = $(dataContent).data('array');
    //     showProductArray(dataContent);
    // }

    menuItems.click(function () {
        menuItems.removeClass('selected');
        $(this).addClass('selected');

        const dataContent = '.' + $(this).data('content');
        $('.content').addClass('hidden');
        $(dataContent).removeClass('hidden');
    });

});