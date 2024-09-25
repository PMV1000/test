import mongoose from "mongoose";
const rightsSchema =new mongoose.Schema({
    typeOfSubAccount:[{
        name:String,
        rights:{type:[{
            name:{type:String, require:true},
            value:{type:Boolean, require:true}
        }],require:true}}]
})

const rights = mongoose.model('rights',rightsSchema,'rights')
export default rights;