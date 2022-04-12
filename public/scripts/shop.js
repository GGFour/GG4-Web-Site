// const items = require("./items");
const itemTemplate = document.querySelector("[item-template]");
console.log(itemTemplate);
//dunno why there are `[]`, saw it on youtube, cool video
fetch("/api/items")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((item) => {
      const itemElement = itemTemplate.content.cloneNode(true).children[0];
      console.log(itemElement);
      const name = itemElement.querySelector(".name");
      console.log(name);
      const price = itemElement.querySelector(".price");

      name.textContent = item.name;
      price.textContent = item.price;
      console.log(document.querySelector(".products-grid"));
      document.querySelector(".products-grid").append(itemElement);
    });
  });

function leaveOneCategory(category) {
  for (let i = 0; i < items.categories.length; i) {
    if (category !== items.categories[i]) {
      hideCategory(items.categories[i]);
    } else {
      showCategory(items.categories[i]);
    }
  }
}
function showAll() {
  document.getElementsByClassName("item").classlist.remove("js-is-hidden"); //not sure about that, maybe need to use for loop
}
function hideCategory(category) {
  document.getElementsByClassName("category").classlist.add("js-is-hidden");
}
function showCategory(category) {
  document.getElementsByClassName("category").classlist.remove("js-is-hidden");
}
function addItem(index) {
  ///just adding items in detail view using data from variable
  let newElement = document.createElement("div");
  newElement.innerHTML = `
    <div class="image">
      <img src="./images/cat.jpg">
    </div>
    <div class="name">${items.items[index].name}</div>
    <div class="price">69€</div>
  `;
  newElement.className = `item ${items.items[index].category}`; ///here we should edit to make class and category match, the hell i just typed
  newElement.id = index;
  newElement.onclick = () => showDetailView(items.items[index], index);
  document.getElementsByClassName("products-grid")[0].appendChild(newElement);
}
function showDetailView(item, index) {
  let newElement = document.createElement("div");
  newElement.innerHTML = `
    <div class="image">
        <img src="./images/cat.jpg">
    </div>
    <div class="name">${item.name}</div>
    <div class="price">69€</div>
    <div class="description">${item.description}</div>
    <button class="btn btn-primary shop-item-add" type="button" id=${index}>Add to cart</button>
    `;
  newElement.className = "detailedItem";
  newElement.id = index;

  document
    .getElementsByClassName("products-grid")[0]
    .getElementById(index)
    .appendChild(newElement);
  document.addEventListener("click", function (event) {
    if (!event.target.closest(".detailedItem")) {
      document.getElementsByClassName("detailedItem")[0].remove();
    }
  });
}
