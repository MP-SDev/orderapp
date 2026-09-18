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