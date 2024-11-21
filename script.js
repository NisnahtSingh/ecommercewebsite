// Script for navigation bar
$('#bar').on('click', function() {
    $('#nevbar').addClass('active');
  });
  $('#close').on('click', function(){
    $('#nevbar').removeClass('active')
  })
  $(document).ready(function () {
    var $mainImg = $('#mainimage');
    var $smallImgs = $('.small-img');

    $smallImgs.click(function () {
        $mainImg.attr('src', $(this).attr('src'));
    });
});
// Initialize Cart
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart Functionality
document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
        const product = e.target.parentElement;
        const id = product.dataset.id;
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);

        // Check if the item is already in the cart
        const existingItem = cart.find((item) => item.id === id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ id, name, price, quantity: 1 });
        }

        // Save to localStorage
        localStorage.setItem("cart", JSON.stringify(cart));

        alert(`${name} has been added to the cart!`);
    });
});