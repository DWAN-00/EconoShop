/*const goods = document.querySelector(".goods");
const groupbuy = document.querySelector(".groupbuy");
const fleamarket = document.querySelector(".fleamarket");
const eventbanner = document.querySelector(".event");*/


/*
function clickGoods() {
  window.location.href = "econoshop_goods.product";
}
function clickGroupbuy() {
  window.location.href = "econoshop_groupbuy.product";
}
function clickFleamarket() {
  window.location.href = "econoshop_fleamarket.product";
}
function clickEventbanner() {
  window.location.href = "econoshop_event.product";
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
document.querySelector(".btn-write").addEventListener("click", clickWrite);*/
const products = [
  { name: '사과', price: '30,000원', image: '../img/apple.jpg' },
  { name: '스폰지밥', price: '30,000원', image: '../img/spongebob.jpg' },
  { name: '뚱이', price: '30,000원', image: '../img/patrick.jpg' },
];

const productblock = document.querySelector(".product-block");

const productHTML = products.map(product => `
  <div class="product-div">
    <div>
      <img class="product-img" src="${product.image}" alt="${product.name}이미지">
    </div>
    <div class="contents">
      <span class="name">${product.name}</span>
      <span class="price">${product.price}</span>
    </div>
  </div>
`);
console.log(productHTML);
const allProductsHTML = productHTML.join("");
console.log(allProductsHTML);
productblock.innerHTML = allProductsHTML;
