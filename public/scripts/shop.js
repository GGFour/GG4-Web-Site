// const items = require("./items");
const itemTemplate = document.querySelector("[item-template]");
// console.log(itemTemplate);
//dunno why there are `[]`, saw it on youtube, cool video
let detailPopupId = null;

fetch("/api/items")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const itemElement = itemTemplate.content.cloneNode(true).children[0];
      // console.log(itemElement);
      const name = itemElement.querySelector(".name");
      // console.log(name);
      const price = itemElement.querySelector(".price");
      name.textContent = item.name;
      price.textContent = item.price;
      itemElement.classList.add(`${item.category}`);
      itemElement.querySelector(".price-popup").textContent = item.price;
      itemElement.querySelector(".name-popup").textContent = item.name;
      itemElement.querySelector(".description-popup").textContent =
        item.description;

      itemElement.querySelector(".detail-popup").id = item.id;
      itemElement.querySelector(".clickable-img").addEventListener(
        "click",
        () => {
          itemElement
            .querySelector(".detail-popup")
            .classList.toggle("show-detail-popup");
          detailPopupId = itemElement.querySelector(".detail-popup").id;
        }
        //where the hell did you find "show-detail-popup"? it works
      );

      // console.log(document.querySelector(".products-grid"));
      document.querySelector(".products-grid").append(itemElement);
    });
  });
// function windowClicked(event) {
//   if (event.target === detailPopup) {
//     showDetailPopup();
//   }
// }
console.log(document.getElementById(detailPopupId), detailPopupId);
window.addEventListener("click", function (event) {
  // console.log(document.getElementById(detailPopupId));
  if (event.target == document.getElementById(detailPopupId)) {
    {
      // console.log(detailPopupId);
      document
        .getElementById(detailPopupId)
        .classList.remove("show-detail-popup");
    }
  }
});

function showDetailPopup() {
  document.getElementsByClassName("popup")[0].classList.remove("js-is-hidden");
}
//just copied from jquery.js, it works well
function openCart() {
  const Cart = document.getElementById("myCart");
  const inner = document.querySelector(".inner-container");
  Cart.classList.toggle("show-main-container");
  inner.classList.toggle("show-inner-container");
}
function openNav() {
  document.getElementById("myNav").style.height = "100%";
  // document.querySelector('.left-nav-btns').style.display = 'unset';
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}
///didn't work with code below yet
////////
function leaveOneCategory(category) {
  document.querySelectorAll(`.grid-div`).forEach(function (el) {
    // console.log(el);
    el.style.visibility = "hidden";
    el.querySelector(`.clickable-img`).style.transitionDuration = "0s";
    el.style.top = "0";
    el.style.left = "0";
    el.style.position = "absolute";

    //order is putting the elements in order, from 1 to 2 so elements with order 2 are lower and elements with order 1 are higher
  });
  document.querySelectorAll(`.${category}`).forEach(function (el) {
    console.log(el);
    el.style.position = "initial";
    el.style.visibility = "visible";
    el.querySelector(`.clickable-img`).style.transitionDuration = "0.3s";
  });
}
function showAll() {
  document.querySelectorAll(`.grid-div`).forEach(function (el) {
    // console.log(el);
    el.style.visibility = "visible";
    el.style.position = "initial";
  });
  //not sure about that, maybe need to use for loop
}
// function addItem(index) {
//   ///just adding items in detail view using data from variable
//   let newElement = document.createElement("div");
//   newElement.innerHTML = `
//     <div class="image">
//       <img src="./images/cat.jpg">
//     </div>
//     <div class="name">${items.items[index].name}</div>
//     <div class="price">69€</div>
//   `;
//   newElement.className = `item ${items.items[index].category}`; ///here we should edit to make class and category match, the hell i just typed
//   newElement.id = index;
//   newElement.onclick = () => showDetailView(items.items[index], index);
//   document.getElementsByClassName("products-grid")[0].appendChild(newElement);
// }
// function showDetailView(item, index) {
//   let newElement = document.createElement("div");
//   newElement.innerHTML = `
//     <div class="image">
//         <img src="./images/cat.jpg">
//     </div>
//     <div class="name">${item.name}</div>
//     <div class="price">69€</div>
//     <div class="description">${item.description}</div>
//     <button class="btn btn-primary shop-item-add" type="button" id=${index}>Add to cart</button>
//     `;
//   newElement.className = "detailedItem";
//   newElement.id = index;

// document
//   .getElementsByClassName("products-grid")[0]
//   .getElementById(index)
//   .appendChild(newElement);
// document.addEventListener("click", function (event) {
//   if (!event.target.closest(".detailedItem")) {
//     document.getElementsByClassName("detailedItem")[0].remove();
//   }
// });
// }

// showing a slidedown for mobile categories
$("#category-header").click(function () {
  $("#all-categories").slideToggle("slow");
});

// implementing add-to-cart functionality

// click event for adding to the shopping cart.
let addToCartButton = document.getElementsByClassName("add-to-cart");
for (let i = 0; i < addToCartButton.length; i++) {
  let button = addToCartButton[i];
  button.addEventListener("click", AddToCartClicked);
}

function AddToCartClicked(event) {
  // you can add the price and the img src as parameters here
  let button = event.target;
  let shopItem = button.parentElement.parentElement.parentElement.parentElement;
  let name = shopItem.getElementsByClassName("product-name")[0].innerText;
  AddItemToCart(name);
  UpdateCartTotal();
}

function AddItemToCart(name) {
  let CartElement = document.createElement("div");
  CartElement.classList.add("mycart-content");
  let cartItems = document.getElementsByClassName("inner-container")[0];
  let CartElementContent = `
          <div>
              <img src="./images/cat.jpg">
            <p class="product-name">${name}</p>
          </div>
          <div>
            <input type="number" value="1" class="product-quantity" />
            <p class="remove-btn">Remove</p>
          </div>
          <div>
            <p class="product-price">P.price</p>
          </div>
  `;
  CartElement.innerHTML = CartElementContent;
  cartItems.append(CartElement);
  CartElement.getElementsByClassName("remove-btn")[0].addEventListener(
    "click",
    RemoveCartItem
  );
  CartElement.getElementsByClassName("product-quantity")[0].addEventListener(
    "change",
    quantityChanged
  );
}

// click event for removing from the shopping cart
let RemoveItem = document.getElementsByClassName("remove-btn");
for (let i = 0; i < RemoveItem.length; i++) {
  let button = RemoveItem[i];
  button.addEventListener("click", RemoveCartItem);
}
// function for removing the targeted item.
function RemoveCartItem(event) {
  buttonclicked = event.target;
  buttonclicked.parentElement.parentElement.remove();
  UpdateCartTotal();
}
// change event to quantitiy input.
let quantityInputs = document.getElementsByClassName("product-quantity");
for (let i = 0; i < quantityInputs.length; i++) {
  let input = quantityInputs[i];
  input.addEventListener("change", quantityChanged);
}

// fucntion to let the item quantity increase no less than one
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  UpdateCartTotal();
}

// function for updating the total price.
function UpdateCartTotal() {
  let AddedItemContent = document.getElementsByClassName("mycart-content");
  let total = 0;
  for (let i = 0; i < AddedItemContent.length; i++) {
    let singleItem = AddedItemContent[i];
    let priceElement = singleItem.getElementsByClassName("product-price")[0];
    let quantityElement =
      singleItem.getElementsByClassName("product-quantity")[0];
    let price = parseFloat(priceElement.innerText.replace("ø", ""));
    let quantity = quantityElement.value;
    total = total + price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("sum-price")[0].innerText = "ø" + total;
}
