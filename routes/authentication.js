const User = require('../models/user');
const config = require('../config/db');
const bcrypt = require('bcrypt');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.firstName) {
            res.json({ success: false, message: 'Sorry First name is required' });
        } else {
            if (!req.body.lastName) {
                res.json({ success: false, message: 'Sorry Last name is required' });
            } else {
                if (!req.body.email) {
                    res.json({ success: false, message: 'Sorry Email is required' });
                } else {
                    if (!req.body.password) {
                        res.json({ success: false, message: 'Sorry Password is required' });
                    } else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                return res.status(500).json({ success: false, message: `could not hash ${err}` });
                            } else {
                                let user = new User({
                                    firstName: req.body.firstName.toLowerCase(),
                                    lastName: req.body.lastName.toLowerCase(),
                                    email: req.body.email.toLowerCase(),
                                    password: hash,
                                    whatClient: 'student',
                                    termOfUse: true,
                                    createdAt: Date.now(),
                                });

                                user.save().then(result => {
                                    console.log(result);
                                    res.status(201).json({ success: true, message: `User Created ${result}` });
                                }).catch(error => {
                                    return res.status(500).json({ success: false, message: `Error Creating user ${error}` });
                                });
                            }
                        });
                        // 


                    }
                }
            }
        }
    });

    return router;
}