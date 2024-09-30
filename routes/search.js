import express from 'express';
import * as allController from '../controllers/searchAndSort.js'; 

const router = express.Router();
router.get('/',allController.search)


export default router;
