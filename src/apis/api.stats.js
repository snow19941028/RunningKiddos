import { APIClient } from '../helpers/apiClient';

/** ****************** L E A D E R B O A R D ************************* */

export function getStatLeaderClass(url, param) {

    return new APIClient().get(url, param);

}

/** ****************** L E A D E R B O A R D ************************* */

export function getStatClassProgress(url, param) {

    return new APIClient().get(url, param);

}

export default {
    getStatLeaderClass,
}