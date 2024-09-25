import express from 'express';
import * as CartController from '../controllers/cart.js'
const router = express.Router();

router.get('/', CartController.show);
router.post('/remove-from-cart',CartController.remove);
router.post("/removeMutiple",CartController.removeMutiple);


export default router;
