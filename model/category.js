import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    id:String,
    name:String,
    products: [{ type:String}] ,
    categoryChild:[{type:String}],
    deleted : {type:Boolean, default: false}
})

const category= mongoose.model('category',categorySchema,'category');
export default category;