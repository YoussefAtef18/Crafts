import '@babel/polyfill';
import { showAlert } from './alerts';
import { login, signup, logout } from './register';
import { sendEmail } from './sendEmail';
import { resetPassword } from './resetPass';
import { updateSettings } from './updateSettings';
import { addProduct, editProduct, deleteProduct, hideProduct, search } from './products';
import { addReview, deleteReview } from './reviews';
import { deleteOrder, visaOrder, onDeliveryOrder } from './orders';
import { addToCart, removeFromCart } from './allCart';
import { contactUs } from './contact';

// DOM ELEMENTS
const loginForm = document.querySelector('.sign-in-form');
const logOutBtn = document.querySelector('.nav__el--logout');
const signupForm = document.querySelector('.sign-up-form');
const forgotPassword =document.querySelector('.forgot-password-form');
const resetPass =document.querySelector('.token');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const searchForm = document.querySelector('.search-bar');
const addProductBtn = document.querySelector('.addProductBtn');
const editProductBtn = document.querySelector('.editProductBtn');
const deleteProductBtn = document.querySelector('.deleteProductBtn');
const hideProductBtn = document.querySelector('.hideProductBtn');
const addReviewBtn = document.querySelector('.addReviewBtn');
const deleteReviewBtn = document.querySelector('.deleteReviewBtn');
const deleteOrderBtn = document.querySelector('.deleteOrderBtn');
const addToCartBtn = document.querySelector('.addToCart');
const removeFromCartBtn = document.querySelector('.remove');
const visaOrderBtn = document.querySelector('.checkoutOrder');
const onDeliveryForm = document.querySelector('.form-cart');
const sendproblem = document.querySelector('.text');

if (loginForm)
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login_email').value;
    const password = document.getElementById('login_password').value;
    login(email, password);
});

if (signupForm)
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup_name').value;  
    const email = document.getElementById('signup_email').value;
    const country = document.getElementById('signup_country').value;
    const address= document.getElementById('signup_address').value;
    const NID = document.getElementById('signup_NID').value;
    const phone= document.getElementById('signup_phone').value;
    const password = document.getElementById('signup_password').value;
    const passwordConfirm = document.getElementById('signup_passwordConfirm').value;
    signup(name, email, country, address, NID, phone, password, passwordConfirm);
});

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm)
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    form.append('photo', document.getElementById('photo').files[0]);

    updateSettings(form, 'data');
});

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if(forgotPassword)
  forgotPassword.addEventListener('submit',(e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    sendEmail(email);
});

if(resetPass)
  resetPass.addEventListener('click',(e)=>{
    e.preventDefault();
    const {token} = e.target.dataset;
    const password = document.getElementById('pass-reset').value;
    const passwordConfirm = document.getElementById('passCon-reset').value;
    resetPassword(token, password, passwordConfirm);
});

if(addProductBtn){
  addProductBtn.addEventListener('click', (e) => {
    const title =  document.getElementById('title').value;
    const price =  document.getElementById('price').value;
    const category =  document.getElementById('category').value;
    const city =  document.getElementById('country').value;
    const description =  document.getElementById('description').value;
    const image1 =  document.getElementById('image1').files[0];
    const image2 =  document.getElementById('image2').files[0];
    const image3 =  document.getElementById('image3').files[0];
    const image4 =  document.getElementById('image4').files[0];
    const images =[image1,image2,image3,image4];

    const {user} = e.target.dataset;
    addProduct(title, price, category, city, description, image1, image2, image3, image4, user);
  });
}

if(editProductBtn){
  editProductBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const title =  document.getElementById('title').value;
    const price =  document.getElementById('price').value;
    const category =  document.getElementById('category').value;
    const city =  document.getElementById('country').value;
    const description =  document.getElementById('description').value;
    // const images =  document.getElementById('image1').files[0];
    const {productId} = e.target.dataset;
    editProduct(title, price, category, city, description, productId);
  });
}

if(deleteProductBtn){
  deleteProductBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const {productId} = e.target.dataset;
    deleteProduct(productId);
  });
}

if(hideProductBtn){
  hideProductBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const {productId} = e.target.dataset;
    const {available} = e.target.dataset;
    hideProduct(productId, available);
  });
}

if (addReviewBtn)
addReviewBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const { productId } = e.target.dataset;
  const review = document.getElementById('bodyText').value;
  addReview(productId,review);
});

if (deleteReviewBtn)
deleteReviewBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const { reviewId } = e.target.dataset;
  deleteReview(reviewId);
});

if (addToCartBtn)
addToCartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const { productId } = e.target.dataset;
  addToCart(productId);
});

if (removeFromCartBtn)
removeFromCartBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const { productId } = e.target.dataset;
  removeFromCart(productId);
})

if (deleteOrderBtn)
deleteOrderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const { orderId } = e.target.dataset;
  deleteOrder(orderId);
});

if (searchForm)
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.getElementById('search-bar').value;
  search(title);
});

if (visaOrderBtn)
visaOrderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.textContent = 'Processing...';
  visaOrder();
});

if (onDeliveryForm)
onDeliveryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const city =  document.getElementById('city').value;
  const address =  document.getElementById('address').value;
  const floorNum =  document.getElementById('floor').value;
  const flatNum =  document.getElementById('flat').value;
  const phone =  document.getElementById('phone').value;
  onDeliveryOrder(city, address, floorNum, flatNum, phone);
});

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);

if (sendproblem){
   sendproblem.addEventListener('submit', (e) => {
    e.preventDefault();
   const message = document.getElementById('complaints').value;
   contactUs(message);
  });
}
