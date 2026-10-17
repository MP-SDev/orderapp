function init() {
    renderMenu(); 
    renderBasket();
}

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
    let totalPrice = 0;
    let sumPriceString = "";
    let totalPriceString = "";
    basketRef.innerHTML = getFilledBasketTemplate();
    let basketMenuListRef = document.getElementById('basketMenuList');
    let basketSumRef = document.getElementById('basketSum');
    if (basketIsEmpty()) {
        basketRef.innerHTML = getEmptyBasketTemplate();
    } else {
        let sumPrice = renderAllDishesInBasket(basketMenuListRef);
        renderBasketSum(basketSumRef, sumPrice);
    }
    updateBasketIconBadge();
}

function renderAllDishesInBasket(basketMenuListRef) {
    let sumPrice = 0;
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        if (dishes[dishesIndex].amount != 0) {
            let subtractIcon = selectSubtractIcon(dishesIndex);
            let priceString = roundFloatNumberIntoString(dishes[dishesIndex].price, 2);
            basketMenuListRef.innerHTML += getFilledBasketMenuListTemplate(dishes[dishesIndex].amount, dishes[dishesIndex].name, priceString, dishesIndex, subtractIcon);
            if (dishes[dishesIndex].amount == 1) {
                hideBasketDeleteBtn(true, dishesIndex);
            }
            sumPrice = (sumPrice + dishes[dishesIndex].amount * dishes[dishesIndex].price);
        }
    }
    return sumPrice;
}

function renderBasketSum(basketSumRef, sumPrice) {
    sumPriceString = roundFloatNumberIntoString(sumPrice, 2);
    totalPriceString = calculateTotalPrice(sumPrice);
    basketSumRef.innerHTML = getFilledBasketSumTemplate(sumPriceString, totalPriceString);
}

function basketIsEmpty() {
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        if (dishes[dishesIndex].amount != 0) return false;
    }
    return true;
}

function selectSubtractIcon(dishesIndex) {
    let subtractIcon = "-";
    if (dishes[dishesIndex].amount == 1) {
        subtractIcon = '<img src="./assets/icons/trash.png" alt="icon delete menu element">';
    }
    return subtractIcon;
}

function calculateTotalPrice(sumPrice) {
    totalPrice = sumPrice + 4.99;
    totalPriceString = roundFloatNumberIntoString(totalPrice, 2);
    return totalPriceString;
}

function addMenu(dishesIndex, value) {
    dishes[dishesIndex].amount = dishes[dishesIndex].amount + value;
    renderBasket();
}

function hideBasketDeleteBtn(hide, dishesIndex) {
    let basketDeleteBtnRef = document.getElementById('basketDeleteBtn'+dishesIndex);
    if (hide === true) {
        basketDeleteBtnRef.classList.add("hide");
    }
    if (hide === false) {
        basketDeleteBtnRef.classList.remove("hide");
    }
    
}

function placeOrder() {
    let orderConfirmationModalRef = document.getElementById('orderConfirmationModal');
    resetBasket();
    if (window.matchMedia("(max-width: 800px)").matches) {
        hideBasketMobileView();
    }
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
    let navBarHomeIconImgRef = document.getElementById('navBarHomeIconImg');
    let navBarBasketIconImgRef = document.getElementById('navBarBasketIconImg');
    document.documentElement.style.overflowY = 'hidden';
    basketContainerRef.style.display = "flex";
    navBarHomeIconImgRef.src = './assets/icons/home.png';
    navBarBasketIconImgRef.src = './assets/icons/selectedbasket.png';

}

function hideBasketMobileView() {
    let basketContainerRef = document.getElementById('basketContainer');
    let navBarHomeIconImgRef = document.getElementById('navBarHomeIconImg');
    let navBarBasketIconImgRef = document.getElementById('navBarBasketIconImg');
    document.documentElement.style.overflowY = '';
    basketContainerRef.style.display = "none";
    navBarHomeIconImgRef.src = './assets/icons/selectedhome.png';
    navBarBasketIconImgRef.src = './assets/icons/basket.png';
}

function updateBasketIconBadge(){
    let basketIconBadgeRef = document.getElementById('basketIconBadge');
    let amountSelectedDishes = 0;
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        amountSelectedDishes += dishes[dishesIndex].amount;        
    }
    basketIconBadgeRef.innerHTML = amountSelectedDishes;
}