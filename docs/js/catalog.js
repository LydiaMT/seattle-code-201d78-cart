/* global Product, Cart */
'use strict';

// Set up an empty cart for use on this page.
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cart = new Cart(cartItems);

/// ----------------------------- cart is and instance of a CART -------------------////
/// ------------------- use cmd/ctl f to look for words in your code ------------------///
// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  //TODO: Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let optionElement = document.createElement('option');
    optionElement.id = Product.allProducts[i].name;
    optionElement.textContent = Product.allProducts[i].name;
    selectElement.append(optionElement);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  // TODO: Prevent the page from reloading
  event.preventDefault()
  /// --------------- at this point you know which item was picked from the list, how many ----------- ///
  // Do all the things ...
  addSelectedItemToCart(event);
  // you can theoretically add parameters/arguments to a function being called
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

// TODO: Add the selected item and quantity to the cart
function addSelectedItemToCart(e) {
  // TODO: suss out the item picked from the select list
  // TODO: get the quantity
  let itemName = e.target.items.value
  let itemQuantity = e.target.quantity.value
  // TODO: using those, add one item to the Cart
  for(let item of cart.items){
    if(item.name === itemName){
      let currentCount = parseInt(item.quantity);
      let additionalCount = parseInt(itemQuantity);
      item.quantity = currentCount + additionalCount;
      return;
    }
  }
  cart.items.push({'name': itemName, 'quantity': itemQuantity})
}

// TODO: Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let cartTotal = document.getElementById('itemCount');
  let counter = 0;
  cartTotal.textContent = counter;
  if(cart.items !== 0){
    for( let item of cart.items ){
      counter += parseInt(item.quantity);
    }
  }
  return cartTotal.textContent = counter;
}

// TODO: As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // TODO: Get the item and quantity from the form
  // TODO: Add a new element to the cartContents div with that information
  let cartDisplay = document.getElementById('cartContents');
  cartDisplay.querySelectorAll('*').forEach(n => n.remove());
  for( let i in cart.items){
    let cartItem = document.createElement('div');
    cartItem.textContent = `${cart.items[i].name}: ${cart.items[i].quantity}`;
    cartDisplay.append(cartItem);
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.

populateForm();
updateCounter();
updateCartPreview();
