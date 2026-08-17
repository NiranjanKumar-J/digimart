
const products = {

    "iPhone 16": {
        brand: "Apple",
        price: 79999,
        rating: "⭐⭐⭐⭐⭐",
        image: "images/mobiles/iphone16.png",
        description:
            "iPhone 16 delivers powerful performance, an advanced camera system and a premium design for an excellent smartphone experience."
    },

    "MacBook Air M4": {
        brand: "Apple",
        price: 109999,
        rating: "⭐⭐⭐⭐⭐",
        image: "images/laptops/macbook.png",
        description:
            "MacBook Air with M4 delivers excellent performance, long battery life and a lightweight premium design."
    },

    "Sony WH-1000XM5": {
        brand: "Sony",
        price: 24999,
        rating: "⭐⭐⭐⭐☆",
        image: "images/headphones/sony.png",
        description:
            "Sony WH-1000XM5 provides premium noise cancellation, high-quality audio and comfortable wireless listening."
    },

    "Galaxy Watch 8": {
        brand: "Samsung",
        price: 29999,
        rating: "⭐⭐⭐⭐⭐",
        image: "images/watch/watch.png",
        description:
            "Galaxy Watch 8 combines smart features, health tracking and a stylish design for everyday use."
    },

    "OnePlus 13": {
        brand: "OnePlus",
        price: 44999,
        rating: "⭐⭐⭐⭐⭐",
        image: "images/mobiles/oneplus13.png",
        description:
            "OnePlus 13 offers powerful performance, a premium display and an advanced camera experience."
    },

    "iQOO Neo": {
        brand: "iQOO",
        price: 32999,
        rating: "⭐⭐⭐⭐☆",
        image: "images/mobiles/iqoo.png",
        description:
            "iQOO Neo is designed for powerful performance and smooth gaming with a high-performance processor."
    },

    "ASUS ROG": {
        brand: "ASUS",
        price: 75999,
        rating: "⭐⭐⭐⭐⭐",
        image: "images/laptops/asus.png",
        description:
            "ASUS ROG provides powerful gaming performance with a high-quality display and advanced hardware."
    },

    "PlayStation 5": {
        brand: "Sony",
        price: 54999,
        rating: "⭐⭐⭐⭐⭐",
        image: "images/gaming/ps5.png",
        description:
            "PlayStation 5 delivers immersive gaming with fast loading, high-quality graphics and next-generation performance."
    }

};

const params =
    new URLSearchParams(window.location.search);

const productName =
    params.get("product");

const productImage =
    document.getElementById("productImage");

const productBrand =
    document.getElementById("productBrand");

const productTitle =
    document.getElementById("productName");

const productPrice =
    document.getElementById("productPrice");

const productRating =
    document.getElementById("productRating");

const productDescription =
    document.getElementById("productDescription");

const quantityElement =
    document.getElementById("quantity");

const cartCount =
    document.getElementById("cart-count");

const addCartBtn =
    document.getElementById("addCartBtn");

const buyBtn =
    document.getElementById("buyBtn");

let quantity = 1;


document.getElementById("plusBtn")
    .addEventListener("click", function () {

        quantity++;

        quantityElement.textContent =
            quantity;

    });


document.getElementById("minusBtn")
    .addEventListener("click", function () {

        if (quantity > 1) {

            quantity--;

        }

        quantityElement.textContent =
            quantity;

    });

const product =
    products[productName];


if (product) {

    productImage.src =
        product.image;

    productImage.alt =
        productName;

    productBrand.textContent =
        product.brand;

    productTitle.textContent =
        productName;

    productPrice.textContent =
        "₹" + product.price.toLocaleString("en-IN");

    productRating.textContent =
        product.rating;

    productDescription.textContent =
        product.description;

}
else {

    productTitle.textContent =
        "Product Not Found";

    productDescription.textContent =
        "Sorry, this product could not be found.";

    addCartBtn.disabled = true;

    buyBtn.disabled = true;

}

let cart =
    JSON.parse(
        localStorage.getItem("digimartCart")
    ) || [];

function updateCartCount() {

    let count = 0;

    cart.forEach(item => {

        count += item.quantity || 1;

    });

    cartCount.textContent =
        count;

}

updateCartCount();

addCartBtn.addEventListener(
    "click",
    function () {

        if (!product) {
            return;
        }


        const cartProduct = {

            name: productName,

            brand: product.brand,

            price:
                "₹" +
                product.price.toLocaleString("en-IN"),

            priceValue:
                product.price,

            image:
                product.image,

            quantity:
                quantity

        };

        const existing =
            cart.find(
                item =>
                    item.name === productName
            );


        if (existing) {

            existing.quantity =
                (existing.quantity || 1)
                + quantity;

        }
        else {

            cart.push(cartProduct);

        }

        localStorage.setItem(
            "digimartCart",
            JSON.stringify(cart)
        );


        updateCartCount();


        alert(
            productName +
            " added to cart!"
        );

    }
);

buyBtn.addEventListener(
    "click",
    function () {

        if (!product) {
            return;
        }


        const cartProduct = {

            name: productName,

            brand: product.brand,

            price:
                "₹" +
                product.price.toLocaleString("en-IN"),

            priceValue:
                product.price,

            image:
                product.image,

            quantity:
                quantity

        };


        localStorage.setItem(
            "digimartCart",
            JSON.stringify([
                cartProduct
            ])
        );


        window.location.href =
            "cart.html";

    }
);