import { APIClient } from '../helpers/apiClient';

  /** ******************  C L A S S  ************************* */

  export const getCustomUser =  (url) => new APIClient().get(url)

  export const getStudentsGbySchId =  (url, param) => new APIClient().get(url, param)
  

  export const getStudentsbyGId =  (url) => new APIClient().get(url)
  

  export const saveAccordianClass =  (url, data) => new APIClient().patch(url, data)
  

  export function getStudentGbySchId  (url, param) {
    return new APIClient().get(url, param)
  } 
  

  export const getGroupbySchId =  (url, param) => new APIClient().get(url, param)
  

  export const getQRFileName =  (param) => new APIClient().post(`https://rql8wk4tb9.execute-api.us-east-1.amazonaws.com/prod/qr`, param)
  



export default {
  getCustomUser,
  getStudentsGbySchId,
  getStudentsbyGId,
  getQRFileName,
  getGroupbySchId,
  getStudentGbySchId,
  saveAccordianClass
};