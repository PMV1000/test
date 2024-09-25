
import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    id: String,
    name: String,
    price:Number,
    decs:String,
    imageURL:[{type:String}],
    categoryId: String,
    deleted: { type: Boolean, default: false },
    discount: { type: Number, default: 0 } 

},
{TimeStamps:true})

const product = mongoose.model('product',productSchema,'product');
export default product;
