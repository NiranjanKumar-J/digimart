
const form = document.querySelector("form");

const fullname = document.getElementById("fullname");
const email = document.getElementById("email");
const mobile = document.getElementById("mobile");
const dob = document.getElementById("dob");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirm");
const terms = document.getElementById("terms");

form.addEventListener("submit", function (event) {

    event.preventDefault();
    if (fullname.value.trim().length < 3) {

        alert("Please enter a valid full name.");

        fullname.focus();

        return;

    }
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.value.trim())) {

        alert("Please enter a valid email address.");

        email.focus();

        return;

    }
    const mobilePattern =
        /^[0-9]{10}$/;

    if (!mobilePattern.test(mobile.value.trim())) {

        alert("Mobile number must contain 10 digits.");

        mobile.focus();

        return;

    }
    if (password.value.length < 6) {

        alert(
            "Password must contain at least 6 characters."
        );

        password.focus();

        return;

    }
    if (password.value !== confirmPassword.value) {

        alert("Passwords do not match.");

        confirmPassword.focus();

        return;

    }
    if (!terms.checked) {

        alert(
            "Please agree to the Terms & Conditions."
        );

        return;

    }

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
    localStorage.setItem(
        "digimartUser",
        JSON.stringify(user)
    );
    localStorage.setItem(
        "digimartLoggedIn",
        "false"
    );


    alert(
        "Registration successful!\nPlease login to continue."
    );
    window.location.href =
        "login.html";

});