const multer = require('multer');
const sharp = require('sharp');
const factory = require('./handlerFactory');
const Product = require('./../models/productModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductImages = upload.array('images', 4)
// exports.uploadProductImages = upload.single('images');
// upload.single('image')req.file
// upload.array('images', 5)req.files

exports.resizeProductImages = catchAsync(async (req, res, next) => {

  if (!req.files) return next();

  req.body.images = [];
  try{
    //لما ببعت الصور من بوست مان بتشتغل عادي ف(req.files)
    //دا معناه ان الربط هو اللي غلط
    // console.log(req.files)
  await Promise.all(
    req.files.map(async (file, i) => {
      const filename = `product-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(1000, 1000)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${filename}`);

      req.body.images.push(filename);
    })
  );
  }catch(err){
    console.log(err)
  }
  // console.log(req.body.images);
  next();
});
 
exports.hide = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      product
    }
  });
});

exports.search = catchAsync(async (req, res, next) => {
  var query = { title: { $regex: `.*${req.params.title}.*`, $options: 'i' }};
  const products = await Product.find(query)

  res.status(200).json({
    status: 'success',
    data: {
      result: products.length,
      data: products
    }
  });
});

exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product, { path: 'reviews' });
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
