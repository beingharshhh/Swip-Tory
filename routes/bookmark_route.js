const add_bookmark = require('../controllers/bookmark_controller');
const auth = require('../middlewares/user_auth');
const express = require('express');
const router = express.Router();

router.post('/add_bookmark', auth, add_bookmark)

module.exports = router