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
  const productId = req.params.id;
  try {
    const product = await sql`
      SELECT * FROM products WHERE id = ${productId};
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
  const { name, image, price } = req.body;
  console.log(req.body);
  console.log(`name: ${name}`);
  console.log(`image: ${image}`);
  console.log(`price: ${price}`);
  try {
    // Here I could have used await but I prefered to try another approach
    // to test my knowledge on Promises handling
    sql`
      INSERT INTO products
      (name, image, price)
      VALUES
      (${name}, ${image}, ${price})
      RETURNING *
    `.then(newProduct => {
      console.log(`typeof product = ${ typeof newProduct }`);
      console.log(newProduct);
      res.status(200).json(newProduct[0]);
    });
  } catch (e) {
    console.log("An error occurred while creating a new product.");
    console.log(e);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating a new product."
    });
  }
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
