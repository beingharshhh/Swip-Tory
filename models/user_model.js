const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const user_schema = mongoose.Schema(
    {
        email_id: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
        profile_pic: {
            type: String,
            default: 'https://mui.com/static/images/avatar/2.jpg'
        }
    },
    {
        timestamps: true
    }
);

user_schema.pre('save', async function (next) {
    try {
        if (!this.isModified("password")) {
            return next();
        }

        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
        console.log(error)
    }
})

const User = mongoose.model('User', user_schema)

module.exports = User;