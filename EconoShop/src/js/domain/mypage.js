const sectionInfo = document.querySelector(".section-info");
const sectionCart = document.querySelector(".section-cart");
const sectionHistory = document.querySelector(".section-history");
const allBtn = document.querySelectorAll("a");
const infoBtn = document.querySelector(".info-a");
const cartBtn = document.querySelector(".cart-a");
const historyBtn = document.querySelector(".history-a");

function mypageInit() {
  flag = 0;
  renderPage();
}

mypageInit();

function renderPage() {
  if (flag === 0) {
    sectionInfo.classList.add("user-visible");
    sectionCart.classList.remove("user-visible");
    sectionHistory.classList.remove("user-visible");
    infoBtn.classList.add("a-visited");
    cartBtn.classList.remove("a-visited");
    historyBtn.classList.remove("a-visited");
  } else if (flag === 1) {
    sectionCart.classList.add("user-visible");
    sectionInfo.classList.remove("user-visible");
    sectionHistory.classList.remove("user-visible");
    cartBtn.classList.add("a-visited");
    infoBtn.classList.remove("a-visited");
    historyBtn.classList.remove("a-visited");
  } else if (flag === 2) {
    sectionHistory.classList.add("user-visible");
    sectionInfo.classList.remove("user-visible");
    sectionCart.classList.remove("user-visible");
    historyBtn.classList.add("a-visited");
    cartBtn.classList.remove("a-visited");
    infoBtn.classList.remove("a-visited");
  }
}

infoBtn.addEventListener("click", () => {
  flag = 0;
  renderPage();
});

cartBtn.addEventListener("click", () => {
  flag = 1;
  renderPage();
});

historyBtn.addEventListener("click", () => {
  flag = 2;
  renderPage();
});

const cartItems = [
  {
    name: "티셔츠1",
    count: 1,
    imageSrc: "../uploads/1689247659464.png",
    price: 10000,
  },
  {
    name: "티셔츠2",
    count: 1,
    imageSrc: "../uploads/1689247659464.png",
    price: 20000,
  },
];

const cartList = document.querySelector(".cart-list");

const cartHTML = cartItems.map(
  (item) => `
    <hr class="division-line">
    <li class="cart-box">
        <div class="cart-goods-box">
            <p class="cart-goods-name">${item.name}</p>
            <p class="cart-goods-cnt">${item.count}개</p>
        </div>
        <div class="cart-goods-img">
            <img src="${item.imageSrc}" loading="lazy">       
        </div>
        <div class="cnt-cntrl">
            <div class="cnt-now"></div>
            <div class="cnt-up-btn"><img class="cnt-img" src="../img/cnt.png"></div>
            <div class="cnt-down-btn"><img class="cnt-img-down" src="../img/cnt.png"></div>
        </div>
        <div class="price-box">
          <p class="price">${item.price}원</p>
        </div>
    </li>
  `
);

cartList.innerHTML = cartHTML.join("");

const cntUpButtons = document.querySelectorAll(".cnt-up-btn");
const cntDownButtons = document.querySelectorAll(".cnt-down-btn");

function updateItemCount(index, count) {
  const goodsCnt = cartList.querySelectorAll(".cnt-now")[index];
  goodsCnt.textContent = count;
  cartItems[index].count = count;
}

cntUpButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    let cnt = cartItems[index].count + 1;
    updateItemCount(index, cnt);
  });
});

cntDownButtons.forEach((button, index) => {
  button.addEventListener("click", () => {
    let cnt = cartItems[index].count - 1;
    if (cnt < 0) cnt = 0;
    updateItemCount(index, cnt);
  });
});
