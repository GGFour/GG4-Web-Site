// const items = require("./items");
const itemTemplate = document.querySelector("[item-template]");
// console.log(itemTemplate);
//dunno why there are `[]`, saw it on youtube, cool video
let detailId = null;
fetch("/api/items")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const itemElement = itemTemplate.content.cloneNode(true).children[0];
      // console.log(itemElement);
      const name = itemElement.querySelector(".name");
      // console.log(name);
      const price = itemElement.querySelector(".price");
      const cartImage = itemElement.querySelector(".cart-image");
      const popUpDetailImage = itemElement.querySelector(".detail-img");
      const image = itemElement.querySelector(".clickable-img");
      name.textContent = item.name;
      price.textContent = item.price;
      // cartImage.src =
      //   'assets/pixel_dungeon/items/items_' +
      //   String(item.path_to_image).padStart(2, '0') +
      //   '.png';
      popUpDetailImage.src =
        "assets/pixel_dungeon/items/items_" +
        String(item.path_to_image).padStart(2, "0") +
        ".png";
      image.src =
        "assets/pixel_dungeon/items/items_" +
        String(item.path_to_image).padStart(2, "0") +
        ".png";
      itemElement.classList.add(`${item.category}`);
      itemElement.id = item.id;
      itemElement.querySelector(".price-popup").textContent = item.price;
      itemElement.querySelector(".name-popup").textContent = item.name;
      itemElement.querySelector(".description-popup").textContent =
        item.description;

      // itemElement.querySelector(".detail-popup").id = item.id;
      itemElement.querySelector(".clickable-img").addEventListener(
        "click",
        () => {
          itemElement
            .querySelector(".detail-popup")
            .classList.toggle("show-detail-popup");
          detailId = itemElement.id;
        }
        //where the hell did you find "show-detail-popup"? it works
      );

      // console.log(document.querySelector(".products-grid"));
      document.querySelector(".products-grid").append(itemElement);
    });
    bindAddToCart();
    cartStorageFiller();
  });
// function windowClicked(event) {
//   if (event.target === detailPopup) {
//     showDetailPopup();
//   }
// }
console.log(document.getElementById(detailId), detailId);
window.addEventListener("click", function (event) {
  // console.log(document.getElementById(detailPopupId));
  if (
    event.target ==
    document.getElementById(detailId).getElementsByClassName("detail-popup")[0]
  ) {
    {
      // console.log(detailPopupId);
      document
        .getElementById(detailId)
        .getElementsByClassName("detail-popup")[0]
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
function bindAddToCart() {
  // click-event for adding to the shopping cart.
  let addToCartButton = document.getElementsByClassName("add-to-cart");
  for (let i = 0; i < addToCartButton.length; i++) {
    let button = addToCartButton[i];
    button.addEventListener("click", addToCartClicked);
  }
}
function addToLocalStorage(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  console.log(cart);
  if (cart == null) {
    cart = [{ id: `${id}`, quantity: 1 }];
  } else {
    console.log(cart);
    if (cart.find((x) => x.id === `${id}`) === undefined) {
      cart.push({ id: `${id}`, quantity: 1 });
    } else {
      cart.find((x) => x.id === `${id}`).quantity++;
    }
  }
  localStorage.setItem("cart", JSON.stringify(cart));
}
function addToCartClicked(event) {
  // you can add the price and the img src as parameters here
  let button = event.target;
  let shopItem = button.parentElement.parentElement.parentElement.parentElement;
  console.log(shopItem);
  addItemToCart(shopItem);
  addToLocalStorage(shopItem.id);
  updateCartTotal();
}
// here i work with localStorage and with array containing all items added to cart

function cartStorageFiller() {
  let cartItems = JSON.parse(localStorage.getItem("cart"));
  cartItems.forEach(function (item) {
    console.log(item.id);
    addItemToCart(document.getElementById(`${item.id}`), item.quantity);
  });
}

function addItemToCart(item, quantity) {
  let name = item.getElementsByClassName("name")[0].innerText;
  let price = item.getElementsByClassName("price")[0].innerText;
  //just copipasted iamgeSrc, it works
  let imageSrc = $(item).find("img").attr("src");
  let CartElement = document.createElement("div");
  CartElement.classList.add("mycart-content");
  let cartItems = document.getElementsByClassName("all-items")[0];
  let CartElementContent = `
          <div>
              <img src="${imageSrc}">
            <p class="product-name">${name}</p>
          </div>
          <div>
            <input type="number" value="${
              quantity || 1
            }" class="product-quantity" onchange='quantityChanged'/>
            <p class="remove-btn" onclick='RemoveCartItem'>Remove</p>
          </div>
          <div>
            <p class="product-price">${price + "ø"}</p>
          </div>
  `;
  CartElement.innerHTML = CartElementContent;
  // let cartItemsNames = item.getElementsByClassName("name");
  // for (let i = 0; i < cartItemsNames.length; i++) {
  //   if (cartItemsNames[i].innerText != name) {
  //     cartItems.append(CartElement);
  //   }
  // }
  cartItems.append(CartElement);
  CartElement.getElementsByClassName("remove-btn")[0].addEventListener(
    "click",
    removeCartItem
  );
  CartElement.getElementsByClassName("product-quantity")[0].addEventListener(
    "change",
    quantityChanged
  );
  countUp();
}

// click event for removing from the shopping cart
// let RemoveItem = document.getElementsByClassName("remove-btn");
// for (let i = 0; i < RemoveItem.length; i++) {
//   let button = RemoveItem[i];
//   button.addEventListener("click", removeCartItem);
// }
// function for removing the targeted item.
function removeCartItem(event) {
  buttonclicked = event.target;
  buttonclicked.parentElement.parentElement.remove();
  updateCartTotal();
  countDown();
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
  updateCartTotal();
}

// function for updating the total price.
function updateCartTotal() {
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
  //document.getElementsByClassName("total-price")[0].innerText = "ø" + total;
  document.querySelector(".total-price").innerText = total + "ø";
}

let PressBasket = document.querySelector(".cart-btn");
let CartInput = document.querySelector(".product-info");
let PressAddToCard = document.getElementsByClassName("add-to-cart");
for (let i = 0; i < PressAddToCard.length; i++) {
  let AddingButton = PressAddToCard[i];
  AddingButton.addEventListener("click", countUp);
}
function countDown() {
  let item = Number(PressBasket.getAttribute("data-count") || 0);
  PressBasket.setAttribute("data-count", item - 1);
  PressBasket.classList.add("on");
}
function countUp() {
  let item = Number(PressBasket.getAttribute("data-count") || 0);
  PressBasket.setAttribute("data-count", item + 1);
  PressBasket.classList.add("on");
}
