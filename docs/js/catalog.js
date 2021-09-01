'use strict';

// Set up an empty cart for use on this page.
const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
const cart = new Cart(cartItems);

/// ----------------------------- cart is and instance of a CART -------------------////
// On screen load, we call this method to put all of the items into a drop down list
function populateForm() {
  //Add an <option> tag inside the form's select for each product
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let optionElement = document.createElement('option');
    optionElement.id = Product.allProducts[i].name;
    optionElement.textContent = Product.allProducts[i].name;
    selectElement.append(optionElement);
  }
}

function displayAllItems(){
  const productList = document.getElementById('displayCart')
  for(let i = 0; i < Product.allProducts.length; i++){
    let productCard = document.createElement('section');
    productList.append(productCard)
    let productTitle = document.createElement('h4');
    productTitle.textContent = Product.allProducts[i].name;
    let productImg = document.createElement('img');
    productImg.src = Product.allProducts[i].filePath;
    productCard.append(productTitle, productImg);
  }
}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault()
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();
}

// Add the selected item and quantity to the cart
function addSelectedItemToCart(e) {
  // suss out the item picked from the select list &  get the quantity
  let itemName = e.target.items.value
  let itemQuantity = e.target.quantity.value
  // From the user input, add one item to the Cart
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

// Update the cart count in the header nav with the number of items in the Cart
function updateCounter() {
  let cartTotal = document.getElementById('itemCount');
  let counter = 0;
  cartTotal.textContent = `( ${counter} )`;
  if(cart.items !== 0){
    for( let item of cart.items ){
      counter += parseInt(item.quantity);
    }
  }
  return cartTotal.textContent = `( ${counter} )`;
}

// As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  // Get the item and quantity from the form & add a new element to the cartContents div with that information (remove current children first)
  let cartDisplay = removeChildren('#cartContents')
  for( let i in cart.items){
    let cartItem = document.createElement('div');
    cartItem.textContent = `${cart.items[i].name}: ${cart.items[i].quantity}`;
    cartDisplay.append(cartItem);
  }
}

const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

populateForm();
updateCounter();
updateCartPreview();
displayAllItems()
