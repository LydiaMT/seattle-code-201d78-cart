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
  // clearCart();
  showCart();
}
// TODO: Remove all of the rows (tr) in the cart table (tbody)
let clearLocalStorage = document.getElementById('empty-storage');
clearLocalStorage.addEventListener('click', clearCart)

function clearCart() {
  localStorage.clear()
  let tableBody = document.querySelector('tbody')
  tableBody.querySelectorAll('*').forEach(n => n.remove());

}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  // TODO: Find the table body
  /// ------------------ querySelector ---------------------------///
  let tableBody = document.querySelector('tbody')
  // TODO: Iterate over the items in the cart
  tableBody.querySelectorAll('*').forEach(n => n.remove());

  for(let item of cart.items){
    // TODO: Create a TR
    // TODO: Create a TD for the delete link, quantity,  and the item
    // TODO: Add the TR to the TBODY and each of the TD's to the TR
    let tableRow = document.createElement('tr');
    tableBody.append(tableRow);
    let removeTD = document.createElement('td');
    removeTD.textContent = '❌';
    removeTD.id = item.name
    tableRow.append(removeTD)
    let productTD = document.createElement('td');
    productTD.textContent = item.name;
    tableRow.append(productTD);
    let quantityTD = document.createElement('td');
    quantityTD.textContent = item.quantity;
    tableRow.append(quantityTD);
  }
}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  cart.removeItem(event)
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  showCart() 
}

// This will initialize the page and draw the cart on screen
renderCart();
