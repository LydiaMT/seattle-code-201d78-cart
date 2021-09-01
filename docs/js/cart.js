/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  showCart();
}

let clearLocalStorage = document.getElementById('empty-storage'); // Remove all of the rows (tr) in the cart table (tbody)
clearLocalStorage.addEventListener('click', clearCart)

function clearCart() {
  localStorage.clear()
  removeChildren('tbody')
}

function showCart() {
  let tableBody = removeChildren('tbody')   // Find the table body & remove the children
  for(let item of cart.items){ // Iterate over the items in the cart
    // Create a TR. Create a TD for the delete link, quantity, & item. Add the TR to the TBODY and each of the TD's to the TR
    let tableRow = makeElementAndAppend('tr', tableBody)
    makeElementAndAppend('td', tableRow, { textContent: '✖️', id: item.name })
    makeElementAndAppend('td', tableRow, { textContent: item.name })
    let quantityTD = makeElementAndAppend('td', tableRow)
    let editQuantity = makeElementAndAppend('input', quantityTD, { type: 'number', min: 1, max: 100, value: item.quantity })
    editQuantity.addEventListener('change', editQuantityHandler(item)); // Change event listening for the user to update an item quantity
  }
}

const editQuantityHandler = (item) => (event) => { // curried function
  item.quantity = event.target.value;
  cart.saveToLocalStorage();
  showCart();
}

function removeItemFromCart(event) {
  cart.removeItem(event) //  When a delete link is clicked, use cart.removeItem to remove the correct item
  cart.saveToLocalStorage(); // Save the cart back to local storage
  showCart() // Re-draw the cart table
}

// This will initialize the page and draw the cart on screen
renderCart();
