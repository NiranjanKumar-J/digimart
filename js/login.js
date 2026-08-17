
const loginForm =
    document.querySelector("form");

const email =
    document.getElementById("email");

const password =
    document.getElementById("password");

const remember =
    document.getElementById("remember");

loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();
        const savedUser =
            JSON.parse(
                localStorage.getItem("digimartUser")
            );
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
        if (
            enteredEmail !== savedUser.email ||
            enteredPassword !== savedUser.password
        ) {

            alert(
                "Invalid email or password."
            );

            return;

        }

        localStorage.setItem(
            "digimartLoggedIn",
            "true"
        );
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