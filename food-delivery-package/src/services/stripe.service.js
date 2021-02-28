import axios from 'axios';
import {apiConfig} from '../helpers/apiConfig';

class CustomerService {
  createCustomer(data) {
    return axios.post(`${apiConfig}payment/create-customer`, data, {withCredentials: true});
  };

  getCustomerSecret(data) {
    return axios.post(`${apiConfig}payment/intent`, data, {withCredentials: true});
  }

  createOrder(data) {
    return axios.post(`${apiConfig}orders/create`, data, {withCredentials: true});
  }

  receiveOrder(data) {
    return axios.get(`${apiConfig}orders/create`, data, {withCredentials: true});
  }

  async confirmCard({stripe, elements, customerSecret, CardElement, name, phone, address, location, fullAddress, totalPrice, dishesId, restaurantsID, history}) {
    const result = await stripe.confirmCardPayment(customerSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name,
          phone,
        },
      },
      shipping: {
        address: {
          line1: address
        },
        name
      }
    });
    if (result.error) {
      alert(result.error.message);
    }
    if (result?.paymentIntent?.status === 'succeeded') {
      const data = await this.createOrder({
        price: totalPrice,
        restaurantsID,
        dishesId,
        address: fullAddress,
        location
    });
      console.log("data: ", data);
      alert('success');
      history.push('/status-order')
    }
  }
}

export default new CustomerService();
