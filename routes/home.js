import express from 'express';
import * as homeController from '../controllers/home.js';
const router = express.Router();

router.get('/', homeController.show);
router.get('/page/:page',homeController.show);
router.post("/Edit/password",homeController.editPassword);
router.post("/Edit/info" ,homeController.editInfo);
router.post("/logout" ,homeController.logout);


export default router;
