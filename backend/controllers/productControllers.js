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

async function getProduct(req, res) {
  const product_id = req.params.id;
  try {
    const product = await sql`
      SELECT * FROM products WHERE id = ${product_id};
    `;
    console.log(`typeof product = ${ typeof product }`);
    console.log(product);
    res.status(200).json(product[0]);
  } catch (e) {
    console.log('Error retrieving products. ').
    console.log(e);
    res.status(500).json({ success : false, message: "Error retrieving products" });
  }
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
