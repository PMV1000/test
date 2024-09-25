import mongoose from 'mongoose';
const { Schema } = mongoose;


const featureProductSchema = new Schema({
  id: {
    type: String,
    unique: true,
    required: true
  },
 productIds : [
    {
      type: String ,
     
      required: true
    }
  ]
});

// Tạo model từ schema
const FeatureProduct = mongoose.model('FeatureProduct', featureProductSchema,'Feature');

export default FeatureProduct;
