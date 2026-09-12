// ==========================================
// ShopEase - script.js
// ==========================================

// Load Cart from Local Storage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ==========================================
// ADD TO CART
// ==========================================
function addToCart(name, price) {

    let existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            name: name,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart!");
}

// ==========================================
// DISPLAY CART ITEMS
// ==========================================
function displayCart() {

    const cartContainer = document.getElementById("cart-items");

    if (!cartContainer) return;

    cartContainer.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML =
            "<h2>Your Cart is Empty</h2>";
        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>

                <button onclick="increaseQuantity(${index})">
                    +
                </button>

                <button onclick="decreaseQuantity(${index})">
                    -
                </button>

                <button onclick="removeFromCart(${index})">
                    Remove
                </button>

                <hr>
            </div>
        `;
    });

    cartContainer.innerHTML += `
        <h2>Total Amount: ₹${total}</h2>
    `;
}

// ==========================================
// REMOVE FROM CART
// ==========================================
function removeFromCart(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// ==========================================
// INCREASE QUANTITY
// ==========================================
function increaseQuantity(index) {

    cart[index].quantity++;

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// ==========================================
// DECREASE QUANTITY
// ==========================================
function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    displayCart();
}

// ==========================================
// USER REGISTRATION
// ==========================================
const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const fullname =
            document.getElementById("fullname").value;

        const email =
            document.getElementById("email").value;

        const phone =
            document.getElementById("phone").value;

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {

            alert("Passwords do not match!");

            return;
        }

        const user = {
            fullname,
            email,
            phone,
            password
        };

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

        alert("Registration Successful!");

        window.location.href = "login.html";
    });
}

// ==========================================
// USER LOGIN
// ==========================================
const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email =
            document.getElementById("email").value;

        const password =
            document.getElementById("password").value;

        const user =
            JSON.parse(localStorage.getItem("user"));

        if (
            user &&
            email === user.email &&
            password === user.password
        ) {

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            alert("Login Successful!");

            window.location.href = "index.html";

        } else {

            alert("Invalid Email or Password!");
        }
    });
}

// ==========================================
// PROFILE PAGE
// ==========================================
function loadProfile() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    if (!user) return;

    const nameField =
        document.getElementById("profileName");

    const emailField =
        document.getElementById("profileEmail");

    const phoneField =
        document.getElementById("profilePhone");

    if (nameField) nameField.value = user.fullname;
    if (emailField) emailField.value = user.email;
    if (phoneField) phoneField.value = user.phone;
}

// ==========================================
// CONTACT FORM
// ==========================================
const contactForm =
    document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert(
            "Thank you! Your message has been sent."
        );

        contactForm.reset();
    });
}

// ==========================================
// CHECKOUT FORM
// ==========================================
const checkoutForm =
    document.getElementById("checkoutForm");

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert(
            "Address Saved Successfully!"
        );

        window.location.href = "payment.html";
    });
}

// ==========================================
// PAYMENT FORM
// ==========================================
const paymentForm =
    document.getElementById("paymentForm");

if (paymentForm) {

    paymentForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert(
            "Payment Successful! Order Placed."
        );

        localStorage.removeItem("cart");

        window.location.href = "index.html";
    });
}

// ==========================================
// NEWSLETTER SUBSCRIPTION
// ==========================================
const newsletterForm =
    document.querySelector(".newsletter form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (e) {

        e.preventDefault();

        alert(
            "Subscribed Successfully!"
        );

        newsletterForm.reset();
    });
}

// ==========================================
// LOGOUT FUNCTION
// ==========================================
function logout() {

    localStorage.removeItem("isLoggedIn");

    alert("Logged Out Successfully!");

    window.location.href = "login.html";
}

// ==========================================
// PAGE LOAD FUNCTIONS
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    displayCart();
    loadProfile();
});