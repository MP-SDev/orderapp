function getMenuSectionsTemplate(category) {
    return `
            <section>
                    <div class="sectionOverview content">
                        <img src="assets/img/${category}.png" alt="${category} scetch">
                        <h2>${category}</h2>
                    </div>
                    <div id="${category}" class="menuContainer content">
                        
                    </div>
                </section>
            `
}

function getSectionMenuTemplate(name, desc, price, img) {
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
                                    <button class="btnDishes">Add to basket</button>
                                </div>
                            </div>
                        </div>
            `
}