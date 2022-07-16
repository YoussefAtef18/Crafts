const User = require('../models/userModel');
const Order = require('../models/orderModel');
const Review = require('../models/reviewModel');
const Product = require('./../models/productModel');
const Category = require('../models/categoryModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  //get all catygories and get all products put not for the current user and only available 
  const categories = await Category.find(); 
  const products = await Product.find({ available: { $ne: false }}).sort({createdAt: 1}).limit(7);

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "upgrade-insecure-requests",
      "connect-src 'self' https://cdnjs.cloudflare.com https://unpkg.com/swiper/swiper-bundle.min.js"
      )
    .render('overview', {
      title: 'Home',
      categories,
      products
    });
});

exports.getLoginForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('register', {
      title: 'Log in'
    });
};

exports.getSignupForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('register', {
      title: 'Sign up'
    });
};

exports.getForgetPassForm = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('forgetpassword', {
      title: 'forget your password'
    });
};

exports.getResetPassForm = (req, res) => {
  //get the new token from params
  const token = req.params.token;

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('resetpassword', {
      title: 'reset your password',
      token
    });
};

exports.getAccount = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('account', {
      title: 'your account'
    });
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  //get data for the current user
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res
    .status(200)
    .render('account', {
      title: 'your account',
      user: updatedUser
    });
});

exports.addProduct = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('addProduct', {
      title: 'add new product'
    });
};

exports.getAllProducts= catchAsync(async (req, res, next) => {
  //find all products
  const products = await Product.find({available: { $ne: false }});
  
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('products', {
      title: 'products',
      products
    });
});

exports.categoryProducts = catchAsync(async (req, res, next) => {
  //find all products in one category
  const products = await Product.find({category: req.params.categoryId, available: { $ne: false }});
  const category = req.params;

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    ).render('categoryProducts', {
      title: `${category.categoryId}`,
      products
    });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  //et the data from the chosen product
  const product = await Product.findById( req.params.id ).populate({
    path: 'reviews',
    fields: 'review rating user',
  });
  // if prodiuct not found
  if (!product) {
    return next(new AppError('there is no product with that ID', 404));
  }
  
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('product', {
      title: `${product.title}`,
      product
    });
});
  
exports.editProduct = catchAsync(async (req, res, next) => {
  //et the data from the chosen product
  const product = await Product.findById( req.params.id );

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('editProduct', {
      product
    });
});

exports.search = catchAsync(async (req, res, next) => {
  const products = await Product.find({ title: { $regex: `.*${req.params.title}.*`, $options: 'i' }})

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )  
    .render('products', {
      title: `search for ${req.params.title}`,
      products
    });
});

exports.getMyProducts= catchAsync(async (req, res, next) => {
  //find all products for current user
  const products = await Product.find({ user: req.user.id });
  
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )  
    .render('myProducts', {
      title: 'My products',
      products
    });
});

exports.getMyReviews = catchAsync(async (req, res, next) => {
  //find all reviews for current user
  const reviews = await Review.find({ user: req.user.id });
  
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('myReviews', {
      title: 'My reviews',
      reviews
    });
});

exports.getMyOrders = catchAsync(async (req, res, next) => {
  //find all orders for Curent user
  const orders = await Order.find({ user: req.user.id });
  // const products = orders.map(el => el.products);
    // console.log(p)

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('myOrders', {
      title: 'My orders',
      orders
    });
});

exports.getCart = ( req, res) => {
  //get all products from current user cart
  req.user.populate('cart.items.productId').execPopulate()
    .then(user => {
      const products = user.cart.items;
      let total = 0;
      products.forEach(p => {
        total += p.quantity * p.productId.price;
      })
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('cart', {
      title: 'cart',
      products,
      total,
      user
    });
  })
  .catch(err => console.log(err));
}

exports.getAllAdminProducts= catchAsync(async (req, res, next) => {
  //find all products for admin
  const products = await Product.find();
  
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    ).render('allAdminProducts', {
      title: 'All products',
      products
    });
});

exports.getAllAdminUsers= catchAsync(async (req, res, next) => {
  //find all users for admin
  const users = await User.find();
  
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('allAdminUsers', {
      title: 'All users',
      users,
    });
});

exports.getAllAdminOrders= catchAsync(async (req, res, next) => {
  //find all orders for admin
  const orders = await Order.find();
  //find products in orders with the returned IDs
  const productIDs = orders.map(el => el.products.product.id);
  const products = await Product.find({ _id: { $in: productIDs } }); 
  
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('allAdminOrders', {
      title: 'All orders',
      orders,
      products
    });
});

exports.getContact = (req, res) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )  
    .render('contact', {
      title: 'Contact Us',
    });
};