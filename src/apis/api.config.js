import { APIClient } from '../helpers/apiClient';


/** ******************  A W A R D  **************************** */

export function getAwardData (url){

    return new APIClient().get(url)        // url example '/api/all'
                                        
  }

export function getAwardLevelData(url, param) {

  const API = new APIClient()


  return API.get(url)
  
}
    

  export function addAwardData (url, param) {
    new APIClient().post(url, param)
  }

  export function addAwardLevelData (url, param) {
    new APIClient().post(url, param)
  }

  export function deleteAwardLevelData (url) {
    return new APIClient().delete(url)
  }


  export function deleteAwardData (url) {
    return new APIClient().delete(url)
  }

  export function saveAwardData (url, param) {
    return new APIClient().update(url, param)
  } 

  export function getKindData (url) {
    return new APIClient().get(url)
  }


  /** ******************  C L A S S  ************************* */

  export function getClasses (url){

    return new APIClient().get(url)

  }

  export function getGlistbySchoolId (url, param)
  {
    return new Promise((resolve, reject) => {new APIClient().get(url, param).then(res=>{resolve(res.data)}).catch(err=>{reject(err)})}) 
  }

  export function getStudentsbyGId (url)
  {
    return new APIClient().get(url)
  }

  export function saveClasses  (url, param){

    return new APIClient().patch(url, param)

  }


    /** ******************  D e v i c e s  *********************** */

    export function getDevicelist (url){

      return new APIClient().get(url)
  
    }
  
    export function deleteDevice (url, param)
    {
      return new APIClient().delete(url)
    }

    /** ******************  P r o g r a m  ************************ */

    export function getPrograms (url){

      return new APIClient().get(url)
  
    }
  
    export function addProgram (url, param)
    {
      return new APIClient().post(url, param)
    }
  
    export function saveProgram (url , param)
    {
      return new APIClient().update(url, param)
    }
  
    export function deleteProgram  (url, param){
  
      return new APIClient().delete(url)
  
    }

  /** ******************  S c h o o l  **************************** */

  export function saveSchoolInfo (url, param){

    return new APIClient().put(url, param)

  }

  export function getSchool (url, param)
  {
    return new APIClient().get(url)
  }

    /** ******************  S t u d e n t s  *********************** */

    export function getActiveG (url){

      return new APIClient().get(url)
  
    }
  
    export function getStudentsbyActGId (url)
    {
      return new APIClient().get(url)
    }
  
  
    /** ******************  T r a c k s  **************************** */

    export function deleteTrack (url){

      return new APIClient().delete(url)
  
    }
  
    export function addNewTrack (url, param)
    {
      return new APIClient().post(url, param)
    }
  
    export function updateOldTrack (url, param)
    {
      return new APIClient().put(url, param)
    }
  
     /** ******************  U s e r s  **************************** */

  export function getUsers (url){

    return new APIClient().get(url)

  }

  export function saveUser (url, param)
  {
    return new APIClient().post(url, param)
  }

  export function emailVerification (url)
  {
    return new APIClient().get(url)
  }


export default {
  getAwardData,
  getAwardLevelData,
  addAwardData,
  deleteAwardLevelData,
  deleteAwardData,
  saveAwardData,
  getClasses,
  getGlistbySchoolId,
  getStudentsbyGId,
  saveClasses,
  getDevicelist,
  deleteDevice,
  getPrograms,
  addProgram,
  saveProgram,
  deleteProgram,
  saveSchoolInfo,
  getSchool,
  getActiveG,
  getStudentsbyActGId,
  deleteTrack,
  addNewTrack,
  updateOldTrack,
  getUsers,
  saveUser,
  emailVerification,
  addAwardLevelData,
  getKindData
};