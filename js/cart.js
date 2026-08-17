// ========================================
// DigiMart Cart
// ========================================

let cart =
    JSON.parse(localStorage.getItem("digimartCart")) || [];


const cartItems =
    document.getElementById("cart-items");

const cartCount =
    document.getElementById("cart-count");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const totalElement =
    document.getElementById("total");

const checkoutButton =
    document.getElementById("checkout-btn");


// ========================================
// UPDATE CART COUNT
// ========================================

function updateCartCount() {

    let count = 0;

    cart.forEach(product => {

        count += product.quantity || 1;

    });

    cartCount.textContent = count;

}


// ========================================
// SAVE CART
// ========================================

function saveCart() {

    localStorage.setItem(
        "digimartCart",
        JSON.stringify(cart)
    );

}


// ========================================
// DISPLAY CART
// ========================================

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <i class="fa-solid fa-cart-shopping"></i>

                <h3>Your cart is empty</h3>

                <p>Add some products to continue shopping.</p>

                <a href="products.html">
                    Shop Now
                </a>

            </div>
        `;

        updateSummary();

        return;

    }


    cart.forEach((product, index) => {

        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="item-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.brand}
                </p>

                <strong>
                    ${product.price}
                </strong>

            </div>


            <div class="quantity">

                <button
                    class="minus-btn"
                    data-index="${index}">
                    -
                </button>

                <span>
                    ${product.quantity || 1}
                </span>

                <button
                    class="plus-btn"
                    data-index="${index}">
                    +
                </button>

            </div>


            <div class="item-total">

                ₹${(
                    product.priceValue *
                    (product.quantity || 1)
                ).toLocaleString("en-IN")}

            </div>


            <button
                class="remove-btn"
                data-index="${index}">

                <i class="fa-solid fa-trash"></i>

            </button>

        `;


        cartItems.appendChild(item);

    });


    setupQuantityButtons();

    setupRemoveButtons();

    updateSummary();

}


// ========================================
// QUANTITY BUTTONS
// ========================================

function setupQuantityButtons() {

    const plusButtons =
        document.querySelectorAll(".plus-btn");

    const minusButtons =
        document.querySelectorAll(".minus-btn");


    plusButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(this.dataset.index);

                cart[index].quantity =
                    (cart[index].quantity || 1) + 1;

                saveCart();

                displayCart();

            }
        );

    });


    minusButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(this.dataset.index);


                if (
                    (cart[index].quantity || 1) > 1
                ) {

                    cart[index].quantity--;

                } else {

                    cart.splice(index, 1);

                }


                saveCart();

                displayCart();

            }
        );

    });

}


// ========================================
// REMOVE PRODUCT
// ========================================

function setupRemoveButtons() {

    const removeButtons =
        document.querySelectorAll(".remove-btn");


    removeButtons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const index =
                    Number(this.dataset.index);


                const productName =
                    cart[index].name;


                const confirmRemove =
                    confirm(
                        "Remove " +
                        productName +
                        " from cart?"
                    );


                if (!confirmRemove) {

                    return;

                }


                cart.splice(index, 1);

                saveCart();

                displayCart();

            }
        );

    });

}


// ========================================
// UPDATE SUMMARY
// ========================================

function updateSummary() {

    let subtotal = 0;


    cart.forEach(product => {

        subtotal +=
            product.priceValue *
            (product.quantity || 1);

    });


    // Free delivery above ₹1,000

    let delivery = 0;


    if (
        subtotal > 0 &&
        subtotal < 1000
    ) {

        delivery = 99;

    }


    const total =
        subtotal + delivery;


    subtotalElement.textContent =
        "₹" +
        subtotal.toLocaleString("en-IN");


    deliveryElement.textContent =
        delivery === 0
            ? "FREE"
            : "₹" +
              delivery.toLocaleString("en-IN");


    totalElement.textContent =
        "₹" +
        total.toLocaleString("en-IN");


    updateCartCount();

}


// ========================================
// CHECKOUT
// ========================================

checkoutButton.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            return;

        }


        const loggedIn =
            localStorage.getItem(
                "digimartLoggedIn"
            );


        if (loggedIn !== "true") {

            alert(
                "Please login before checkout."
            );

            window.location.href =
                "login.html";

            return;

        }


        window.location.href =
            "checkout.html";

    }
);


// ========================================
// INITIALIZE
// ========================================

displayCart();

updateCartCount();