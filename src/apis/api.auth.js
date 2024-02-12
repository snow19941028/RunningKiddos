import { APIClient } from '../helpers/apiClient';

/** ***********  a u t h   ************* */

  export function login(url, param) {

    new APIClient().post(url, param)
    
  } 


export default {
  login
};