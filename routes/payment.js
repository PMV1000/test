import express from "express"
import * as paymentcontroller from '../controllers/payment.js'
const router=express.Router()
router.get('/',paymentcontroller.show)
router.post('/confirm',paymentcontroller.confirm) 

export default router;