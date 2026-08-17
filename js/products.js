
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortPrice = document.getElementById("sortPrice");
const productGrid = document.querySelector(".product-grid");
const cartCount = document.getElementById("cart-count");

let cart =
    JSON.parse(localStorage.getItem("digimartCart")) || [];

function updateCartCount() {

    let count = 0;

    cart.forEach(product => {

        count += product.quantity || 1;

    });

    if (cartCount) {
        cartCount.textContent = count;
    }

}

function getProducts() {

    return Array.from(
        document.querySelectorAll(".product-card")
    );

}

function addToCart(card) {

    const product = {

        name:
            card.querySelector("h3")
                .textContent
                .trim(),

        brand:
            card.querySelector("p")
                .textContent
                .trim(),

        price:
            card.querySelector("h4")
                .textContent
                .trim(),

        image:
            card.querySelector("img").src,

        category:
            card.dataset.category,

        priceValue:
            Number(card.dataset.price),

        quantity: 1

    };


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

function setupCartButtons() {

    const buttons =
        document.querySelectorAll(".cart-btn");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const card =
                    this.closest(".product-card");

                addToCart(card);

            }
        );

    });

}

function setupViewButtons() {

    const buttons =
        document.querySelectorAll(".view-btn");


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const card =
                    this.closest(".product-card");


                const name =
                    card.querySelector("h3")
                        .textContent
                        .trim();


                window.location.href =
                    "product-details.html?product=" +
                    encodeURIComponent(name);

            }
        );

    });

}

function filterProducts() {

    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const category =
        categoryFilter.value;


    const products =
        getProducts();


    products.forEach(card => {

        const name =
            card.querySelector("h3")
                .textContent
                .toLowerCase();


        const brand =
            card.querySelector("p")
                .textContent
                .toLowerCase();


        const productCategory =
            card.dataset.category;


        const matchesSearch =
            name.includes(searchText) ||
            brand.includes(searchText);


        const matchesCategory =
            category === "all" ||
            productCategory === category;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });

}

function loadURLFilters() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    const search =
        params.get("search");


    const category =
        params.get("category");

    if (search) {

        searchInput.value =
            search;

    }

    if (category) {

        const option =
            categoryFilter.querySelector(
                `option[value="${category}"]`
            );


        if (option) {

            categoryFilter.value =
                category;

        }

    }

    filterProducts();

}

searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);

sortPrice.addEventListener(
    "change",
    function () {

        const products =
            getProducts();


        if (this.value === "low-high") {

            products.sort(
                (a, b) =>
                    Number(a.dataset.price) -
                    Number(b.dataset.price)
            );

        }


        else if (this.value === "high-low") {

            products.sort(
                (a, b) =>
                    Number(b.dataset.price) -
                    Number(a.dataset.price)
            );

        }


        else {

            location.reload();

            return;

        }


        products.forEach(product => {

            productGrid.appendChild(product);

        });


        filterProducts();

    }
);

setupCartButtons();

setupViewButtons();

loadURLFilters();

updateCartCount();