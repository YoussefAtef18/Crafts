import axios from 'axios';
import { showAlert } from './alerts';

export const contactUs = async (message) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `https://craftshandmade.herokuapp.com/contact-us`,
      data: {
        message
      }
    });

    if (res.data.status === 'success') {
      showAlert('success', 'sended');
      window.setTimeout(() => {
        location.reload();
      }, 1500);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};