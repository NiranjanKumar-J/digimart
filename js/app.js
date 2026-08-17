// ========================================
// DigiMart Home Page
// ========================================

const searchBox = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");
const cartCount = document.getElementById("cart-count");


// ========================================
// CART COUNT
// ========================================

function updateCartCount() {

    const cart =
        JSON.parse(
            localStorage.getItem("digimartCart")
        ) || [];

    let count = 0;

    cart.forEach(product => {
        count += product.quantity || 1;
    });

    if (cartCount) {
        cartCount.textContent = count;
    }

}

updateCartCount();


// ========================================
// HOME SEARCH
// ========================================

function searchProducts() {

    const searchText =
        searchBox.value.trim();

    if (searchText === "") {

        alert("Please enter a product name.");

        searchBox.focus();

        return;

    }


    window.location.href =
        "products.html?search=" +
        encodeURIComponent(searchText);

}


// Search button

if (searchButton) {

    searchButton.addEventListener(
        "click",
        searchProducts
    );

}


// Press Enter

if (searchBox) {

    searchBox.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Enter") {

                searchProducts();

            }

        }
    );

}


// ========================================
// SHOP NOW
// ========================================

const shopButton =
    document.querySelector(".shop-btn");


if (shopButton) {

    shopButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            window.location.href =
                "products.html";

        }
    );

}


// ========================================
// CATEGORY CLICK
// ========================================

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach(card => {

    card.addEventListener(
        "click",
        function () {

            const categoryName =
                card.querySelector("h3")
                    .textContent
                    .trim();


            const categoryMap = {

                "Mobiles": "mobile",

                "Laptops": "laptop",

                "Headphones": "audio",

                "Smart TVs": "tv",

                "Smart Watches": "watch",

                "Keyboards": "keyboard",

                "Mouse": "mouse",

                "Cameras": "camera",

                "Gaming": "gaming",

                "Printers": "printer",

                "Networking": "networking",

                "Accessories": "accessories"

            };


            const category =
                categoryMap[categoryName];


            if (category) {

                window.location.href =
                    "products.html?category=" +
                    encodeURIComponent(category);

            }

        }
    );

});


// ========================================
// FEATURED PRODUCTS
// ========================================

const featuredCards =
    document.querySelectorAll(
        ".featured .product-card"
    );


featuredCards.forEach(card => {

    // View Details

    const viewButton =
        card.querySelector(".view-btn");


    if (viewButton) {

        viewButton.addEventListener(
            "click",
            function () {

                const name =
                    card.querySelector("h3")
                        .textContent
                        .trim();


                window.location.href =
                    "product-details.html?product=" +
                    encodeURIComponent(name);

            }
        );

    }


    // Add to Cart

    const cartButton =
        card.querySelector(".cart-btn");


    if (cartButton) {

        cartButton.addEventListener(
            "click",
            function () {

                const product = {

                    name:
                        card.querySelector("h3")
                            .textContent
                            .trim(),

                    brand:
                        card.querySelector(".brand")
                            .textContent
                            .trim(),

                    price:
                        card.querySelector("h4")
                            .textContent
                            .trim(),

                    image:
                        card.querySelector("img").src,

                    quantity: 1

                };


                let cart =
                    JSON.parse(
                        localStorage.getItem(
                            "digimartCart"
                        )
                    ) || [];


                cart.push(product);


                localStorage.setItem(
                    "digimartCart",
                    JSON.stringify(cart)
                );


                updateCartCount();


                alert(
                    product.name +
                    " added to cart!"
                );

            }
        );

    }

});