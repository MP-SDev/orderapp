function renderMenu() {
    let menuSectionsRef = document.getElementById('menuSections');
    let categorySelected = "";
    let categoryName = "";
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        if (dishes[dishesIndex].category != categorySelected) {
            categorySelected = dishes[dishesIndex].category;
            categoryName = changeFirstLetterToUpperCase(dishes[dishesIndex].category);
            menuSectionsRef.innerHTML += getMenuSectionsTemplate(dishes[dishesIndex].category, categoryName);
            }
        renderSectionMenu(dishes[dishesIndex].category, dishes[dishesIndex].name, dishes[dishesIndex].desc, dishes[dishesIndex].price, dishes[dishesIndex].img, dishesIndex, dishes[dishesIndex].amount);
        
        }
}

function renderSectionMenu(category, name, desc, price, img, dishesIndex) {
    let sectionMenuRef = document.getElementById(category);
    let priceString = roundFloatNumberIntoString(price, 2);
    sectionMenuRef.innerHTML += getSectionMenuTemplate(name, desc, priceString, img, dishesIndex);
}

function renderBasket() {
    let basketRef = document.getElementById('basketContainer');
    let basketIsEmpty = true;
    let sumPrice = 0;
    let totalPrice = 0;
    let sumPriceString = "";
    let totalPriceString = "";
    basketRef.innerHTML = getFilledBasketTemplate();
    let basketMenuListRef = document.getElementById('basketMenuList');
    let basketSumRef = document.getElementById('basketSum');
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        if (dishes[dishesIndex].amount != 0) {
            let subtractIcon = "-";
            if (dishes[dishesIndex].amount == 1) {
                subtractIcon = '<img src="./assets/icons/trash.png" alt="icon delete menu element">';
            }
            let priceString = roundFloatNumberIntoString(dishes[dishesIndex].price, 2);
            basketMenuListRef.innerHTML += getFilledBasketMenuListTemplate(dishes[dishesIndex].amount, dishes[dishesIndex].name, priceString, dishesIndex, subtractIcon);
            basketIsEmpty = false;
            sumPrice = (sumPrice + dishes[dishesIndex].amount * dishes[dishesIndex].price);
            sumPriceString = roundFloatNumberIntoString(sumPrice, 2);
        }
    }
    if (basketIsEmpty === false) {
        totalPrice = sumPrice + 4.99;
        totalPriceString = roundFloatNumberIntoString(totalPrice, 2);
        basketSumRef.innerHTML = getFilledBasketSumTemplate(sumPriceString, totalPriceString);
        
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
    orderConfirmationModalRef.style.display = "none";
}

function resetBasket() {
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        dishes[dishesIndex].amount = 0;
        changeButtonToNotAdded(dishesIndex);
    }
    renderBasket();
}

function changeButtonToAdded(dishesIndex) {
    btnSectionMenuRef = document.getElementById('btnSectionMenu' + dishesIndex);
    if (dishes[dishesIndex].amount != 0) {
        btnSectionMenuRef.innerHTML = "Added" + " " + dishes[dishesIndex].amount;
        btnSectionMenuRef.style.color = "#E76C1F";
    } else {
        changeButtonToNotAdded(dishesIndex);
    }
}

function changeButtonToNotAdded(dishesIndex) {
    btnSectionMenuRef = document.getElementById('btnSectionMenu' + dishesIndex);
    btnSectionMenuRef.innerHTML = "Add to basket";
    btnSectionMenuRef.style.color = "#363534";
}

function showBasketMobileView() {
    let basketContainerRef = document.getElementById('basketContainer');
    basketContainerRef.style.display = "flex";
}

function hideBasketMobileView() {
    let basketContainerRef = document.getElementById('basketContainer');
    basketContainerRef.style.display = "none";
}