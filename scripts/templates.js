function getMenuSectionsTemplate(category, categoryName) {
    return `
            <section>
                    <div class="sectionOverview content">
                        <img src="assets/img/${category}.png" alt="${category} scetch">
                        <h2>${categoryName}</h2>
                    </div>
                    <div id="${category}" class="menuContainer content">
                        
                    </div>
                </section>
            `
}

function getSectionMenuTemplate(name, desc, price, img, dishesIndex) {
    return `
            <div class="menu">
                <div class="menuImg">
                    <img src="${img}" alt="${name} picture">
                </div>
                <div class="menuDetailsContainer">
                    <div class="menuDetailsLeft">
                        <h3>${name}</h3>
                        <p>${desc}</p>
                    </div>
                    <div class="menuDetailsRight">
                        <p>${price}€</p>
                        <button id="btnSectionMenu${dishesIndex}" onclick="addMenu(${dishesIndex});changeButtonToAdded(${dishesIndex})" class="btnDishes">Add to basket</button>
                    </div>
                </div>
            </div>
            `
}

function getEmptyBasketTemplate() {
    return `
            <div class="basket">
                <h3>Your Basket</h3>
                <p class="basketText">Nothing here yet. Go ahead and choose something delicious!</p>
                <img src="./assets/img/empty-basket-scetch.png" alt="basket scetch">
            </div>
            `
}

function getFilledBasketTemplate() {
    return `
             <div class="basket">
                <h3>Your Basket</h3>
                <div id="basketMenuList" class="basketMenuList">
                    
                </div>
                <div id="basketSum" class="basketSum">
                    
                </div>
            </div>
            `
}

function getFilledBasketMenuListTemplate(amount, name, price, dishesIndex, subtractIcon) {
    return `
            <div class="basketMenuListElement">
                <p>${amount}x ${name}</p>
                <div class="basketMenuListElementDetails">
                    <div class="basketMenuListElementControls">
                        <button onclick="subtractMenu(${dishesIndex});changeButtonToAdded(${dishesIndex})" class="btnBasketControls">${subtractIcon}</button>
                        <p>${amount}</p>
                        <button onclick="addMenu(${dishesIndex});changeButtonToAdded(${dishesIndex})" class="btnBasketControls">+</button>
                    </div>
                    <p>${price}€</p>
                </div>
            </div>
            `
}

function getFilledBasketSumTemplate(sumPrice, totalPrice) {
    return `
            <div class="basketSumElement">
                <p>Subtotal</p>
                <p>${sumPrice}€</p>
            </div>
            <div class="basketSumElement">
                <p>Delivery fee</p>
                <p>4,99€</p>
            </div>
            <div class="basketSumSeparator"></div>
            <div class="basketSumElement">
                <p>Total</p>
                <p>${totalPrice}€</p>
            </div>
            <button onclick="placeOrder()" class="bntBasket">Buy now (${totalPrice}€)</button>
            `
}