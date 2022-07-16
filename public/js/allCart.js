import axios from 'axios';
import { showAlert } from './alerts';

export const addToCart = async (productId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `https://craftshandmade.herokuapp.com/api/users/cart-add`,
      data: {
        productId
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Product Added To Cart');
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const removeFromCart = async (productId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `https://craftshandmade.herokuapp.com/api/users/cart-delete/${productId}`,
    });

    if (res.data.status === 'success') {
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
