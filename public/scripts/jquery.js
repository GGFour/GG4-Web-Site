function openNav() {
  document.getElementById("myNav").style.height = "100%";
  // document.querySelector('.left-nav-btns').style.display = 'unset';
}

function closeNav() {
  document.getElementById("myNav").style.height = "0%";
}

const detailPopup = document.querySelector(".detail-popup");
const clickableImg = document.querySelector(".clickable-img");
function showDetailPopup() {
  detailPopup.classList.toggle("show-detail-popup");
}
function windowClicked(event) {
  if (event.target === detailPopup) {
    showDetailPopup();
  }
}
clickableImg.addEventListener("click", showDetailPopup);
window.addEventListener("click", windowClicked);

// const Cart = document.getElementById("myCart");
// function openCart() {
//   document.getElementById("myCart").style.width = "50%";
// }

function openCart() {
  const Cart = document.getElementById("myCart");
  Cart.classList.toggle("show-main-container");
}
