const goods = document.querySelector(".goods");
const groupBuy = document.querySelector(".groupBuy");
const fleaMarket = document.querySelector(".fleaMarket");
const eventBanner = document.querySelector(".event");

function clickGoods(){
    window.location.href = '';
}
function clickGroupBuy(){
    window.location.href = '';
}
function clickFleaMarket(){
    window.location.href = '';
}
function clickEventBanner(){
    window.location.href = '';
}
function clickLogin(){
    window.location.href = '';
}
function clickMypage(){
    window.location.href = '';
}
function clickBasket(){
    window.location.href = '';
}

goods.addEventListener("click", clickGoods);
groupBuy.addEventListener("click", clickGroupBuy);
fleaMarket.addEventListener("click", clickFleaMarket);
eventBanner.addEventListener("click", clickEventBanner);

document.querySelector(".login").addEventListener("click", clickLogin);
document.querySelector(".mypage").addEventListener("click", clickMypage);
document.querySelector(".basket").addEventListener("click", clickBasket);