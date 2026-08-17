
const loggedIn =
    localStorage.getItem("digimartLoggedIn");

if (loggedIn !== "true") {

    alert(
        "Please login to view your profile."
    );

    window.location.href =
        "login.html";

}

const user =
    JSON.parse(
        localStorage.getItem("digimartUser")
    );

if (!user) {

    localStorage.setItem(
        "digimartLoggedIn",
        "false"
    );

    window.location.href =
        "login.html";

}

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