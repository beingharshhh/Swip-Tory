const { add_category, get_all_categories } = require('../controllers/category_controller');
const express = require('express');
const router = express.Router();

router.post('/add_category', add_category);
router.get('/', get_all_categories);



module.exports = router;