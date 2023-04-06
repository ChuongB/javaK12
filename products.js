const baseUrl = "http://localhost:3000";
let products = [];
let cart = [];
function init() {
  initProducts();
}
async function initProducts() {
  // fetch data
  await fetchProducts();
  // render data

  renderProducts();
}

async function fetchProducts() {
  const url = `${baseUrl}/products`;
  const res = await axios.get(url);
  products = res.data;
}

function renderProducts() {
  const wrapper = document.getElementById("products-wrapper");
  let content = "";
  products.forEach((product) => {
    const { id, title, imageUrl, description, price } = product;
    content += `<div class="card" style="width: 15rem;">
    <img src=${imageUrl} class="card-img-top" alt=${title}>
    <div class="card-body">
        <h5 class="card-title">${title} - ${price}$</h5>
        <p class="card-text">${description}</p>
        <button class="btn btn-primary" onClick="addToCart(${id})">Add to cart</button>
        <button class="btn btn-warning">More info</button>
    </div>
</div>`;
  });

  wrapper.innerHTML = content;
}

function addToCart(id) {
  const product = products.find((item) => item.id === id);
  const findIndex = cart.findIndex((item) => item.id === id);
  if (findIndex < 0) {
    cart = [...cart, { ...product, quantity: 1 }];
  } else {
    cart[findIndex].quantity++;
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeNumber = document.getElementById("badge-number");
  badgeNumber.innerHTML = cartTotal;
  localStorage.setItem("cart", JSON.stringify(cart));
}

init();
