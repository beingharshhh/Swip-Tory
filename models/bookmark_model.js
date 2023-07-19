const Mongoose = require('mongoose')

const bookmark_schema = Mongoose.Schema(
    {
        story: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "Story",
            required: true
        },
        user: {
            type: Mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        is_bookmark: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Bookmark = Mongoose.model("Bookmark", bookmark_schema);

module.exports = Bookmark;