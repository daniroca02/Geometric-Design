$(function () {
    const prodArrayNames = ["vases", "lamps", "glasses", "accessories"];

    const getProductHTML = function (productObj, prodArrayNameIdx) {
        // check if productObj is null
        if (Object.keys(productObj).length !== 0)
            return `<div class="product-wrapper" data-id="${productObj.id}">
        <div class="product-image-wrapper" style='background-image: url(assets/${prodArrayNames[prodArrayNameIdx]}/${productObj.imgUrl})'></div>
        <div class="series-and-price-wrapper">
            <div class="series">${productObj.series}</div>
            <div class="price">${productObj.currency + productObj.price}</div>
        </div>
    </div>
    `;
        return undefined;
    };
    // checked: ai mult continut static aici, il poti avea in markup, iar apoi prin selectii sa updatezi continutul dinamic stric pe elementele necesare in functie de produsul selectat de catre user
    const updateOverlayHTML = function (productObj) {
        $('.overlay .title-and-price-wrapper h1, .overlay .series h3').text(productObj.series);
        $('.overlay .title-and-price-wrapper .price').text(productObj.currency + productObj.price);
        $('.overlay .description').text(productObj.description);
        $('.overlay .designer h3').text(productObj.designer);
        $('.overlay .sku h3').text(productObj.sku);
        $('.overlay .colour h3').text(productObj.colour);
        $('.overlay .material h3').text(productObj.material);
        $('.overlay .height').text(productObj.height + productObj.unit);
        $('.quantity-wrapper .value').text(1);
    };

    const getProdArray = function (arrayIdx) {
        // aceasta categorie ti-o poti trimite direct printr-un data attribute din item-urile din meniul de navigare, sa nu fii nevoie sa faci manual asta, altfel cand ai 10 sau mai multe item-uri devine multa implementare manuala
        // dani: aici chiar nu imi dau seama cum sa preiau un array dintr-un data attribute
        let productArray = undefined;
        switch (arrayIdx) {
            case 0:
                productArray = products.vases;
                break;
            case 1:
                productArray = products.lamps;
                break;
            case 2:
                productArray = products.glasses;
                break;
            case 3:
                productArray = products.accessories;
                break;
            default:
                productArray = products.vases;
        }
        return productArray;
    };

    const showProductArray = function (arrayIdx) {
        let productArray = getProdArray(arrayIdx);

        for (let i = 0; i < productArray.length; ++i) {
            let productObj = productArray[i],
                productHTML = getProductHTML(productObj, arrayIdx);
            $('.content').append(productHTML);
        }
    };

    const quantityAdd = function (number) {
        let valueElem = $('.quantity-wrapper .value');
        let newVal = parseInt(valueElem.text()) + number;
        if (newVal > 0) {
            valueElem.text(newVal);
        }
    };

    const overlay = $('.overlay');
    const addOverlayFunctionality = function (arrayIdx) {
        let productArray = getProdArray(arrayIdx);

        $('.product-image-wrapper').click(function () {
            let id = parseInt($(this).parent().data('id')) - 1;
            let productObj = productArray[id];
            let imageURL = this.style.backgroundImage;
            // add HTML overlay content
            updateOverlayHTML(productObj);

            let imageWrapper = $('.overlay .image-wrapper');
            imageWrapper.css({ backgroundImage: imageURL });

            overlay.fadeIn();
        });

        $('.overlay>div>i').click(function () {
            overlay.fadeOut();
        });

        $(document).on('keydown', function (event) {
            if (event.key == "Escape") {
                overlay.fadeOut();
            }
        });
    };
    
    $('.less').click(function () {
        quantityAdd(-1);
    });
    $('.more').click(function () {
        quantityAdd(1);
    });


    const firstProductArrayIdx = parseInt($('.menu-item.selected').data('arrayidx'));
    showProductArray(firstProductArrayIdx);
    addOverlayFunctionality(firstProductArrayIdx);

    const menuItems = $('.menu-item');
    menuItems.click(function () {
        menuItems.removeClass('selected');
        $(this).addClass('selected');

        let arrayIdx = parseInt($(this).data('arrayidx'));
        $('.content').empty();
        showProductArray(arrayIdx);

        addOverlayFunctionality(arrayIdx);
    });
});