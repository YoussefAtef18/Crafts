import axios from 'axios';
import { showAlert } from './alerts';

export const addProduct= async (title, price, category, city, description, images, user)=>{
  // const images = [image1, image2, image3, image4]
  try{
    const res = await axios({
      method: 'POST',
      url: 'https://craftshandmade.herokuapp.com/api/products/addProduct',
      data:{
      title,
      price, 
      category,
      city, 
      description, 
      images,
      user
      }
    });
    // console.log(images)
    if (res.data.status === 'success') {
      showAlert('success', 'Product Added');

    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const editProduct= async (title, price, category, city, description, productId)=>{
  try{
    const res = await axios({
      method: 'PATCH',
      url: `https://craftshandmade.herokuapp.com/api/products/${productId}`,
      data:{
        title, 
        price, 
        category, 
        city, 
        description, 
        // images
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Product Edited');

    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteProduct= async (productId)=>{
  try{
    const res = await axios({
      method: 'DELETE',
      url: `https://craftshandmade.herokuapp.com/api/products/${productId}`,
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Product Deleted')
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const hideProduct= async (productId, available)=>{
  try{
    const res = await axios({
      method: 'PATCH',
      url: `https://craftshandmade.herokuapp.com/api/products/hide/${productId}`,
      data:{
        available
      }
    });
    console.log(available);
    if (res.data.status === 'success') {
      // if (available===false){showAlert('success', `show`)}else{showAlert('success', `hide`)}
      showAlert('success', `Available ${available}`)
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const search = async (title)=>{
  try{
    const res = await axios({
      method: 'get',
      url: `https://craftshandmade.herokuapp.com/api/products/search/${title}`,

    });
    if (res.data.status === 'success') {
      // if (available===false){showAlert('success', `show`)}else{showAlert('success', `hide`)}
      // showAlert('success', `Available ${available}`)
      window.setTimeout(() => {
        location.assign(`/search/${title}`);
      }, 500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
