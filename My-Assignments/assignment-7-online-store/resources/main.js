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
    
        const overlayHTML = function (productObj) {
            return `<div class="overlay-content-wrapper">
                <div class="image-wrapper"></div>
                <section>
                <div class="title-and-price-wrapper">
                    <h1>${productObj.series}</h1>
                    <div class="price">${productObj.currency + productObj.price}</div>
                </div>
                <p>${productObj.description}</p>
                <div class="details-wrapper">
                    <div>
                        <h2>Series:</h2>
                        <h3>${productObj.series}</h3>
                    </div>
                    <div>
                        <h2>Designer:</h2>
                        <h3>${productObj.designer}</h3>
                    </div>
                    <div>
                        <h2>SKU:</h2>
                        <h3>${productObj.sku}</h3>
                    </div>
                    <div>
                        <h2>Colour:</h2>
                        <h3>${productObj.colour}</h3>
                    </div>
                    <div>
                        <h2>Material:</h2>
                        <h3>${productObj.material}</h3>
                    </div>
                    <div>
                        <h2>Height:</h2>
                        <h3>${productObj.height + productObj.unit}</h3>
                    </div>
                </div>
                <div class="quantity-wrapper">
                    <i class="less"></i>
                    <div class="value">1</div>
                    <i class="more"></i>
                </div>
                <button>Add To Cart</button>
            </section>
        </div>
        `
        };

    const getProdArray = function (arrayIdx) {
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
            let prodOverlayHTML = overlayHTML(productObj);
            // add HTML overlay content
            $('.overlay-content-wrapper').html(prodOverlayHTML);

            let imageWrapper = $('.overlay .image-wrapper');
            imageWrapper.css({ backgroundImage: imageURL });

            $('.less').click(function () {
                quantityAdd(-1);
            });
            $('.more').click(function () {
                quantityAdd(1);
            });

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