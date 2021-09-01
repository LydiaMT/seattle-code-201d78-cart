'use strict';

// Cart constructor
const Cart = function(items) {
  this.items = items; //array of CartItem instances.
};

// CART INSTANT METHODS
// to create a new CartItem and add it to this.items
Cart.prototype.addItem = function(product, quantity) { 
  const myCartItem = new CartItem(product, quantity); 
  this.items.push(myCartItem);
};

// save the contents of the cart to localStorage
Cart.prototype.saveToLocalStorage = function() { 
  let localStorageData = JSON.stringify(this.items)
  localStorage.setItem('cart', localStorageData);
};

// remove one item from the cart
Cart.prototype.removeItem = function(product) { 
  for(let i = 0; i < cart.items.length; i++){
    if(cart.items[i].name === product.target.id){
      cart.items.splice(i, 1)
    }
  }
};

const CartItem = function(product, quantity) {
  this.product = product;
  this.quantity = quantity;
};

// Product constructor
const Product = function(filePath, name) {
  this.filePath = filePath;
  this.name = name;
  Product.allProducts.push(this);
};
Product.allProducts = [];

function generateCatalog() {
  new Product('assets/bag.jpg', 'Bag');
  new Product('assets/banana.jpg', 'Banana');
  new Product('assets/bathroom.jpg', 'Bathroom');
  new Product('assets/boots.jpg', 'Boots');
  new Product('assets/breakfast.jpg', 'Breakfast');
  new Product('assets/bubblegum.jpg', 'Bubblegum');
  new Product('assets/chair.jpg', 'Chair');
  new Product('assets/cthulhu.jpg', 'Cthulhu');
  new Product('assets/dog-duck.jpg', 'Dog-Duck');
  new Product('assets/dragon.jpg', 'Dragon');
  new Product('assets/pen.jpg', 'Pen');
  new Product('assets/pet-sweep.jpg', 'Pet Sweep');
  new Product('assets/scissors.jpg', 'Scissors');
  new Product('assets/shark.jpg', 'Shark');
  new Product('assets/sweep.png', 'Sweep');
  new Product('assets/tauntaun.jpg', 'Taun-Taun');
  new Product('assets/unicorn.jpg', 'Unicorn');
  new Product('assets/water-can.jpg', 'Water Can');
  new Product('assets/wine-glass.jpg', 'Wine Glass');
}

// UTILITY FUNCTIONS
function makeElementAndAppend(element, parent, attributes = {}){
  const e = document.createElement(element);
  for(const [key, value] of Object.entries(attributes)) {
    e[key] = value;
  }
  parent.append(e);
  return e;
}

function removeChildren(element){
  let e = document.querySelector(element)
  e.querySelectorAll('*').forEach(n => n.remove());
  return e;
}

// Initialize the app by creating the big list of products with images and names
generateCatalog();
