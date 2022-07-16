import axios from 'axios';
import { showAlert } from './alerts';

export const addReview = async (productId ,review)=>{
  try{
    const res = await axios({
      method: 'POST',
      url: `https://craftshandmade.herokuapp.com/api/products/${productId}/reviews`,
      data: {
        review,
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Comment Posted');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    // console.log(productId);
    showAlert('error', err.response.data.message);
  }
};

export const deleteReview = async (reviewId)=>{
  try{
    const res = await axios({
      method: 'delete',
      url: `https://craftshandmade.herokuapp.com/api/reviews/${reviewId}`,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Comment Deleted');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    // console.log(productId);
    showAlert('error', err.response.data.message);
  }
};