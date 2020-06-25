import axios from 'axios'
import { Component } from 'react';
const MY_APP_API='http://120931a3a65f.ngrok.io'

class ServiceApi extends Component  {

    constructor(props){
        super(props)
        global.MyVar='http://120931a3a65f.ngrok.io'
    }

    retrieveAllCategory() {
        return axios.get(`${MY_APP_API}/category/list`);
    }
}

export default new ServiceApi();
