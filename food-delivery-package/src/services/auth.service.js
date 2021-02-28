import axios from 'axios';
import {apiConfig} from '../helpers/apiConfig'

class AuthService {
  verifyCode(data) {
    return axios.post(`${apiConfig}auth/verifyCode`, data, {withCredentials: true})
  }

  requestCode(data) {
    return axios.post(`${apiConfig}auth/requestCode`, data)
  }
}

export default new AuthService();
