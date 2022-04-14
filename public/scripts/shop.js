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
    el.style.order = 2;
    //order is putting the elements in order, from 1 to 2 so elements with order 2 are lower and elements with order 1 are higher
  });
  document.querySelectorAll(`.${category}`).forEach(function (el) {
    console.log(el);
    el.style.visibility = "visible";
    el.style.order = 1;
  });
}
function showAll() {
  document.querySelectorAll(`.grid-div`).forEach(function (el) {
    // console.log(el);
    el.style.visibility = "visible";
    el.style.order = 1;
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
