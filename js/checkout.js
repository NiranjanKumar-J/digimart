// ========================================
// DigiMart Checkout
// ========================================

let cart =
    JSON.parse(localStorage.getItem("digimartCart")) || [];


// Elements

const checkoutItems =
    document.getElementById("checkout-items");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const totalElement =
    document.getElementById("total");

const checkoutForm =
    document.getElementById("checkoutForm");


// ========================================
// LOAD ORDER SUMMARY
// ========================================

function loadCheckout() {

    checkoutItems.innerHTML = "";

    let subtotal = 0;


    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>
                Your cart is empty.
            </p>
        `;

        subtotalElement.textContent = "₹0";
        deliveryElement.textContent = "FREE";
        totalElement.textContent = "₹0";

        return;

    }


    cart.forEach(product => {

        const quantity =
            product.quantity || 1;


        const itemTotal =
            product.priceValue * quantity;


        subtotal += itemTotal;


        const item =
            document.createElement("div");

        item.className =
            "checkout-item";


        item.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="checkout-item-info">

                <h4>
                    ${product.name}
                </h4>

                <p>
                    ${product.brand}
                    × ${quantity}
                </p>

            </div>

            <div class="checkout-item-price">

                ₹${itemTotal.toLocaleString("en-IN")}

            </div>

        `;


        checkoutItems.appendChild(item);

    });


    // Delivery

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

}


// ========================================
// FORM VALIDATION
// ========================================

checkoutForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Empty cart check

        if (cart.length === 0) {

            alert(
                "Your cart is empty."
            );

            window.location.href =
                "products.html";

            return;

        }


        const name =
            document.getElementById("name")
                .value
                .trim();


        const mobile =
            document.getElementById("mobile")
                .value
                .trim();


        const address =
            document.getElementById("address")
                .value
                .trim();


        const city =
            document.getElementById("city")
                .value
                .trim();


        const pincode =
            document.getElementById("pincode")
                .value
                .trim();


        // Mobile validation

        if (!/^[0-9]{10}$/.test(mobile)) {

            alert(
                "Please enter a valid 10-digit mobile number."
            );

            return;

        }


        // PIN validation

        if (!/^[0-9]{6}$/.test(pincode)) {

            alert(
                "Please enter a valid 6-digit PIN code."
            );

            return;

        }


        // Payment method

        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        let paymentName;


        if (payment === "cod") {

            paymentName =
                "Cash on Delivery";

        }

        else if (payment === "upi") {

            paymentName =
                "UPI";

        }

        else {

            paymentName =
                "Credit / Debit Card";

        }


        // Save order

        const order = {

            orderId:
                "DM" +
                Date.now(),

            customer: {

                name: name,

                mobile: mobile,

                address: address,

                city: city,

                pincode: pincode

            },

            payment:
                paymentName,

            products:
                cart,

            date:
                new Date().toLocaleString("en-IN")

        };


        localStorage.setItem(
            "digimartLastOrder",
            JSON.stringify(order)
        );


        // Clear cart

        localStorage.removeItem(
            "digimartCart"
        );


        // Success

        alert(
            "Order placed successfully!"
        );


        // Go to confirmation

        window.location.href =
            "order-success.html";

    }
);


// ========================================
// INITIALIZE
// ========================================

loadCheckout();