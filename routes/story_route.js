const {
    add_story,
    get_all_stories,
    get_user_stories,
    get_story_by_id,
    get_bookmarked_stories,
    like_story,
    unlike_story } = require('../controllers/story_controller');
const auth = require('../middlewares/user_auth');
const express = require('express');
const router = express.Router();

router.post('/add_story', auth, add_story);
router.get('/your_stories', auth, get_user_stories)
router.get('/bookmarked_stories', auth, get_bookmarked_stories)
router.put('/like_story/:_id', auth, like_story)
router.put('/unlike_story/:_id', auth, unlike_story)

router.get('/', get_all_stories)
router.get('/:_id', get_story_by_id)


module.exports = router;