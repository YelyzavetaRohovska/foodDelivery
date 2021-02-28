import axios from 'axios';
import {apiConfig} from '../helpers/apiConfig'

class UserService {
  getCurrentUser() {
    return axios.get(`${apiConfig}user`, {withCredentials: true});
  }

  logoutUser() {
    return axios.get(`${apiConfig}user/logout`, {withCredentials: true})
  }

  updateUser(data) {
    return axios.put(`${apiConfig}user/update`, data)
  }
}

export default new UserService();
