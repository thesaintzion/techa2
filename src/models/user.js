import mongoose from 'mongoose';



const User = mongoose.model('User', new mongoose.Schema({
    firstName: { type: String, required: true, lowercase: true },
    lastName: { type: String, required: true, lowercase: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    registerAs: { type: String, enum: ['Student', 'Company'], required: true },
    role: { type: String, default: '' },
    createdAt: type = Date,
}));



export default User;
