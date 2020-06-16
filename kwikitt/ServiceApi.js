import axios from 'axios'
const MY_APP_API='http://147.139.33.186'

class ServiceApi  {

    retrieveAllCategory() {
        return axios.get(`${MY_APP_API}/category/list`);
    }
}

export default new ServiceApi();
