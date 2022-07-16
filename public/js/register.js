import axios from 'axios';
import { showAlert } from './alerts';

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://craftshandmade.herokuapp.com/api/users/login',
      data: {
        email,
        password,
      },
    });
    
    if (res.data.status === 'success') {
      showAlert('success', 'logged in successfuly!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    // console.log(err);
    showAlert('error', err.response.data.message);
  }
};

export const signup = async (name, email, country, address, NID, phone, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'https://craftshandmade.herokuapp.com/api/users/signup',
      data: {
        name,
        email,
        country,
        address,
        NID,
        phone,
        password,
        passwordConfirm
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'signed up successfuly!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'Get',
      url: 'https://craftshandmade.herokuapp.com/api/users/logout',
    });

    if (res.data.status = 'success')  {
        location.assign('/');
    }
  } catch (err) {
    // console.log(err.resposse);
    showAlert('error', 'Error logged out!');
  }
};