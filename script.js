function renderMenu() {
    let menuSectionsRef = document.getElementById('menuSections');
    let categorySelected = "";
    for (let dishesIndex = 0; dishesIndex < dishes.length; dishesIndex++) {
        if (dishes[dishesIndex].category != categorySelected) {
            categorySelected = dishes[dishesIndex].category;
            menuSectionsRef.innerHTML += getMenuSectionsTemplate(dishes[dishesIndex].category, dishes[dishesIndex].img);
            }
        renderSectionMenu(dishes[dishesIndex].category, dishes[dishesIndex].name, dishes[dishesIndex].desc, dishes[dishesIndex].price, dishes[dishesIndex].img);
        
        }
}

function renderSectionMenu(category, name, desc, price, img) {
    let sectionMenuRef = document.getElementById(category);
    sectionMenuRef.innerHTML += getSectionMenuTemplate(name, desc, price, img);
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
            basketMenuListRef.innerHTML += getFilledBasketMenuListTemplate(dishes[dishesIndex].amount, dishes[dishesIndex].name, dishes[dishesIndex].price);
            basketIsEmpty = false;
            sumPrice = sumPrice + dishes[dishesIndex].amount * dishes[dishesIndex].price;
        }
    }
    if (basketIsEmpty === false) {
        let totalPrice = Math.round((sumPrice + 4.99)*100)/100;
        basketSumRef.innerHTML = getFilledBasketSumTemplate(sumPrice, totalPrice);
        
    } else {
        basketRef.innerHTML = getEmptyBasketTemplate();
    }
    
}