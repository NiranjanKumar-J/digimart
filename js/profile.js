// ========================================
// DigiMart Profile
// ========================================


// Get login status

const loggedIn =
    localStorage.getItem("digimartLoggedIn");


// ========================================
// CHECK LOGIN
// ========================================

if (loggedIn !== "true") {

    alert(
        "Please login to view your profile."
    );

    window.location.href =
        "login.html";

}


// ========================================
// GET USER
// ========================================

const user =
    JSON.parse(
        localStorage.getItem("digimartUser")
    );


// If user data doesn't exist

if (!user) {

    localStorage.setItem(
        "digimartLoggedIn",
        "false"
    );

    window.location.href =
        "login.html";

}


// ========================================
// DISPLAY USER
// ========================================

document.getElementById("profileName")
    .textContent =
    user.fullname;


document.getElementById("fullName")
    .textContent =
    user.fullname;


document.getElementById("email")
    .textContent =
    user.email;


document.getElementById("mobile")
    .textContent =
    user.mobile;


document.getElementById("dob")
    .textContent =
    user.dob;


// ========================================
// LOGOUT
// ========================================

document.getElementById("logoutBtn")
    .addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            localStorage.setItem(
                "digimartLoggedIn",
                "false"
            );


            alert(
                "You have been logged out."
            );


            window.location.href =
                "login.html";

        }
    );