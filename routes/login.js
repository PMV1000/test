import * as loginController from'../controllers/login.js'
import express from 'express'
const router =express.Router()
router.get('/',loginController.show)
router.post ('/signIn',loginController.check)
export default router