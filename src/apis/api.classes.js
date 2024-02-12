import { APIClient } from '../helpers/apiClient';

  /** ******************  C L A S S  ************************* */

  export function getClassSectionPart(url, param) {

  return new APIClient().get(url, param);

}
  export function getCourse(url) {

  return new APIClient().get(url);

}

  /** ******************  t a b _ m i l e s  ************************* */

  export function getParticipationByWeek(url, param) {
    return new APIClient().post(url, param)
  } 

  export function getStudentMiles (url) {
    return new APIClient().get(url)
  } 


  /** ******************  t a b _ a w a r d s  *********************** */
  /** ******************  t a b _ p a r t i c i p a t i o n ********** */

export default {
  getClassSectionPart,
  getCourse,
  getStudentMiles
};