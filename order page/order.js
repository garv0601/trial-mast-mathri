document.addEventListener("DOMContentLoaded", function() {
    const plusButtons = document.querySelectorAll(".plus-btn");
    const minusButtons = document.querySelectorAll(".minus-btn");
    const quantityInputs = document.querySelectorAll("input[type='text']");
    const totalSpan = document.querySelector(".total span");
    const orderBtn = document.querySelector(".order-btn");
    const navLinks = document.querySelectorAll(".nav-options a");
    const sections = document.querySelectorAll(".section");

    let totalPrice = 0;
    let cartItems = [];

    // Reset quantities to zero when page is loaded
    quantityInputs.forEach(function(input) {
        input.value = 0;
    });

    // Update total price
    updateTotalPrice();

    plusButtons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            let currentValue = parseInt(quantityInputs[index].value);
            quantityInputs[index].value = currentValue + 1;
            updateTotalPrice();
        });
    });

    minusButtons.forEach(function(button, index) {
        button.addEventListener("click", function() {
            let currentValue = parseInt(quantityInputs[index].value);
            if (currentValue > 0) {
                quantityInputs[index].value = currentValue - 1;
                updateTotalPrice();
            }
        });
    });

    function updateTotalPrice() {
        totalPrice = 0;
        const updatedItems = [];
        quantityInputs.forEach(function(input, index) {
            let quantity = parseInt(input.value);
            let pricePerUnit = parseFloat(input.closest('.item').querySelector('.price').textContent.match(/\d+/)[0]); 
            totalPrice += quantity * pricePerUnit;
            let name = input.closest('.item').querySelector('.name h3').textContent;
            let price = parseFloat(input.closest('.item').querySelector('.price').textContent.match(/\d+/)[0]); 
            updatedItems.push({ name: name, price: price, quantity: quantity });
        });
        cartItems = updatedItems; // Update cart items
        sessionStorage.setItem('cartItems', JSON.stringify(updatedItems)); // Update cart items in sessionStorage
        totalSpan.textContent = totalPrice.toFixed(2) + " Rs";
    }
    
    orderBtn.addEventListener("click", function() {
        const items = [];
        quantityInputs.forEach(function(input, index) {
            let quantity = parseInt(input.value);
            if (quantity > 0) {
                let name = input.closest('.item').querySelector('.name h3').textContent;
                let price = parseFloat(input.closest('.item').querySelector('.price').textContent.match(/\d+/)[0]); 
                items.push({ name: name, price: price, quantity: quantity });
            }
        });
        sessionStorage.setItem('cartItems', JSON.stringify(items)); // Store cart items in sessionStorage
        window.location.href = "../preloader/preloader_view_cart.html"; // Redirect to view cart page
    });

    function highlightSection(sectionId) {
        navLinks.forEach(function(link) {
            link.classList.remove("active");
        });
        document.querySelector(`.nav-options a[href="#${sectionId}"]`).classList.add("active");
    }

    
    function showSection(sectionId) {
        sections.forEach(function(section) {
            if (section.id === sectionId) {
                section.classList.add("active");
            } else {
                section.classList.remove("active");
            }
        });
    }

    navLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href").slice(1); 
            highlightSection(sectionId); 
            showSection(sectionId); 
        });
    });

    showSection("sweets");
});
