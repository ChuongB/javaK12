const baseUrl = "http://localhost:3000";
let products = [];
let currentProduct = null;

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
    const { title, imageUrl, description, price, id } = product;
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
        <button class="btn btn-warning me-2" data-bs-toggle="modal" data-bs-target="#editProductModal"
        onClick="setCurrentProduct(event,${id},true)" ><i class="fas fa-edit"></i></button>
        <button class="btn btn-danger" onClick="setCurrentProduct(event,${id})" 
        data-bs-toggle="modal" data-bs-target="#deleteProductModal"><i class="fas fa-trash-alt"></i></button>
    </td>
  </tr>`;
  });

  tableBody.innerHTML = content;
}

function init() {
  initTable();
}

function searchProduct(event) {
  const keyword = event.target.value.toLowerCase();

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword)
  );

  renderProducts(filteredProducts);
}

init();

function setCurrentProduct(event, id, isEdit) {
  const product = getCurrentProductById(id);
  currentProduct = product;
  if (isEdit) {
    setEditFormData(currentProduct);
  }
}

async function deleteProduct() {
  await axios.delete(`${baseUrl}/products/${currentProduct.id}`);
  initTable();
}

function getCurrentProductById(id) {
  return products.find((product) => product.id === id);
}

async function addProduct() {
  const data = getAddProductData();
  if (!data) {
    return;
  }

  await axios.post(`${baseUrl}/products`, data);
  // hide add product modal && reload tablet
  hideAddProductModal();
  initTable();
  // reset form
  resetAddProductForm();
}

function getAddProductData() {
  const title = document.getElementById("productTitle").value;
  const description = document.getElementById("productDescription").value;
  const imageUrl = document.getElementById("productImageUrl").value;
  const price = document.getElementById("productPrice").value;
  const titleErrorEle = document.getElementById("productTitleError");
  const descriptionErrorEle = document.getElementById(
    "productDescriptionError"
  );
  const imageUrlErrorEle = document.getElementById("productImageUrlError");
  const priceErrorEle = document.getElementById("productPriceError");

  if (!title) {
    titleErrorEle.style.display = "inline-block";
  }

  if (!description) {
    descriptionErrorEle.style.display = "inline-block";
  }

  if (!imageUrl) {
    imageUrlErrorEle.style.display = "inline-block";
  }

  if (!price) {
    priceErrorEle.style.display = "inline-block";
  }

  if (!title || !description || !imageUrl || !price) {
    return null;
  }

  titleErrorEle.style.display = "none";
  imageUrlErrorEle.style.display = "none";
  descriptionErrorEle.style.display = "none";
  priceErrorEle.style.display = "none";

  return { title, description, imageUrl, price };
}

function hideAddProductModal() {
  const myModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("addProductModal")
  );
  myModal.hide();
}

function hideEditProductModal() {
  const myModal = bootstrap.Modal.getOrCreateInstance(
    document.getElementById("editProductModal")
  );
  myModal.hide();
}

const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

async function uploadImage(event, isEdit) {
  const base64Url = await toBase64(event.target.files[0]);

  if (!isEdit) {
    const imageEle = document.getElementById("addProductImage");
    imageEle.src = base64Url;
    imageEle.style.display = "block";

    const imageUrl = document.getElementById("productImageUrl");
    imageUrl.value = base64Url;
  } else {
    const imageEle = document.getElementById("editProductImage");
    imageEle.src = base64Url;
    imageEle.style.display = "block";

    const imageUrl = document.getElementById("editProductImageUrl");
    imageUrl.value = base64Url;
  }
}

function resetAddProductForm() {
  document.getElementById("productTitle").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productImageUrl").value = "";
  document.getElementById("productPrice").value = "";

  const imageEle = document.getElementById("addProductImage");
  imageEle.style.display = "none";
}

function setEditFormData(product) {
  // set data for edit form
  const title = document.getElementById("editProductTitle");
  const description = document.getElementById("editProductDescription");
  const imageUrl = document.getElementById("editProductImageUrl");
  const price = document.getElementById("editProductPrice");
  const image = document.getElementById("editProductImage");

  title.value = product.title;
  description.value = product.description;
  imageUrl.value = product.imageUrl;
  price.value = product.price;

  image.src = product.imageUrl;
  image.style.display = "inline-block";
}

async function editProduct() {
  const data = getEditProductData();
  if (!data) {
    return;
  }

  await axios.put(`${baseUrl}/products/${currentProduct.id}`, data);
  // hide add product modal && reload tablet
  hideEditProductModal();
  // re-render products table
  initTable();
}

function getEditProductData() {
  const title = document.getElementById("editProductTitle").value;
  const description = document.getElementById("editProductDescription").value;
  const imageUrl = document.getElementById("editProductImageUrl").value;
  const price = document.getElementById("editProductPrice").value;
  const titleErrorEle = document.getElementById("editProductTitleError");
  const descriptionErrorEle = document.getElementById(
    "editProductDescriptionError"
  );
  const imageUrlErrorEle = document.getElementById("editProductImageUrlError");
  const priceErrorEle = document.getElementById("editProductPriceError");

  if (!title) {
    titleErrorEle.style.display = "inline-block";
  }

  if (!description) {
    descriptionErrorEle.style.display = "inline-block";
  }

  if (!imageUrl) {
    imageUrlErrorEle.style.display = "inline-block";
  }

  if (!price) {
    priceErrorEle.style.display = "inline-block";
  }

  if (!title || !description || !imageUrl || !price) {
    return null;
  }

  titleErrorEle.style.display = "none";
  imageUrlErrorEle.style.display = "none";
  descriptionErrorEle.style.display = "none";
  priceErrorEle.style.display = "none";

  return { title, description, imageUrl, price };
}
