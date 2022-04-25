//this file is conflict-free(we hope so) light version of shop.js

function openNav() {
  // copy login buttons to target div
  let buttons = document
    .querySelector(".right-nav-btns .signinup-btns")
    .cloneNode(true);
  document.querySelector(".hamburger-icon .left-nav-btns").appendChild(buttons);
  document.getElementById("myNav").style.height = "100%";
  // document.querySelector('.left-nav-btns').style.display = 'unset';
}
function closeNav() {
  document.getElementById("myNav").style.height = "0%";
  // remove login buttons
  document
    .querySelector(".hamburger-icon .left-nav-btns .signinup-btns")
    .remove();
}
cartStorageFiller();

//here is stuff for cart handling
function openCart() {
  const Cart = document.getElementById("myCart");
  const inner = document.querySelector(".inner-container");
  Cart.classList.toggle("show-main-container");
  inner.classList.toggle("show-inner-container");
}
function cartStorageFiller() {
  let cartItems = JSON.parse(localStorage.getItem("cart"));
  if (cartItems != null) {
    cartItems.forEach(function (item) {
      console.log(item);
      addItemToCart(
        JSON.parse(localStorage.getItem("items")).find(
          (x) => x.id === `${item.id}`
        ),
        item.quantity
      );
    });
  }
}
function addItemToCart(itemData, quantity) {
  let cartItems = document.getElementsByClassName("all-items")[0];
  if (cartItems.querySelector(`#cart_${itemData.id}`) == undefined) {
    console.log(cartItems.querySelector(`cart_${itemData.id}`));
    let name = itemData.name;
    let price = itemData.price;
    let imageSrc = itemData.img;
    let CartElement = document.createElement("div");
    CartElement.id = "cart_" + itemData.id;
    CartElement.classList.add("mycart-content");
    let CartElementContent = `
            <div class="img-name">
                <img src="${imageSrc}">
              <p class="product-name">${name}</p>
            </div>
            <div>
              <input type="number" value="${
                quantity || 1
              }" class="product-quantity" onchange='quantityChanged'/>
              <p class="remove-btn" onclick='removeCartItem'>Remove</p>
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
  } else {
    cartItems
      .querySelector(`#cart_${itemData.id}`)
      .getElementsByClassName("product-quantity")[0].value = quantity;
  }
  updateCartTotal();
}
function removeCartItem(event) {
  buttonclicked = event.target;
  buttonclicked.parentElement.parentElement.remove();
  updateCartTotal();
  cart = JSON.parse(localStorage.getItem("cart"));
  items = JSON.parse(localStorage.getItem("items"));
  cart.splice(
    cart.findIndex(
      (x) => x.id === `${buttonclicked.parentElement.parentElement.id.slice(5)}`
    ),
    1
  );
  items.splice(
    items.findIndex(
      (x) => x.id === `${buttonclicked.parentElement.parentElement.id.slice(5)}`
    ),
    1
  );
  localStorage.setItem("items", JSON.stringify(items));
  localStorage.setItem("cart", JSON.stringify(cart));
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
  cartItems = JSON.parse(localStorage.getItem("cart"));
  cartItems[
    cartItems.findIndex(
      (x) => x.id === `${input.parentElement.parentElement.id.slice(5)}`
    )
  ].quantity = input.value;
  localStorage.setItem("cart", JSON.stringify(cartItems));
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

let CartInput = document.querySelector(".product-info");
let PressAddToCard = document.getElementsByClassName("add-to-cart");
for (let i = 0; i < PressAddToCard.length; i++) {
  let AddingButton = PressAddToCard[i];
  AddingButton.addEventListener("click", countUp);
}
function countDown() {
  let PressBasket = document.querySelector(".cart-btn");
  let item = Number(PressBasket.getAttribute("data-count") || 0);
  PressBasket.setAttribute("data-count", item - 1);
  PressBasket.classList.add("on");
}
function countUp() {
  let PressBasket = document.querySelector(".cart-btn");

  let item = Number(PressBasket.getAttribute("data-count") || 0);
  PressBasket.setAttribute("data-count", item + 1);
  PressBasket.classList.add("on");
}

// const logo = document.getElementsByClassName("logo-div")[0];
// logo.addEventListener("click", function () {
//   console.log("logo clicked!");
//   document
//     .getElementsByClassName("user-profile")[0]
//     .classList.add("show-user-profile");
// });
function openProfile() {
  document
    .getElementsByClassName("user-profile")[0]
    .classList.add("show-user-profile");
  window.addEventListener("click", closeProfilePopup);
}
function closeProfilePopup() {
  // console.log(document.getElementById(detailPopupId));
  console.log("event listener triggered");

  if (
    event.target == document.getElementsByClassName("user-profile")[0]
    // ||
    // event.target == document.getElementsByClassName("logo-img")[0]
  ) {
    document
      .getElementsByClassName("user-profile")[0]
      .classList.remove("show-user-profile");
    window.removeEventListener("click", closeProfilePopup);
  }
}
// window.addEventListener("click", function () {
//   document
//     .getElementsByClassName("user-profile")[0]
//     .classList.remove("show-user-profile");
// });

const darkModeToggle = document.getElementById("checkbox");
let darkMode = localStorage.getItem("dark-mode");
darkModeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark-theme");
});
