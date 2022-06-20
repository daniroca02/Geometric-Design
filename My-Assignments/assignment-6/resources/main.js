'use strict'

function changeLogo(logoType) {
    const newUrl = `assets/logo-${logoType}.png`;
    const logoWrapper = document.getElementsByClassName('logo-wrapper')[0];
    logoWrapper.style.backgroundImage = `url(${newUrl})`;
};

addEventListener('DOMContentLoaded', function () {
    const menuItems = document.getElementsByClassName('menu-item');

    for (let i = 0; i < menuItems.length; ++i) {
        const menuItem = menuItems[i];

        menuItem.addEventListener('click', function () {
            for (let j = 0; j < menuItems.length; ++j) {
                menuItems[j].classList.remove('selected');
            }

            this.classList.add('selected');

            const dataContent = this.dataset.content;
            const contentElements = document.getElementsByClassName('content');
            for (let k = 0; k < contentElements.length; ++k) {
                contentElements[k].classList.add('hidden');
            }


            if (dataContent === 'your-orders-wrapper') {
                document.getElementById('nav-bar').classList.add('hidden');
            }
            else {
                document.getElementById('nav-bar').classList.remove('hidden');
            }

            changeLogo(this.dataset.logo);

            document.getElementsByClassName(dataContent)[0].classList.remove('hidden');
        });
    }

    const orderDetails = document.getElementById('ordDetBtn');
    orderDetails.addEventListener('click', function () {
        const dataContent = this.dataset.content;
        const contentElements = document.getElementsByClassName('content');
        for (let i = 0; i < contentElements.length; ++i) {
            contentElements[i].classList.add('hidden');
        }

        document.getElementsByClassName(dataContent)[0].classList.remove('hidden');
    });
});