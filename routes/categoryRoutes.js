const express = require('express');
const categoryController = require('./../controllers/categoryController')
const authController = require('./../controllers/authController');

const router = express.Router();
// router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(categoryController.getAllCategorys)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory);
  
module.exports = router;