const Story = require('../models/story_model');
const Mongoose = require('mongoose');

const add_story = async (req, res) => {
    try {
        const user = req.user;
        const { category, slides } = req.body;
        if (slides.length < 3) {
            return res.status(406).json({
                message: 'Minimum 3 slides are required'
            })
        }

        const story = await Story.create({
            user,
            category,
            slides
        })

        if (story) {
            return res.status(200).json({
                message: 'Story created successfully',
                data: story,
                error: null
            })
        } else {
            return res.status(403).json({
                message: 'Can not create story',
            })
        }
    } catch (error) {
        console.log('Add story error: ', error.message)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })

    }
}

const edit_story = async (req, res) => {
    try {
        const { category, slides } = req.body
        const { _id } = req.params;
        const user = req.user;
        const story = await Story.findOneAndUpdate(
            { $and: [{ _id: _id }, { user: user }] },
            {
                $set: {
                    category: category,
                    "slides.$[i].image_url": slides[0].image_url,
                    "slides.$[i].heading": slides[0].heading,
                    "slides.$[i].description": slides[0].description
                },
            },
            { returnNewDocument: true, arrayFilters: [{ "i._id": slides[0]._id }] }
        )



    } catch (error) {
        console.log(`Edit story error : ${error.message}`)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
}

// get all stories category wise
const get_all_stories = async (req, res) => {
    try {
        const limit = Number(req.query.limit || 10);
        const category = req.query.category || "";
        const all_stories = await Story.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    pipeline: [{ $project: { category_name: 1, _id: 1 } }],
                    as: "category"
                }
            },
            {
                $match: {
                    category: {
                        $elemMatch: { category_name: { "$regex": category, "$options": "i" } }
                    }
                }
            },
            {
                $limit: limit
            }
        ])
        const total_result = all_stories.length;

        if (all_stories) {
            return res.status(200).json({
                message: "Stories fetched successfully",
                count: total_result,
                data: all_stories,
                error: null
            })
        } else {
            return res.status(404).json({
                message: "Not Found"
            })
        }
    } catch (error) {
        console.log(`Get all stories error : ${error.message}`)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })
    }
}

const get_user_stories = async (req, res) => {
    try {
        const user = req.user;
        console.log(user)
        const all_user_stories = await Story.aggregate([
            {
                $match: {
                    user: new Mongoose.Types.ObjectId(user)
                }
            }
        ])
        const count = all_user_stories.length;

        if (all_user_stories) {
            return res.status(200).json({
                message: "Stories fetched successfully",
                total_document: count,
                data: all_user_stories,
                error: null
            })
        } else {
            return res.status(404).json({
                message: "Not found"
            })
        }
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message,
        })

    }
}

const get_story_by_id = async (req, res) => {
    try {
        const _id = req.params;
        console.log(_id)
        const story = await Story.findOne(_id).populate('category', 'category_name _id')

        if (story) {
            return res.status(200).json({
                message: "Story feteched successfully",
                data: story,
                error: null
            })
        } else {
            return res.status(404).json({
                message: "Not found",
                error: true
            })
        }
    } catch (error) {
        console.log(`Get story by id error : ${error.message}`)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const get_bookmarked_stories = async (req, res) => {
    try {
        const user = req.user
        console.log(user)
        const bookmarked_stories = await Story.aggregate([
            {
                $lookup: {
                    from: 'bookmarks',
                    let: { story: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $and: [
                                    { $expr: { $eq: ['$$story', '$story'] } },
                                    { user: new Mongoose.Types.ObjectId(user) }
                                ]
                            }
                        },
                        { $project: { "user": 1, "story": 1, "is_bookmark": 1 } }
                    ],
                    as: 'is_bookmarked'
                }
            },
            {
                $match: {
                    is_bookmarked: { $elemMatch: { user: new Mongoose.Types.ObjectId(user), is_bookmark: true } }
                }
            }
        ])
        let count = bookmarked_stories.length;
        console.log(count)

        if (count > 0) {
            return res.status(200).json({
                message: "Bookmarked stories fetched successfully",
                count: count,
                data: bookmarked_stories,
                error: null
            })
        } else if (count === 0) {
            return res.status(404).json({
                message: "No bookmarks found",
            })
        }

    } catch (error) {
        console.log(`Get bookmarked stories error : ${error.message}`)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const like_story = async (req, res) => {
    try {
        const { _id } = req.params;
        console.log(`Like story : ${_id}`)
        const user = req.user;
        const liked = await Story.findOneAndUpdate(
            { _id: _id },
            {
                $push: { likes: user }
            },
            { returnDocument: "after" }
        )

        if (liked) {
            res.status(200).json({
                message: "Liked",
                data: liked,
                error: null
            })
        } else {
            return res.status(403).json({
                message: "You can not like this story"
            })
        }

    } catch (error) {
        console.log(`Like and Unlike story error : ${error.message}`)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

const unlike_story = async (req, res) => {
    try {
        const { _id } = req.params;
        const user = req.user;
        const liked = await Story.findOneAndUpdate(
            { _id: _id },
            {
                $pull: { likes: user }
            },
            { returnDocument: true }
        )

        if (liked) {
            res.status(200).json({
                message: "Unliked",
                data: liked,
                error: null
            })
        } else {
            return res.status(403).json({
                message: "You can not like this story"
            })
        }

    } catch (error) {
        console.log(`Like and Unlike story error : ${error.message}`)
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = { add_story, get_all_stories, get_user_stories, get_story_by_id, get_bookmarked_stories, like_story, unlike_story };