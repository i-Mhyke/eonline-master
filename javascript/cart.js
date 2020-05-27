
function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}
const overallPrice = document.querySelector('#overall-price');
const priceArray = new Array();

const viewCartPage = async () =>{
  const cartContainer = document.querySelector('#cart-container');
  // cartContainer.innerHTML = '';
  const response = await fetch('https://evonline.herokuapp.com/api/v1/cart/me', {
    method: 'GET',
    headers :{
      "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
  })
  const json = await response.json();
  console.log(json);
  if(json.status === 'Success' || 'success'){
    let myCartItems = json.data.products;
    let template = '';

    myCartItems.map((cartItem) =>{
      template += ` 
              <div class="col-3 table-content">
                  <h3 id="itemName">${cartItem.name}</h3>
              </div>
              <div class="col-3 table-content">
                  <h3>₦ <span class="price" id="price">${cartItem.price}</span></h3>
              </div>
              <div class="col-3 table-content">
                  <button class="decrement" id="${cartItem.price}">-</button>
                  <span class="quantity-value" id="quantity-value">1</span>
                  <button class="increment" id="${cartItem.price}">+</button>
              </div>
              <div class="col-3 table-content">
                  <h3 class="currency">₦ </h3>
                  <h3 class="total-price" id="total-price">${cartItem.price}</h3>
              </div>
          </div>
          `
          priceArray.push(cartItem.price);
        })
        cartContainer.insertAdjacentHTML("afterbegin", template);
  }
      let sum = priceArray.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue
      }, 0)
      overallPrice.innerHTML = sum;
};

const checkoutCart = async () =>{
  await viewCartPage();

  const increment = document.getElementsByClassName('increment'); 
  const decrement = document.getElementsByClassName('decrement');
  const myPrices = document.getElementsByClassName('total-price');
  
  
  function closest(el, selector) {
    var matchesFn;

    ['matches','webkitMatchesSelector','mozMatchesSelector','msMatchesSelector','oMatchesSelector'].some(function(fn) {
        if (typeof document.body[fn] == 'function') {
            matchesFn = fn;
            return true;
        }
        return false;
    })

    var parent;
    while (el) {
        parent = el.parentElement;
        if (parent && parent[matchesFn](selector)) {
            return parent;
        }
        el = parent;
    }

    return null;
}

  for(i=0; i< increment.length; i++){
        increment[i].addEventListener('click', function(){
          var quantity = closest(this, "div");
          quantity.children[1].innerHTML++;
          var total = quantity.nextElementSibling;
          var totalValue = total.children;
          totalValue[1].innerHTML = this.id * quantity.children[1].innerHTML
          
          overallPrice.innerHTML = parseInt( overallPrice.innerHTML, 10) + (parseInt(totalValue[1].innerHTML, 10)/ quantity.children[1].innerHTML);
        })
  }
  for(i=0; i< decrement.length; i++){
    decrement[i].addEventListener('click', function(){
      var quantity = closest(this, "div");
      console.log(quantity)
      if(quantity.children[1].innerHTML >= 2){
      quantity.children[1].innerHTML--;
      var total = quantity.nextElementSibling;
      var totalValue = total.children;
      console.log(totalValue)
        totalValue[1].innerHTML = this.id * quantity.children[1].innerHTML
        overallPrice.innerHTML = parseInt( overallPrice.innerHTML, 10) - (parseInt(totalValue[1].innerHTML, 10)/ quantity.children[1].innerHTML);
        }
      })
  }


  // increment.addEventListener('click', function () {
  //   // this function is executed whenever the user clicks the increment button
  //   quantityValue.innerHTML = ++x;
  //   totalPrice.innerHTML = priceNumber * quantityValue.innerHTML;
  // });
  
  // decrement.addEventListener('click', function () {
  //   // this function is executed whenever the user clicks the decrement button
  //   if(quantityValue.innerHTML >= 2){
  //       quantityValue.innerHTML = --x;
  //       totalPrice.innerHTML = priceNumber * quantityValue.innerHTML;
  //   }
  // });
};

checkoutCart();