
"use strict";
let cart = [];
let cartTotal = 0;
const cartDom = document.querySelector(".cart");
const cartBox = document.querySelector("#cart");
const cartBoxEnd = document.querySelector("#cartEnd");


const addtocartbtnDom = document.querySelectorAll('[data-action="add-to-cart"]');
addtocartbtnDom.forEach(addtocartbtnDom => {
  addtocartbtnDom.addEventListener("click", () => {


    // document.querySelector("#emptyCart").classList.add("d-none");

    const productDom = addtocartbtnDom.parentNode.parentNode.parentNode;
    // alert("2")
    const product = {
      img: productDom.querySelector(".product-img").getAttribute("src"),
      name: productDom.querySelector(".product-heading").innerText,
      price: productDom.querySelector(".intprice").innerText,
      quantity: 1
    };
    // alert("chintn")





    const IsinCart = cart.filter(cartItem => cartItem.name === product.name).length > 0;
    if (IsinCart === false) {
      cartBox.insertAdjacentHTML("afterbegin", `
              <div class="d-flex flex-row shadow-sm card cart-items mt-2 mb-3">
                <div class="p-2">
                  <img src="${product.img}" alt="${product.name}" style="max-width: 50px;" />
                </div>
                <div class="p-2 mt-3">
                  <p class="text-info cart_item_name">${product.name}</p>
                </div>
                <div class="p-2 mt-3">
                  <p class="text-success cart_item_price">${product.price}</p>
                  </div>
                  <div class="p-2 mt-3 ml-auto">
                    <button class="btn badge badge-secondary" type="button" data-action="increase-item">&plus;
                </div>
                <div class="p-2 mt-3">
                  <p class="text-success cart_item_quantity">${product.quantity}</p>
                </div>
                <div class="p-2 mt-3">
                  <button class="btn badge badge-info" type="button" data-action="decrease-item">&minus;
                </div>
                <div class="p-2 mt-3">
                  <button class="btn badge badge-danger" type="button" data-action="remove-item">&times;
                </div>
              </div>
              `);
    }

    if (document.querySelector('.cart-footer') === null) {
      cartBoxEnd.insertAdjacentHTML("afterend", `
      <div>
        <div class="d-flex flex-row shadow-sm card cart-footer mt-2 mb-3">
            <div class="p-2">
              <button class="btn badge-danger" type="button" data-action="clear-cart">Clear Cart
            </div>
            <div class="p-2 ml-auto">
              <button class="btn badge-dark" type="button" data-action="check-out">Pay <span class="pay"></span> 
                &#10137;
            </div>
          </div>
        </div>
    
    `);
    }

    addtocartbtnDom.innerText = "In cart";
    addtocartbtnDom.disabled = true;
    cart.push(product);
    chk();

    const cartItemsDom = cartBox.querySelectorAll(".cart-items");
    cartItemsDom.forEach(cartItemDom => {

      if (cartItemDom.querySelector(".cart_item_name").innerText === product.name) {

        cartTotal += parseInt(cartItemDom.querySelector(".cart_item_quantity").innerText)
          * parseInt(cartItemDom.querySelector(".cart_item_price").innerText);
        document.querySelector('.pay').innerText = cartTotal + " Rs.";

        // increase item in cart
        cartItemDom.querySelector('[data-action="increase-item"]').addEventListener("click", () => {
          cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
              cartItemDom.querySelector(".cart_item_quantity").innerText = ++cartItem.quantity;
              cartItemDom.querySelector(".cart_item_price").innerText = parseInt(cartItem.quantity) *
                parseInt(cartItem.price) + " Rs.";
              cartTotal += parseInt(cartItem.price)
              document.querySelector('.pay').innerText = cartTotal + " Rs.";
            }
          });
        });

        // decrease item in cart
        cartItemDom.querySelector('[data-action="decrease-item"]').addEventListener("click", () => {
          cart.forEach(cartItem => {
            if (cartItem.name === product.name) {
              if (cartItem.quantity > 1) {
                cartItemDom.querySelector(".cart_item_quantity").innerText = --cartItem.quantity;
                cartItemDom.querySelector(".cart_item_price").innerText = parseInt(cartItem.quantity) *
                  parseInt(cartItem.price) + " Rs.";
                cartTotal -= parseInt(cartItem.price)
                document.querySelector('.pay').innerText = cartTotal + " Rs.";
              }
            }
          });
        });

        //remove item from cart
        cartItemDom.querySelector('[data-action="remove-item"]').addEventListener("click", () => {
          cart.forEach(cartItem => {

            if (cartItem.name === product.name) {
              cartTotal -= parseInt(cartItemDom.querySelector(".cart_item_price").innerText);
              document.querySelector('.pay').innerText = cartTotal + " Rs.";
              cartItemDom.remove();
              cart = cart.filter(cartItem => cartItem.name !== product.name);
              addtocartbtnDom.innerText = "Add to cart";
              addtocartbtnDom.disabled = false;
            }
            chk(); //check if cart is empty or not
            if (cart.length < 1) {
              document.querySelector('.cart-footer').remove();
            }
          });
        });

        //clear cart
        document.querySelector('[data-action="clear-cart"]').addEventListener("click", () => {


          cartItemDom.remove();
          cart = [];
          cartTotal = 0;
          if (document.querySelector('.cart-footer') !== null) {
            document.querySelector('.cart-footer').remove();
          }
          addtocartbtnDom.innerText = "Add to cart";
          addtocartbtnDom.disabled = false;
          chk(); //check if cart is empty or not
        });

        document.querySelector('[data-action="check-out"]').addEventListener("click", () => {
          if (document.getElementById('paypal-form') === null) {
            checkOut();
          }
        });
      }
    });
  }
  );

});


function checkOut() {
  // redirect to form.html
  window.location.href = "signup.html";
}


document.getElementById("cart-icon").addEventListener("click", () => {
  document.getElementById("cart").classList.toggle("d-none");
});
document.getElementById("mm_menu").addEventListener("click", () => {
  document.getElementById("navbarsExample04").classList.toggle("d-none");
});


function chk() {
  // alert(cart.length);
  if (cart.length <= 0) {
    document.getElementById("emptyCart").classList.remove("d-none");
  }
  else {
    document.getElementById("emptyCart").classList.add("d-none");
  }

}


function store(){

    var name = document.getElementById('reg-fname');
    var pw = document.getElementById('Reg-pass');
    var email=document.getElementById('Reg-email');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(email.value.length == 0){
        alert('Please fill in email');
        return false;
    }else if(pw.value.length == 0){
        alert('Please fill in password');
        return false;
    }else if(email.value.length == 0 && email.value.length == 0){
        alert('Please fill in email and password');
        return false;
    }else if(pw.value.length > 14){
        alert('Max of 8');
        return false;
    }else if(!pw.value.match(numbers)){
        alert('please add 1 number');
        return false;
    }else if(!pw.value.match(upperCaseLetters)){
        alert('please add 1 uppercase letter');
        return false;
    }else if(!pw.value.match(lowerCaseLetters)){
        alert('please add 1 lovercase letter');
        return false;

    }else{
       
        alert('Your account has been created');
        return true;
    }
}

//checking
function check(){
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    var userName = document.getElementById('email');
    var userPw = document.getElementById('passw');
    var userRemember = document.getElementById("rememberMe");

    if(userName.value == storedName && userPw.value == storedPw){
        alert('You are logged in.');
        return true;
    }else{
        alert('Error on login');
        return false;
    }
}