function renderMenu() {
    let menuSectionsRef = document.getElementById('menuSections');
    let categorySelected = "";
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        if (dishes[dishesIndex].category != categorySelected) {
            categorySelected = dishes[dishesIndex].category;
            menuSectionsRef.innerHTML += getMenuSectionsTemplate(dishes[dishesIndex].category, dishes[dishesIndex].img);
            }
        renderSectionMenu(dishes[dishesIndex].category, dishes[dishesIndex].name, dishes[dishesIndex].desc, dishes[dishesIndex].price, dishes[dishesIndex].img, dishesIndex);
        
        }
}

function renderSectionMenu(category, name, desc, price, img, dishesIndex) {
    let sectionMenuRef = document.getElementById(category);
    sectionMenuRef.innerHTML += getSectionMenuTemplate(name, desc, price, img, dishesIndex);
}

function renderBasket() {
    let basketRef = document.getElementById('basketContainer');
    let basketIsEmpty = true;
    let sumPrice = 0;
    basketRef.innerHTML = getFilledBasketTemplate();
    let basketMenuListRef = document.getElementById('basketMenuList');
    let basketSumRef = document.getElementById('basketSum');
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        if (dishes[dishesIndex].amount != 0) {
            basketMenuListRef.innerHTML += getFilledBasketMenuListTemplate(dishes[dishesIndex].amount, dishes[dishesIndex].name, dishes[dishesIndex].price, dishesIndex);
            basketIsEmpty = false;
            sumPrice = Math.round((sumPrice + dishes[dishesIndex].amount * dishes[dishesIndex].price)*100)/100;
        }
    }
    if (basketIsEmpty === false) {
        let totalPrice = Math.round((sumPrice + 4.99)*100)/100;
        basketSumRef.innerHTML = getFilledBasketSumTemplate(sumPrice, totalPrice);
        
    } else {
        basketRef.innerHTML = getEmptyBasketTemplate();
    }
}

function addMenu(dishesIndex) {
    dishes[dishesIndex].amount = dishes[dishesIndex].amount + 1;
    renderBasket();
}

function subtractMenu(dishesIndex) {
    dishes[dishesIndex].amount = dishes[dishesIndex].amount - 1;
    renderBasket();
}

function placeOrder() {
    let orderConfirmationModalRef = document.getElementById('orderConfirmationModal');
    resetBasket();
    orderConfirmationModalRef.style.display = "flex";
    setTimeout(function(){
        orderConfirmationModalRef.style.display = "none"
        }, 4000);
    window.onclick = function(event) {
        if (event.target == orderConfirmationModalRef) {
            orderConfirmationModalRef.style.display = "none";
        }
    }
}

function closeModal() {
    let orderConfirmationModalRef = document.getElementById('orderConfirmationModal');
    orderConfirmationModalRef.style.display = "none"
}

function resetBasket() {
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        dishes[dishesIndex].amount = 0;
    }
    renderBasket();
}