
const order =
    JSON.parse(
        localStorage.getItem("digimartLastOrder")
    );


if (!order) {

    alert("No recent order found.");

    window.location.href =
        "index.html";

}

document.getElementById(
    "order-id"
).textContent =
    order.orderId;

document.getElementById(
    "customer-name"
).textContent =
    order.customer.name;

document.getElementById(
    "payment-method"
).textContent =
    order.payment;

document.getElementById(
    "order-date"
).textContent =
    order.date;

let subtotal = 0;


order.products.forEach(product => {

    subtotal +=
        product.priceValue *
        (product.quantity || 1);

});


let delivery = 0;


if (
    subtotal > 0 &&
    subtotal < 1000
) {

    delivery = 99;

}


const total =
    subtotal + delivery;


document.getElementById(
    "order-total"
).textContent =
    "₹" +
    total.toLocaleString("en-IN");