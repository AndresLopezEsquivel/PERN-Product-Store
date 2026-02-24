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

async function updateProduct(req, res) {
  const productId = Number(req.params.id);

  if(!Number.isInteger(productId)) {
    console.log("Product Id is not an integer");
    res.status(400).json({
      message: "Product id is not an integer"
    });
    return;
  }

  const { name, image, price } = req.body;
  try {
    const updatedProduct = await sql`
      UPDATE products
      SET
        name = ${ name },
        image = ${ image },
        price = ${ price }
      WHERE id = ${productId}
      RETURNING *
    `; // RETURNING * is necessary to have the info saved in updatedProduct

    console.log(`typeof updatedProduct = ${ typeof updatedProduct }`);
    console.log("updatedProduct = ", updatedProduct);

    if (updatedProduct.length === 0) {
      res.status(404).json({
        message: "Product with specified id wasn't found"
      });
      return;
    }

    res.status(200).json(updatedProduct[0]);
  } catch(e) {
    console.log(`An error occurred while updating the product with id = ${productId}`);
    console.log(e);
    res.status(500).json({
      success: false,
      message: `An error occurred while updating the product with id = ${productId}`
    });
  }
}

async function deleteProduct(req, res) {
  const productId = Number(req.params.id);

  if(!Number.isInteger(productId)) {
    res.status(400).json({
      message: "Product id is not an integer"
    });
    return;
  }

  try {
    const deletedProduct = await sql`
      DELETE FROM products WHERE id = ${productId}
      RETURNING *
    `;

    if(deletedProduct.length === 0) {
      console.log(`Product with id = ${productId} wasn't found when trying to delete`);
      res.status(404).json({
        message: `Product with id = ${productId} wasn't found when trying to delete`
      });
      return;
    }

    res.status(200).json(deletedProduct[0]);

  } catch(e) {
    console.log(`An error occurred while deleting product with id = ${ productId }`);
    console.log(e);
    res.status(500).json({
      status: 500,
      message: `An error occurred while deleting product with id = ${ productId }`
    });
  }
}

export { getProducts };
export { getProduct };
export { createProduct };
export { updateProduct };
export { deleteProduct };
