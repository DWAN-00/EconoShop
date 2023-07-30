const products = [
  { name: "사과", price: "30,000원", image: "../img/apple.jpg" },
  { name: "스폰지밥", price: "30,000원", image: "../img/spongebob.jpg" },
  { name: "뚱이", price: "30,000원", image: "../img/patrick.jpg" },
];

const cartpath = "../";
const productblock = document.querySelector("#product-block");

const productHTML = products.map(
  (product) => `
  <div class="product-div">
    <div>
      <img class="product-img" src="${product.image}" alt="${product.name}">
    </div>
    <div class="contents">
      <span class="name">${product.name}</span>
      <span class="price">${product.price}</span>
    </div>
`
);
console.log(productHTML);
const allProductsHTML = productHTML.join("");
console.log(allProductsHTML);
productblock.innerHTML = allProductsHTML;
