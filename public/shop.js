const items = require("./items");
console.log();
for (let i = 0; i < items.items.length; i++) {
  addItem(i);
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
  newElement.className = "item";
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
