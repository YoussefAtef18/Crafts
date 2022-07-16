import axios from 'axios';
import { showAlert } from './alerts';

export const sendEmail= async (email)=>{
  try{
    const res = await axios({
      method:'POST',
      url:'https://craftshandmade.herokuapp.com/api/users/forgetPassword',
      data:{
        email
      }
    })
    if(res.data.status==='success'){
      showAlert('success', 'email had sended!');
    }
  }
  catch(err){
    showAlert('error', err.response.data.message);
  }
};