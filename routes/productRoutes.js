const express = require('express');
const productController = require('./../controllers/productController');
const authController = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

router.use('/:productId/reviews', reviewRouter);

router
  .route('/addProduct')
  .post(
    authController.protect,
    productController.setUserId,
    productController.uploadProductImages, 
    productController.resizeProductImages, 
    productController.createProduct
    ); 

router.route('/').get(productController.getAllProducts);
router.route('/hide/:id').patch(productController.hide)

router.route('/:id')
  .get(productController.getProduct)
  .patch(
    authController.protect,
    productController.uploadProductImages,
    productController.resizeProductImages,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    productController.deleteProduct
  );

module.exports = router; 