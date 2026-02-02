const Router = require('express').Router;
const authController = require('../controllers/auth-controller')
const categoryController = require('../controllers/category-controller')
const productController = require('../controllers/product-controller')
const orderController = require('../controllers/order-controller')
const userController = require('../controllers/user-controller')
const reviewController = require('../controllers/review-controller')
const router = new Router();
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const checkRoleMiddleware = require('../middlewares/checkRole-middleware');

// * Auth Rout
router.post(
  '/registration',
  [body('email').isEmail(), body('password').isLength({ min: 3, max: 32 })],
  authController.registration
);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/activate/:link', authController.activate);
router.get('/refresh', authController.refresh);

// * Category Rout
router.get('/categories' ,  categoryController.categories )
router.get('/categories/:categoryName' , categoryController.categoryProducts )

// * Product Rout

router.get('/allproducts' , productController.getAllProducts )
router.get('/product/:id' , productController.getOneProduct)

// * Order Rout 
router.post('/checkout' , orderController.createOrder )

// * User Rout
router.put('/checkout/update' , authMiddleware , userController.upDateCheckOut)

// * Review Rout
router.get('/product/:id/reviews'  , reviewController.getReviewProduct)
router.post('/product/:id/postreviews', reviewController.postReviewProducts)

//! Admin Rout 
router.get('/users', authMiddleware,checkRoleMiddleware('Admin') , userController.users);
// *  Product Rout
router.post('/admin-panel/new-product' , authMiddleware, checkRoleMiddleware('Admin') , productController.postProduct)
router.put('/admin-panel/update-product', authMiddleware , checkRoleMiddleware('Admin'), productController.upDateProduct)
router.delete('/admin-panel/delete-product', authMiddleware , checkRoleMiddleware('Admin'), productController.deleteProduct)
// * Category Rout
router.post('/admin-panel/post-category' , authMiddleware , checkRoleMiddleware('Admin') , categoryController.postCategory)
router.delete('/admin-panel/delete-category', authMiddleware , checkRoleMiddleware('Admin')  , categoryController.deleteCategory)
// * Order Rout 
router.get('/admin-panel/get-order' , authMiddleware , checkRoleMiddleware('Admin') , orderController.getOrder)
router.get('/admin-panel/get-order/:id', authMiddleware , checkRoleMiddleware('Admin') , orderController.getOrderItems)
router.put('/admin-panel/update-order-status/:id', authMiddleware , checkRoleMiddleware('Admin') , orderController.putOrderStatus)
// * Review Rout
router.get('/admin-panel/get-all-review' , authMiddleware ,checkRoleMiddleware('Admin') , reviewController.getAllReview)
router.delete('/admin-panel/delete-review/:id' , authMiddleware , checkRoleMiddleware('Admin') , reviewController.deleteReview)
module.exports = router;
