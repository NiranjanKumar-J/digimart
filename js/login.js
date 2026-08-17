// ========================================
// DigiMart Login
// ========================================

const loginForm =
    document.querySelector("form");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const remember =
    document.getElementById("remember");


// ========================================
// LOGIN
// ========================================

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Get registered user
        const savedUser =
            JSON.parse(
                localStorage.getItem("digimartUser")
            );


        // No account
        if (!savedUser) {

            alert(
                "No account found.\nPlease register first."
            );

            return;

        }


        const enteredEmail =
            email.value.trim().toLowerCase();

        const enteredPassword =
            password.value;


        // Check login
        if (
            enteredEmail !== savedUser.email ||
            enteredPassword !== savedUser.password
        ) {

            alert(
                "Invalid email or password."
            );

            return;

        }


        // ========================================
        // LOGIN SUCCESS
        // ========================================

        localStorage.setItem(
            "digimartLoggedIn",
            "true"
        );


        // Remember Me
        if (remember.checked) {

            localStorage.setItem(
                "digimartRemember",
                "true"
            );

        } else {

            localStorage.removeItem(
                "digimartRemember"
            );

        }


        alert(
            "Login successful! Welcome to DigiMart."
        );


        window.location.href =
            "index.html";

    }
);