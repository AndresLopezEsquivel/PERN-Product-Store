function getProducts(req, res) {
  res.send("Hello from getProducts");
}

function getProduct(req, res) {
  res.send("Hello from getProduct");
}

function createProduct(req, res) {
  res.send("Hello from createProduct");
}

function updateProduct(req, res) {
  res.send("Hello from updateProduct");
}

function deleteProduct(req, res) {
  res.send("Hello from deleteProduct");
}

export { getProducts };
export { getProduct };
export { createProduct };
export { updateProduct };
export { deleteProduct };
