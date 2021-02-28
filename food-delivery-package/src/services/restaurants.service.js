import axios from 'axios';
import {apiConfig} from '../helpers/apiConfig'

class RestaurantsService {
  getAllRestaurants(data) {
    return axios.get(`${apiConfig}restaurants`, data);
  }

  restaurantsSearch(data) {
    return axios.get(`${apiConfig}restaurants/search?search=${data.searchValue}`, data);
  }

  getCurrentRestaurant(data) {
    return axios.get(`${apiConfig}restaurants/current?id=${data.id}`, data)
  }
}

export default new RestaurantsService();
