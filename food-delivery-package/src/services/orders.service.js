import axios from 'axios';
import {apiConfig} from '../helpers/apiConfig';

class OrdersService {
  createOrder(data) {
    return axios.post(`${apiConfig}orders/create`, data, {withCredentials: true});
  }
  getOrder(id) {
    return axios.get(`${apiConfig}orders?id=${id}`, {withCredentials: true});
  }
}

export default new OrdersService();
