import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    id: String,
    typeAccount: { type: String, enum: ["admin", "contentadmin", "user"] },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    code: { type: String, default: null },
    createAt: { type: Date, default: Date.now }, 
}, {
    timestamps: true  // Đảm bảo tùy chọn này đã được bật
}, { versionKey: false });
//Tránh __v 0

const user=mongoose.model("user",userSchema,'user')
export default user