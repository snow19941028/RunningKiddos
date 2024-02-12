import { APIClient } from '../helpers/apiClient';

export function getStudentDistanceTotals(url, param) {
  return new APIClient().get(url, param);
}

export function ScanningSession(url, param){
  return new APIClient().get(url, param);
}

export function getClassSectionPart(url, param) {
  return new APIClient().get(url, param);
}

export function getCourse(url) {

  return new APIClient().get(url);

}

export function getParticipationByWeek(url, param) {
  return new APIClient().post(url, param)
}

export function getStudentMiles(url) {
  return new APIClient().get(url)
}



export const getCSVFileName = (param) => new APIClient().post(`https://api.runningkiddos.com/api/Students/getStudentLapsPivotCSVForGroup`, param)


export default {
  getStudentDistanceTotals,
  getCourse,
  getStudentMiles,
  getCSVFileName
};