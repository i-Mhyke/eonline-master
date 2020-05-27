const productContainer = document.querySelector('#product-row');
const messageParent = document.querySelector('#message');

function openNav() {
  document.getElementById("mySidenav").style.width = "300px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}

const getProducts = async () =>{
        const response = await fetch('https://evonline.herokuapp.com/api/v1/products',{
          method: 'GET',
          headers :{
              "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        })
        const json = await response.json();
        console.log(json)
         if(json.status = 'success' || 'Success'){
          let products = json.data;
          let template = '';
           products.map((product) =>{
            template += `<div class="col-3 the-products">
            <div class="product-card">
                <div id="product-id" style="display:none">${product._id}</div>
                <img class="product-card-img" height="200rem" src="https://evonline.herokuapp.com/api/v1/${product.image}">
                <h4 class="product-name"> ${product.name}</h4>
                <h5 class="product-price"> ₦ <span>${product.price} <span> </h5>
                <div class="product-card-footer">
                <div class="confirm"></div>
                <a style="color: #e8914a;" id="${product._id}" class="cart-button icon">Add to cart</a>
                <a href="#" style="color: crimson;" class="icon"><i class="far fa-heart"></i></a>
                </div>
            </div>
          </div>
          `
        })
        productContainer.insertAdjacentHTML("afterbegin", template);
      }
};

const addProductToCart = async () =>{
      await getProducts();
      const confirmMessage = document.getElementsByClassName('confirm')
      const myProducts = document.getElementsByClassName('cart-button');
      for(i= 0; i< myProducts.length; i++){
        myProducts[i].addEventListener("click", function() {
              addToCart(this.id);
      });
    }
    const addToCart = async (theProduct) =>{
        const response = await fetch(`https://evonline.herokuapp.com/api/v1/cart/me/${theProduct}`, {
          method: 'PUT',
          headers :{
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
        })  
        const json = await response.json();
        console.log(json);
        if(json.status === "Fail" || json.status === "fail"){
          console.log('error');
          let error = json.error;
          let template = '';
          template+=`<h2 class=".alert .alert-primary .fixed-top">${error} Please login to add product to cart </h2>`
          messageParent.insertAdjacentHTML('afterbegin', template)
        }
        else if(json.status === "success" || json.status === "Success"){
          confirmMessage.innerHTML = 'Product Successfully Added to Cart'
          console.log("good");
        };
    }
}
addProductToCart();























                        