import express from 'express';
import * as allController from '../controllers/searchAndSort.js'; 

const router = express.Router();
router.get('/',(req,res)=>{
    res.render('search')
})


export default router;
