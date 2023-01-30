const mongoose = require('mongoose');
const slugify = require('slugify');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A product must have a Title'],
    trim: true,
  },
  slug: String,
  category: {
    // type: Array
    type: mongoose.Schema.Types.String,
    ref: 'Category',
    required: [true, 'Product must have category.'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a Price'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A product must have a Description'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  available: {
    type: Boolean,
    default: true,
  },
  city: {
    type: String,
    required: ['A product must have a City']
  },
  quantity: {
    type: Number,
    default: 1,
  },
    // amount: {
    //   type: Number,
    //   default: 1,
    // },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Product must belonge to a user.'],
  },
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

productSchema.index({ price: 1 });
productSchema.index({ slug: 1 });

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo email'
  })
  next();
});

productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});
// DOCUMENT MIDDELWARE : runs before .save() and .create()

productSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

// productSchema.pre(/^find/, function (next) {
//   this.find({ available: { $ne: false } });
//   next();
// });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;