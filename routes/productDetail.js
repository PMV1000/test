import express from 'express';
import * as productDetailController from '../controllers/product.js'

const router = express.Router();
router.get('/:id', productDetailController.show);
router.post('/addToCart',productDetailController.addToCart)
export default router;