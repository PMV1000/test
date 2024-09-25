import express from 'express';
import * as homeController from '../controllers/home.js';
const router = express.Router();

router.get('/', homeController.show);
router.get('/page/:page',homeController.show);
router.post("/Edit/password",homeController.editInfo);
router.post("/Edit/info" ,homeController.editPassword);
router.post("/logout" ,homeController.logout);


export default router;
