import mongoose from 'mongoose'

const cartSchema = mongoose.Schema({
    userId: String,
    products:[
        {
            productId: {
              type: String,
              required: true
            },
            quantity: {
              type: Number,
              required: true
            }
          }
    ]//{type:mongoose.Schema.Types.ObjectId, ref:'product'}
});

const cart = mongoose.model('cart',cartSchema,'cart');
export default cart;