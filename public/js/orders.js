import axios from 'axios';
import { showAlert } from './alerts';

export const addOrder= async (userId)=>{
  try{
    const res = await axios({
      method: 'POST',
      url: 'https://craftshandmade.herokuapp.com/api/orders',
      data:{
      userId
      }
    });
    // console.log(images)
    if (res.data.status === 'success') {
      showAlert('success', 'Order Added');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const deleteOrder= async (orderId)=>{
  try{
    const res = await axios({
      method: 'DELETE',
      url: `https://craftshandmade.herokuapp.com/api/orders/${orderId}`,
    });
    // console.log(images)
    if (res.data.status === 'success') {
      showAlert('success', 'Order Deleted');
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const onDeliveryOrder = async (city, address, floorNum, flatNum, phone)=>{
  try{
    const res = await axios({
      method: 'POST',
      url: `https://craftshandmade.herokuapp.com/api/orders/onDelivery`,
      data:{
        city,
        address,
        floorNum,
        flatNum,
        phone,
      }
    });
    // console.log(images)
    if (res.data.status === 'success') {
      showAlert('success', 'Order is Coming');
    }
  } catch (err) {
    showAlert('error', err);
    console.log(err)
  }
};

export const visaOrder = async () => {
  const stripe = Stripe(
    'pk_test_51LL50zElw5uFGOXXnizDp2FbezKtY8UD9AJ9dtC0hjfTxUTgJKq2yg175tvbOv53VNQkDPV9xBN3kipWcsyC3G4t00Nwdo5lSZ'
  );
  try {
    // 1) Get checkout session from API
    const session = await axios(
      `https://craftshandmade.herokuapp.com/api/orders/checkout`
    );
    console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};