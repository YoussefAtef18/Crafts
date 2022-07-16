const multer = require('multer');
const catchAsync = require('./../utils/catchAsync');
const Category = require('./../models/categoryModel');
const factory = require('./handlerFactory');

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

exports.uploadCatrgoryPhoto = upload.single('image');

exports.resizeCategoryPhoto = catchAsync(async (req, res, next) => {
  console.log(req.file)
  if (!req.file) return next();

  req.file.filename = `category-${req.category.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/images/categories/${req.file.filename}`);

  next();
});

exports.getAllCategorys = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);
exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);