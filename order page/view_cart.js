document.addEventListener("DOMContentLoaded", function() {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems'));

    const cartItemsSection = document.querySelector(".cart-items");
    const subtotalSpan = document.getElementById("subtotal");
    const taxSpan = document.getElementById("tax");
    const discountSpan = document.getElementById("discount");
    const deliveryChargesSpan = document.getElementById("deliveryCharges");
    const totalAmountSpan = document.getElementById("totalAmount");
    const checkoutBtn = document.querySelector(".button-89");
    const paymentMethodRadios = document.querySelectorAll('input[type="radio"][name="paymentMethod"]');

    const modal = document.getElementById("qrCodeModal");
    const closeModalBtn = document.querySelector(".close");

    // Fixed delivery charges, discount threshold, rates
    const deliveryCharge = 50;
    const discountThreshold = 1000;
    const discountRate = 0.4;

    // Function to calculate subtotal
    function calculateSubtotal() {
        let subtotal = 0;
        cartItems.forEach(function(item) {
            subtotal += (item.price * item.quantity);
        });
        return subtotal.toFixed(2);
    }

    // Function to calculate tax
    function calculateTax(subtotal) {
        return (subtotal * 0.15).toFixed(2);
    }

    // Function to calculate discount
    function calculateDiscount(subtotal) {
        let discount = 0;
        if (subtotal > discountThreshold) {
            discount = subtotal * discountRate;
        }
        return discount.toFixed(2);
    }

    function calculateTotal() {
        const subtotal = parseFloat(calculateSubtotal());
        const tax = parseFloat(calculateTax(subtotal));
        const discount = parseFloat(calculateDiscount(subtotal));
        const total = subtotal + tax + deliveryCharge - discount;
        return total.toFixed(2);
    }

    // Function to display cart items
    function displayCartItems() {
        cartItemsSection.innerHTML = ""; // Clear existing content
        // Iterate through each item in cartItems array
        cartItems.forEach(function(item) {
            // Create a div element for each cart item
            const cartItemElement = document.createElement("div");
            cartItemElement.classList.add("cart-item");
            // Set innerHTML of cart item element with item details and image
            cartItemElement.innerHTML = `
                <div class="item-details">
                    <h3>${item.name}</h3>
                    <p>Price: ${item.price.toFixed(2)} Rs</p>
                    <p>Quantity: ${item.quantity}</p>
                </div>
            `;
            // Append the constructed cart item element to cartItemsSection
            cartItemsSection.appendChild(cartItemElement);
        });

        // Calculate and display amounts
        const subtotal = parseFloat(calculateSubtotal());
        subtotalSpan.textContent = subtotal.toFixed(2) + " Rs";
        taxSpan.textContent = calculateTax(subtotal) + " Rs";
        const discount = parseFloat(calculateDiscount(subtotal));
        discountSpan.textContent = discount.toFixed(2) + " Rs";
        deliveryChargesSpan.textContent = deliveryCharge.toFixed(2) + " Rs";
        totalAmountSpan.textContent = calculateTotal() + " Rs";
    }

    // Display cart items when page loads
    displayCartItems();

    // Checkout button click event
    checkoutBtn.addEventListener("click", function() {
        let isSelected = false;
        let selectedPaymentMethod = "";
        paymentMethodRadios.forEach(function(radio) {
            if (radio.checked) {
                isSelected = true;
                selectedPaymentMethod = radio.value; // Assuming value is "googlePay"
            }
        });
        if (!isSelected) {
            alert("Please select a payment method.");
            return;
        }

        // Handle different payment methods
        if (selectedPaymentMethod === "googlePay") {
            // Open the modal with the QR code
            showModal();
        } else {
            // Handle other payment methods
            alert("Payment method not supported yet.");
            return;
        }
    });

    // Function to show modal
    function showModal() {
        modal.style.display = "block";
    }

    // Function to close modal
    closeModalBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    // Close the modal if the user clicks outside of the modal content
    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});
