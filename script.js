const addtoCart = document.querySelectorAll(".add-to-cart");

const cartItems = document.querySelector(".cart-items");

const cartCount = document.querySelector(".cart-count");

const totalPrice = document.querySelector(".total-price");

const emptyCart = document.querySelector(".empty-cart");

const confirmOrder = document.querySelector(".confirm-order");
const orderConfirmation = document.querySelector(".order-confirmation");

const confirmationItems = document.querySelector(".confirmation-items");

const confirmedTotalPrice = document.querySelector(".confirmed-total-price");

const startNewOrder = document.querySelector(".start-new-order");
startNewOrder.addEventListener("click",() => {
    orderConfirmation.style.display = "none";
    cartItems.innerHTML = "";
    cartNumber = 0;
    cartCount.textContent = cartNumber;
    totalPrice.textContent = "$0.00";
    emptyCart.style.display = "block";
});
let cartNumber = 0;

function updateTotal() {
    let total = 0;
    const cartItemsList = cartItems.querySelectorAll(".cart-item");
    cartItemsList.forEach((cartItem) => {
        const itemTotal = cartItem.querySelector(".item-total");
        const price = parseFloat(itemTotal.textContent.replace("$",""));
        total += price;
});
totalPrice.textContent = "$" + total.toFixed(2);
if (orderConfirmation.style.display === "block") {
    confirmedTotalPrice.textContent = totalPrice.textContent;
}
}

addtoCart.forEach((button) => {
    button.addEventListener("click",() => {
        cartNumber++;
cartCount.textContent = cartNumber;
emptyCart.style.display = "none";
const productCard = button.closest(".product-card");
const productPrice = productCard.querySelector(".product-price");
const existingItems = cartItems.querySelectorAll(".item-name");
let itemFound = false;
existingItems.forEach((itemName) => {
    
    if (itemName.textContent === button.dataset.product) {
        const itemQuantity = itemName.parentElement.querySelector(".item-quantity");
        let quantity = parseInt(itemQuantity.textContent);
        quantity++;
        itemQuantity.textContent = quantity + "×";
        const confirmedItem = confirmationItems.querySelector(
    `[data-product="${button.dataset.product}"]`
);

        const unitPrice = parseFloat(productPrice.textContent.replace("$",""));
        const newTotal = unitPrice * quantity;
        const existingItemTotal = itemName.parentElement.querySelector(".item-total");
         existingItemTotal.textContent = "$" + newTotal.toFixed(2);
         if (confirmedItem) {
    const confirmedQuantity = confirmedItem.querySelector(".confirmed-details span");
    confirmedQuantity.textContent = itemQuantity.textContent;
    const confirmedTotal = confirmedItem.querySelector(".confirmed-total");
    confirmedTotal.textContent = existingItemTotal.textContent;
}
        itemFound = true;
        }
});

if (!itemFound) {
    const item = document.createElement("div");
item.classList.add("cart-item");
const itemName = document.createElement("h3");
    itemName.classList.add("item-name");
    itemName.textContent = button.dataset.product;
    item.appendChild(itemName);
    
    const cartitemDetails = document.createElement("div");
    cartitemDetails.classList.add("cart-item-details");

    const itemQuantity = document.createElement("span");
    itemQuantity.classList.add("item-quantity");
    itemQuantity.textContent = "1×";

    cartitemDetails.appendChild(itemQuantity);
    
    const itemPrice = document.createElement("span");
    itemPrice.classList.add("item-price");
    itemPrice.textContent = productPrice.textContent;
    cartitemDetails.appendChild(itemPrice);
    const itemTotal = document.createElement("span");
    itemTotal.classList.add("item-total");
    itemTotal.textContent = productPrice.textContent;
    cartitemDetails.appendChild(itemTotal);
    item.appendChild(cartitemDetails);
    
    const removeItem = document.createElement("button");
    removeItem.classList.add("remove-item");
    removeItem.textContent = "×";
    item.appendChild(removeItem);
    cartItems.appendChild(item);
    removeItem.addEventListener("click", () => {
        const quantity = parseInt(
    item.querySelector(".item-quantity").textContent
);
        cartNumber -= quantity;
        cartCount.textContent = cartNumber;
        const productName = document.querySelector(".item-name").textContent;
        const confirmedItem = confirmationItems.querySelector(
    `[data-product="${productName}"]`
);
if (confirmedItem) {
    confirmedItem.remove();
} if (confirmationItems.children.length === 0){
    orderConfirmation.style.display = "none";
}
    item.remove();
    updateTotal();
    if (cartItems.children.length === 0) {
    cartNumber = 0;
    cartCount.textContent = cartNumber;
    emptyCart.style.display = "block";
}
});
}

    updateTotal();
    });
    
});

confirmOrder.addEventListener("click", () => {
    confirmationItems.innerHTML = "";
    orderConfirmation.style.display = "block";
    confirmedTotalPrice.textContent = totalPrice.textContent;
    const items = cartItems.querySelectorAll(".cart-item");
    items.forEach((item) => {
        const confirmedItem = document.createElement("div");
confirmedItem.classList.add("confirmed-item");
const itemName = item.querySelector(".item-name");
confirmedItem.dataset.product = itemName.textContent;
const itemQuantity = item.querySelector(".item-quantity");
const itemPrice = item.querySelector(".item-price");
const itemTotal = item.querySelector(".item-total");
const confirmedName = document.createElement("h3");
confirmedName.textContent = itemName.textContent;
confirmedItem.appendChild(confirmedName);
confirmedName.style.marginBottom = "8px";
const confirmedDetails = document.createElement("div");
confirmedDetails.classList.add("confirmed-details");
const confirmedQuantity = document.createElement("span");
confirmedQuantity.textContent = itemQuantity.textContent;
confirmedDetails.appendChild(confirmedQuantity);
confirmedQuantity.style.color = "#c73b0f";
confirmedQuantity.style.fontWeight = "bold";
const confirmedPrice = document.createElement("span");
confirmedPrice.textContent = itemPrice.textContent;
confirmedDetails.appendChild(confirmedPrice);
confirmedPrice.style.color = "#777";
confirmedPrice.style.fontWeight = "bold";
confirmedPrice.style.opacity = "0.8";
const confirmedTotal = document.createElement("span");
confirmedTotal.classList.add("confirmed-total");
confirmedTotal.textContent = itemTotal.textContent;
confirmedDetails.appendChild(confirmedTotal);
confirmedTotal.style.color = "#333";
confirmedTotal.style.fontWeight = "bold";
confirmedItem.appendChild(confirmedDetails);
confirmationItems.appendChild(confirmedItem);
    });
});

