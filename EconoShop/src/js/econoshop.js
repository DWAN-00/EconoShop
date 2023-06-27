const goods = document.querySelector(".goods");
const groupbuy = document.querySelector(".groupbuy");
const fleamarket = document.querySelector(".fleamarket");
const eventbanner = document.querySelector(".event");

function clickGoods() {
  window.location.href = "http://localhost:3000/goods";
}
function clickGroupbuy() {
  window.location.href = "http://localhost:3000/groupBuy";
}
function clickFleamarket() {
  window.location.href = "http://localhost:3000/fleaMarket";
}
function clickEventbanner() {
  window.location.href = "http://localhost:3000/event";
}
function clickLogin() {
  window.location.href = "http://localhost:3000/login";
}
function clickMypage() {
  window.location.href = "http://localhost:3000/mypage";
}
function clickBasket() {
  window.location.href = "http://localhost:3000/cart";
}
function clickWrite() {
  window.location.href = "";
}

goods.addEventListener("click", clickGoods);
groupbuy.addEventListener("click", clickGroupbuy);
fleamarket.addEventListener("click", clickFleamarket);
eventbanner.addEventListener("click", clickEventbanner);

document.querySelector(".login").addEventListener("click", clickLogin);
document.querySelector(".mypage").addEventListener("click", clickMypage);
document.querySelector(".basket").addEventListener("click", clickBasket);
document.querySelector(".btn-write").addEventListener("click", clickWrite);
