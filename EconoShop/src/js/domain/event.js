const products = [
    { name: "Econovation Summer Dev", price: "30,000원", image: "../img/EventBlock" },
    { name: "스폰지밥", price: "30,000원", image: "../../../../public/img/spongebob.jpg" },
    { name: "뚱이", price: "30,000원", image: "../../../../public/img/patrick.jpg" },
  ];
  
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
    </div>
  `
  );
  console.log(productHTML);
  const allProductsHTML = productHTML.join("");
  console.log(allProductsHTML);
  productblock.innerHTML = allProductsHTML;