const goods = document.querySelector(".goods");
const groupbuy = document.querySelector(".groupbuy");
const fleamarket = document.querySelector(".fleamarket");
const eventbanner = document.querySelector(".event");

function clickGoods() {
  window.location.href = "econoshop_goods.html";
}
function clickGroupbuy() {
  window.location.href = "econoshop_groupbuy.html";
}
function clickFleamarket() {
  window.location.href = "econoshop_fleamarket.html";
}
function clickEventbanner() {
  window.location.href = "econoshop_event.html";
}
function clickLogin() {
  window.location.href = "login.ejs";
}
function clickMypage() {
  window.location.href = "mypage.ejs";
}
function clickBasket() {
  window.location.href = "";
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
