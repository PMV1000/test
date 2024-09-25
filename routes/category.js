import express from 'express';
import * as Catcontroller from '../controllers/category.js'
const router= express.Router();
router.get('/',Catcontroller.show)
router.get('/:categoryId',Catcontroller.findProductOfCat)
export default router;