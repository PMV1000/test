import * as adminController from '../controllers/admin.js'
import fs from 'fs';
import cloudinary from '../config/cloudinary.js'
import express from 'express'
const router=express.Router();
router.get('/',adminController.show)


router.get('/manageCategory',adminController.Showcategory)
router.post ('/AddCategory',adminController.AddCategory)
router.post ('/removeCategory',adminController.removeCategory)
router.post ('/editCategory',adminController.editCategory)
router.post ('/manageCategory/removeProduct',adminController.manageCatRMPro)
router.post ('/manageCategory/addProduct',adminController.manageCatAddPro)

router.post ('/manageCategory/removeChild',adminController.removeChild)
router.post ('/manageCategory/addChild',adminController.addChild)


router.get('/manageProduct',adminController.Showproduct)
router.post("/addProduct",async (req,res)=>{
    console.log(req.files); // Thêm log để kiểm tra req.files
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).send('Không có file nào được gửi lên');
        }
        
        const imageUploads = req.files.map(file => file.path);
        adminController.addProduct(req,res,imageUploads)
        console.log("v"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Có lỗi xảy ra');
    }
}) 
router.post("/editProduct",async (req,res)=>{
    console.log(req.files); // Thêm log để kiểm tra req.files
    try {
        if (!req.files || req.files.length === 0) {
            // return res.status(400).send('Không có file nào được gửi lên');
        }
        
        const imageUploads = req.files.map(file => file.path);
        adminController.editProduct(req,res,imageUploads)
        console.log("v"); 
    } catch (err) {
        console.error(err);
        res.status(500).send('Có lỗi xảy ra');
    }
}) 

router.post("/manageProduct/removeImage",adminController.removeImage)
router.post("/removeProduct",adminController.removeProduct) 


router.post("/addAdmin",adminController.addAdmin)
router.post("/removeUser",adminController.removeUser )

router.get('/setRight',adminController.setRight)



export default router;