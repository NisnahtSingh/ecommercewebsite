//  data structure for the cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// DOM Elements
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Populate Cart Items
function renderCart() {
    cartItems.innerHTML = ""; // Clear current items
    let total = 0;

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>$${item.price.toFixed(2)}</td>
            <td>
                <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="quantity-input">
            </td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>
                <button class="remove-button" data-index="${index}">Remove</button>
            </td>
        `;

        cartItems.appendChild(row);
    });

    cartTotal.textContent = total.toFixed(2);

    // Attach event listeners for quantity changes and removal
    attachEventListeners();
}

// Update Quantity
function updateQuantity(index, newQuantity) {
    if (newQuantity < 1) return; // Prevent invalid quantities
    cart[index].quantity = newQuantity;
    saveCart();
    renderCart();
}

// Remove Item
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
}

// Save Cart to Local Storage
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Attach Event Listeners
function attachEventListeners() {
    document.querySelectorAll(".quantity-input").forEach((input) => {
        input.addEventListener("change", (e) => {
            const index = e.target.dataset.index;
            const newQuantity = parseInt(e.target.value, 10);
            updateQuantity(index, newQuantity);
        });
    });

    document.querySelectorAll(".remove-button").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            removeItem(index);
        });
    });
}

// Initial Render
renderCart();

// Checkout Button 
document.getElementById("checkout-button").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Proceeding to checkout...");
});
