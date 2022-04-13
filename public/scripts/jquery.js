// function openNav() {
//   document.getElementById("myNav").style.height = "100%";
//   // document.querySelector('.left-nav-btns').style.display = 'unset';
// }

// function closeNav() {
//   document.getElementById("myNav").style.height = "0%";
// }

// // const detailPopup = document.getElementsByClassName(".detail-popup");
// // console.log(detailPopup);
// // console.log(document.getElementsByClassName("clickable-img"));

// // const clickableImg = $(".clickable-img");
// //damn, it doesn't work, I can't access individual image

// /// line before it was querySelector, the thing is query selector takes only 1 element with according name,
// /// but we need to toggle more than 1 element so I'm using getElementsByClassName
// // console.log(clickableImg);

// function showDetailPopup() {
//   $(".detail-popup").toggle("show-detail-popup");
// }
// function windowClicked(event) {
//   if (event.target === $(".detail-popup")) {
//     showDetailPopup();
//   }
// }
// $(".clickable-img").addEventListener("click", showDetailPopup);
// window.addEventListener("click", windowClicked);

// // const Cart = document.getElementById("myCart");
// // function openCart() {
// //   document.getElementById("myCart").style.width = "50%";
// // }

// function openCart() {
//   const Cart = document.getElementById("myCart");
//   const inner = document.querySelector(".inner-container");
//   Cart.classList.toggle("show-main-container");
//   inner.classList.toggle("show-inner-container");
// }

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
  const inner = document.querySelector(".inner-container");
  Cart.classList.toggle("show-main-container");
  inner.classList.toggle("show-inner-container");
}
