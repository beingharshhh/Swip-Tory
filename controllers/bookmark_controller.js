const Bookmark = require('../models/bookmark_model');
const Mongoose = require('mongoose');

const add_bookmark = async (req, res) => {
    try {
        const user = req.user;
        const { story, is_bookmark } = req.body;
        const updated_bookmark = await Bookmark.findOneAndUpdate(
            { story: story, user: user },
            { story, is_bookmark },
            { upsert: true, returnDocument: 'after' }
        );

        if (updated_bookmark) {
            return res.status(200).json({
                message: "Bookmark updated",
                data: updated_bookmark,
                error: null
            })
        } else {
            const bookmark = await Bookmark.create({
                story,
                is_bookmark,
                user
            })

            return res.status(200).json({
                message: "Bokmard added successfully",
                data: bookmark,
                error: null
            })

        }

    } catch (error) {
        console.log(`Add bookmark error : ${error.message}`)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = add_bookmark;