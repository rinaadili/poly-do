const User = require('../models/user.model');
const Company = require('../models/company');
const passport = require('passport');
const initializePassport = require('../passport-config');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

initializePassport(
    passport, 
    email => User.findOne({ where: { email: email } }),
    id =>  User.findOne({ where: { _id: id } }),
);

const register = async (req, res) => {
    if (!req.body.email) {
        return res
          .status(400)
          .json({ error: 'You must enter an email address.' });
    }

    if (!req.body.firstName || !req.body.lastName) {
        return res.status(400).json({ error: 'You must enter your full name.' });
    }
  
    if (!req.body.password) {
        return res.status(400).json({ error: 'You must enter a password.' });
    }
  
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        return res
          .status(400)
          .json({ error: 'That email address is already in use.' });
    } else {
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;

        const user = new User({
            email,
            password,
            firstName,
            lastName
        });

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        const registeredUser = await user.save();

        res.status(200).json({
            success: true,
            user: {
                id: registeredUser.id,
                firstName: registeredUser.firstName,
                lastName: registeredUser.lastName,
                email: registeredUser.email,
            }
        });
    }
}

const login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
        return res.status(400).json({ error: 'You must enter an email address.' });
    }

    if (!password) {
        return res.status(400).json({ error: 'You must enter a password.' });
    }

    User.findOne({ email }).then(user => {
        if (!user) {
            return res
                .status(400)
                .send({ error: 'No user found for this email address.' });
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                };

                jwt.sign(payload, 'secret', (err, token) => {
                    res.status(200).json({
                        success: true,
                        token: `Bearer ${token}`,
                        user: {
                            id: user.id,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email,
                        }
                    });
                });
            } else {
                res.status(400).json({
                    success: false,
                    error: 'Password Incorrect'
                });
            }
        });
    });
}

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, 'top-secret-phrase', (err, verifiedJwt) => {
        if(err){
          res.send(err.message)
        }else{
          res.send(verifiedJwt)
        }
      })
};

const logout = (req, res) => {
    const authHeader = req.headers["authorization"];

    jwt.sign(authHeader, "", { expiresIn: 1 } , (logout, err) => {
        if (logout) {
            res.send({msg : 'You have been Logged Out' });
        } else {
            res.send({msg:'Error'});
        }
    });
}

const getAllUsers = async (req, res) => {
    try {
        let users = await User.find();

        res.status(200).json({ users: users });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const updateUserDetails = async (req, res) => {
    try {
        let user = await User.findOneAndUpdate({_id: req.user.id}, req.body, {new: true});
        
        if(user) {
            res.status(200).json({ message: 'User details updated successfully!', result: user });
        } else {
            res.status(200).json({ message: 'User was not found!'});
        }
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

const getUserDetails = async (req, res) => {
    try {
        let user = await User.findById(req.user.id);
        
        res.status(200).json({ user: await userCollection(user) });
    } catch(err) {
        res.status(500).json({
            message: "Something went wrong!",
            error: err.message
        });
    }
}

async function userCollection(user) {
    return {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: await Company.findById(user.company_id),
        department: user.department,
        position: user.position,
        location: user.location,
        phoneNumber: user.phone_number
    }
}

module.exports = {
    register,
    login,
    logout,
    updateUserDetails,
    verifyToken,
    getUserDetails,
    getAllUsers
}