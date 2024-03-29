// const items = require("./items");
const itemTemplate = document.querySelector("[item-template]");
const searchInput = document.querySelector("[data-search]");
// console.log(itemTemplate);
//dunno why there are `[]`, saw it on youtube, cool video
let detailId = null;
fetch("/api/items")
  .then((res) => res.json())
  .then((data) => {
    cartStorageFiller();
    data.forEach((item) => {
      const itemElement = itemTemplate.content.cloneNode(true).children[0];
      // console.log(itemElement);
      const name = itemElement.querySelector(".name");
      // console.log(name);
      const price = itemElement.querySelector(".price");
      const cartImage = itemElement.querySelector(".cart-image");
      const popUpDetailImage = itemElement.querySelector(".detail-img");
      const image = itemElement.querySelector(".clickable-img");
      name.textContent = item.name.charAt(0).toUpperCase() + item.name.slice(1);
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
          // test
          let eventsArray = ["click", "touchstart", "touchend"];
          eventsArray.forEach(function (event) {
            window.addEventListener(event, hideDetailPopup);
          });
          // end of tesr
          // window.addEventListener("click", hideDetailPopup);
        }
        //where the hell did you find "show-detail-popup"? it works
      );

      // console.log(document.querySelector(".products-grid"));
      document.querySelector(".products-grid").append(itemElement);
    });
    bindAddToCart();
  });
// function windowClicked(event) {
//   if (event.target === detailPopup) {
//     showDetailPopup();
//   }
// }
// console.log(document.getElementById(detailId), detailId);
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  const items = document.querySelectorAll(".shop-item");
  // console.log(items);
  items.forEach((item) => {
    const isVisible = item
      .getElementsByClassName("name")[0]
      .innerText.toLowerCase()
      .includes(value);
    item.classList.toggle("hide", !isVisible);
    item.classList.toggle("grid-div", isVisible);
  });
});
function hideDetailPopup(event) {
  // console.log("detail popup hider triggered!");
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
      // test
      let eventsArray = ["click", "touchstart", "touchend"];
      eventsArray.forEach(function (event) {
        window.removeEventListener(event, hideDetailPopup);
      });
      // end of tesr
      // window.removeEventListener("click", hideDetailPopup);
    }
  }
}
function showDetailPopup() {
  document.getElementsByClassName("popup")[0].classList.remove("js-is-hidden");
}
//just copied from jquery.js, it works well
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
    // console.log(el);
    el.style.position = "initial";
    el.style.visibility = "visible";
    el.querySelector(`.clickable-img`).style.transitionDuration = "0.3s";
  });
  if (screen.width <= 760) {
    $("#all-categories").slideToggle("slow");
  }
}
function showAll() {
  document.querySelectorAll(`.grid-div`).forEach(function (el) {
    // console.log(el);
    el.style.visibility = "visible";
    el.style.position = "initial";
    el.querySelector(`.clickable-img`).style.transitionDuration = "0.3s";
  });
  if (screen.width <= 760) {
    $("#all-categories").slideToggle("slow");
  }
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
$("#category-header div").click(function () {
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
function addToLocalStorageCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  // console.log(cart);
  if (cart == null) {
    cart = [{ id: `${id}`, quantity: 1 }];
  } else {
    // console.log(cart);
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
  // console.log(shopItem);
  updateCartTotal();
  addToLocalStorageCart(shopItem.id);
  addItemToLocalStorage(shopItem);
}
function addItemToLocalStorage(item) {
  //write a function which will push item item details to local storage
  if (
    localStorage.getItem("items") == undefined ||
    localStorage.getItem("items") == null
  ) {
    // console.log("Не туда вставляешь!");
    let items = [];
    localStorage.setItem("items", JSON.stringify(items));
  }
  let items = JSON.parse(localStorage.getItem("items"));
  if (items[items.findIndex((x) => x.id === item.id)] === undefined) {
    // console.log(items);
    items.push({
      id: item.id,
      name: item.querySelector(".name").innerText,
      price: item.querySelector(".price").innerText,
      img: item.querySelector(".clickable-img").src,
    });
    localStorage.setItem("items", JSON.stringify(items));
  }
  addItemToCart(
    items[items.length - 1],
    JSON.parse(localStorage.getItem("cart")).find((x) => x.id === `${item.id}`)
      .quantity
  );
}
// here i work with localStorage and with array containing all items added to cart

// click event for removing from the shopping cart
// let RemoveItem = document.getElementsByClassName("remove-btn");
// for (let i = 0; i < RemoveItem.length; i++) {
//   let button = RemoveItem[i];
//   button.addEventListener("click", removeCartItem);
// }
// function for removing the targeted item.
