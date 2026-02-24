import express from "express";
import { getProducts } from "../controllers/productControllers.js";
import { getProduct } from "../controllers/productControllers.js";
import { createProduct } from "../controllers/productControllers.js";
import { updateProduct } from "../controllers/productControllers.js";
import { deleteProduct } from "../controllers/productControllers.js";


const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
