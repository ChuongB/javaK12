let cart = [];
function init() {
  getCart();
  cart = getCart();
  renderCart();
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart"));
}

function renderCart() {
  console.log(cart);
  const wrapper = document.getElementById("cart-wrapper");
  let content = "";
  cart.forEach((item) => {
    const { id, title, imageUrl, description, price, quantity } = item;

    content += `<div class="d-flex  align-items-center gap-5 cart-item p-4 w-50 mb-3">
        <div>
            <img src=${imageUrl} alt=${title} style="width: 100px; height: 100px; object-fit: scale-down;">
        </div>
        <div style="width:50%">
            <h4 class="m-0">${title}</h4>
            <small>${description}</small>
        </div>
        <div class="d-flex">
            <span>${quantity}</span>
            <span class="mx-4">
                $${quantity * price}
            </span>
            <div class="btn-group" role="group" aria-label="Basic outlined example">
                <button type="button" class="btn btn-outline-primary" onClick="increaseItem(${id})">+</button>
                <button type="button" class="btn btn-outline-primary" onClick="decreaseItem(${id})">-</button>
            </div>
        </div>
    </div>`;
  });

  wrapper.innerHTML = content;
  renderTotal();
}

function renderTotal() {
  const total = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalEle = document.getElementById("total-number");
  totalEle.innerHTML = total;
}

function increaseItem(id) {
  const product = cart.find((item) => item.id === id);
  product.quantity++;
  renderCart();
  renderTotal();
}

function decreaseItem(id) {
  const product = cart.find((item) => item.id === id);

  if (product.quantity > 1) {
    product.quantity--;
    renderCart();
    renderTotal();
  } else {
    cart = cart.filter((item) => item.id !== id);
    renderCart();
    renderTotal();
  }
}

init();
