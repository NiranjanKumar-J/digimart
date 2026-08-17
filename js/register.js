// ========================================
// DigiMart Registration
// ========================================

const form = document.querySelector("form");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const dob = document.getElementById("dob");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");
const terms = document.getElementById("terms");


// ========================================
// REGISTER
// ========================================

form.addEventListener("submit", function (event) {

    event.preventDefault();


    // Full name validation
    if (fullname.value.trim().length < 3) {

        alert("Please enter a valid full name.");

        fullname.focus();

        return;

    }


    // Email validation
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        alert("Please enter a valid email address.");

        email.focus();

        return;

    }


    // Mobile validation
    const mobilePattern =
        /^[0-9]{10}$/;

    if (!mobilePattern.test(mobile.value.trim())) {

        alert("Mobile number must contain 10 digits.");

        mobile.focus();

        return;

    }


    // Password validation
    if (password.value.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        password.focus();

        return;

    }


    // Confirm password
    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match.");

        confirmPassword.focus();

        return;

    }


    // Terms
    if (!terms.checked) {

        alert(
            "Please agree to the Terms & Conditions."
        );

        return;

    }


    // ========================================
    // CREATE USER
    // ========================================

    const user = {

        fullname:
            fullname.value.trim(),

        email:
            email.value.trim().toLowerCase(),

        mobile:
            mobile.value.trim(),

        dob:
            dob.value,

        password:
            password.value

    };


    // Save user
    localStorage.setItem(
        "digimartUser",
        JSON.stringify(user)
    );


    // Login status
    localStorage.setItem(
        "digimartLoggedIn",
        "false"
    );


    alert(
        "Registration successful!\nPlease login to continue."
    );


    // Go to login
    window.location.href =
        "login.html";

});