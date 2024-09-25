import mongoose from 'mongoose';
import path from 'path';
import url from 'url';
import express from 'express';
import cloudinary from './config/cloudinary.js'
import pkg from 'multer-storage-cloudinary';
const { CloudinaryStorage, cloudStorage } = pkg;
import multer from 'multer'
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import paymentRouter from './routes/payment.js'
import categoryRouter from './routes/category.js';
import homeRouter from './routes/home.js'; 
import productDetail from "./routes/productDetail.js"
import searchRouter from './routes/search.js'
import cartRouter from './routes/cart.js';
import loginRouter from './routes/login.js'
import signupRouter from './routes/signup.js'
import adminRouter from './routes/admin.js'


dotenv.config();
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())

mongoose.connect('mongodb+srv://s:123@cluster0.6r2pbjp.mongodb.net/store?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
)
  .then(() => console.log("Connect success"))
  .catch((err) => console.error("Error", err));



const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder:"BANK",
  allowedFormats: ['jgp','png','jpeg'],
  transformattion:[{width: 500, height: 500, crop: 'limit'}],
})
const upload= multer ({
  storage: storage
})


app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));





app.use('/', homeRouter);
app.use('/payment',paymentRouter)
app.use('/cart', cartRouter);
app.use('/productDetail',productDetail)
app.use('/category', categoryRouter);
app.use('/search',searchRouter)
app.use("/login",loginRouter)
app.use("/signup",signupRouter)
app.use('/admin', upload.array('img'), adminRouter);


app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
});


