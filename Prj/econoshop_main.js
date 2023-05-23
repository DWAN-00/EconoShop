const goods = document.querySelector(".goods");
const groupBuy = document.querySelector(".groupBuy");
const fleaMarket = document.querySelector(".fleaMarket");
const eventBanner = document.querySelector(".event");

function onGoods(){ 
    goods.style.color="#1369ea";
    goods.style.textDecoration="underline";
};
function outGoods() { 
    goods.style.color="black"
    goods.style.textDecoration="none"
};
function onGroupBuy(){ 
    groupBuy.style.color="#1369ea";
    groupBuy.style.textDecoration="underline";
};
function outGroupBuy(){ 
    groupBuy.style.color="black";
    groupBuy.style.textDecoration="none";
};
function onFleaMarket(){ 
    fleaMarket.style.color="#1369ea";
    fleaMarket.style.textDecoration="underline";
};
function outFleaMarket(){ 
    fleaMarket.style.color="black";
    fleaMarket.style.textDecoration="none";
};
function onEvent(){ 
    eventBanner.style.color="#1369ea";
    eventBanner.style.textDecoration="underline";
};
function outEvent(){ 
    eventBanner.style.color="black";
    eventBanner.style.textDecoration="none";
};

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


goods.addEventListener("mouseover", onGoods);
goods.addEventListener("mouseout", outGoods);
groupBuy.addEventListener("mouseover", onGroupBuy);
groupBuy.addEventListener("mouseout", outGroupBuy);
fleaMarket.addEventListener("mouseover", onFleaMarket);
fleaMarket.addEventListener("mouseout", outFleaMarket);
eventBanner.addEventListener("mouseover", onEvent);
eventBanner.addEventListener("mouseout", outEvent);
goods.addEventListener("click", clickGoods);
groupBuy.addEventListener("click", clickGroupBuy);
fleaMarket.addEventListener("click", clickFleaMarket);
eventBanner.addEventListener("click", clickEventBanner);

document.querySelector(".login").addEventListener("click", clickLogin);
document.querySelector(".mypage").addEventListener("click", clickMypage);
document.querySelector(".basket").addEventListener("click", clickBasket);