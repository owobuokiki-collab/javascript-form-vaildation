document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let fullName = document.getElementById("fullName").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;
    let age = document.getElementById("age").value;

    if (fullName === "" || fullName.split(" ").length < 2) {
        alert("Full Name must contain at least 2 words.");
        return;
    }

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Enter a valid email address.");
        return;
    }

    let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;
    if (!passwordPattern.test(password)) {
        alert("Password must be at least 8 characters and include one uppercase letter, one number, and one special character.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    if (age < 18) {
        alert("You must be 18 or older to register.");
        return;
    }

    alert("Registration Successful!");
    document.getElementById("registrationForm").reset();
});
