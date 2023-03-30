const baseUrl = "http://localhost:3000";
let products = [];

async function fetchProducts() {
  const productUrl = `${baseUrl}/products`;
  const response = await axios(productUrl);
  const data = response.data;
  products = data;
  return data;
}

async function initTable() {
  await fetchProducts();
  renderProducts(products);
}

function renderProducts(data) {
  const tableBody = document.getElementById("table-body");
  let content = "";

  data.forEach((product, index) => {
    const { title, imageUrl, description, price } = product;
    content += `<tr>
    <th scope="row">${index + 1}</th>
    <td>
        <img src="${imageUrl}"
            alt="${title}">
    </td>
    <td>${title}</td>
    <td>${description}</td>
    <td>${price}</td>
    <td class="actions">
        <button class="btn btn-warning me-2"><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger"><i class="fas fa-trash-alt"></i></button>
    </td>
  </tr>`;
  });

  tableBody.innerHTML = content;
}

function init() {
  initTable();
}

function searchProduct(event) {
    console.log(event.target.value);
  const keyword = event.target.value.toLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
  );

  renderProducts(filteredProducts);
}

init();
