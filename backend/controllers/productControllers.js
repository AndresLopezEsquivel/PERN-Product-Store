import { sql } from "../config/db.js";

async function getProducts(req, res) {
  try {
    const products = await sql`
      SELECT * FROM products
    `;
    console.log(`typeof products: ${ typeof products }`);
    console.log("Products: ", products);
    res.status(200).json(products); // https://expressjs.com/en/api.html#res.json
  } catch (e) {
    console.log('Error retrieving products. ').
    console.log(e);
    res.status(500).json({ success : false, message: "Error retrieving products" });
  }
}

function getProduct(req, res) {
  res.send("Hello from getProduct");
}

function createProduct(req, res) {
  // To use this middle, we need to previously have
  // set app.use(express.json());

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
