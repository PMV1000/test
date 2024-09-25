import * as loginController from "../controllers/login.js"
import express from "express"
const router = express.Router()
router.get('/',loginController.showSignUp)
export default router;