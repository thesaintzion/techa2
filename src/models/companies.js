import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const companySchema =  new mongoose.Schema({
    companyName: { type: String, lowercase: true, required: true, unique: true },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    role: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

companySchema.pre('save', function (next) {
    let company = this;
    if(!company.isModified('password')) return next();
    console.log(company);
    bcrypt.genSalt(10, (err, salt) => {
    if (err) console.error(err);
    bcrypt.hash(company.password, salt, (err, hash) => {
      company.password = hash;
      next();
    })
  });
  });

const Companies = mongoose.model('Companies', companySchema);

export default Companies;
