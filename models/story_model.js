const mongoose = require('mongoose');

const story_schema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        slides: [{
            image_url: {
                type: String,
                required: true
            },
            heading: {
                type: String,
                required: true,
                maxLength: 50,
            },
            description: {
                type: String,
                required: true,
                maxLength: 200,
            }
        }]
    },
    {
        timestamps: true,
    }
);

story_schema.path("slides").validate(function (slides) {
    if (!slides) { return false }
    else if (slides.length < 3) { return false }
    return true
}, 'Minimum 3 slides are required in a story');

const Story = mongoose.model('Story', story_schema);

module.exports = Story;