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
