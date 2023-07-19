const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const create_user = async (req, res) => {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
        return res.status(403).json({
            message: "Email ID and Password is required",
        })
    }

    const user_exist = await User.findOne({ email_id: email_id });

    if (user_exist) {
        return res.status(403).json({
            message: "Email is already exist"
        })
    }

    const user = await User.create({
        email_id,
        password
    });

    if (user) {
        res.status(201).json({
            message: "User Registered Successfully",
            data: {
                _id: user._id,
                email_id: user.email_id,
                profile_pic: user.profile_pic,
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' }),
            },
            error: null,
        });
    } else {
        return res.status(400).json({
            message: 'Some error occured!'
        });
    }
};

const login_auth = async (req, res) => {
    console.log("isnide one");
    try {
        const { email_id, password } = req.body;
        if (!email_id || !password) {
            return res.status(403).json({
                message: "Email ID and Password is required",
            })
        }

        const user = await User.findOne({ email_id });

        if (user && (await bcrypt.compare(password, user.password))) {
            return res.status(200).json({
                message: "Logged In Successfully",
                data: {
                    _id: user._id,
                    email_id: user.email_id,
                    profile_pic: user.profile_pic,
                    isAuth: true,
                    token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' }),
                },
                error: null,
            });
        } else {
            return res.status(404).json({
                message: "Wrong Email Id or Password",
                error: true
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: err.message,
        });
    }
};

const get_all_users = async (req, res) => {
    try {
        const all_users = await User.find({})
        if (all_users) {
            return res.status(200).json({
                message: "Users fetched successfully"
            })
        } else {
            return res.status(403).json({
                message: "Cannot fetch users, please try again"
            })
        }
    } catch (error) {
        console.log("fetch user error", error.message)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = { create_user, login_auth };