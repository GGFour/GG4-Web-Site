// let text = $('<h2>asdasds</h2>');
// text.appendTo('header');

// let burgerButton = $('.a-burger-menu-btn');

// $('.a-burger-menu-btn').on('click', function () {
//   text.html('random text');
// });

// doing the humburger.

const Humburger = document.querySelector('.left-nav-btns');
const openHumburger = document.querySelector('.a-burger-menu-btn');
const closeMenu = document.querySelector('.closeMenu');

openHumburger.addEventListener('click', show);
closeMenu.addEventListener('click', close);

function show() {
  Humburger.style.display = 'flex';
  Humburger.style.top = '0';
}

function close() {
  Humburger.style.top = '-100%';
}
