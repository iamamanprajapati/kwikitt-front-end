import axios from 'axios'
import { Component } from 'react';
const MY_APP_API='http://42fc95509e07.ngrok.io'

class ServiceApi extends Component  {

    constructor(props){
        super(props)
        global.MyVar='http://42fc95509e07.ngrok.io'
    }

    retrieveAllCategory() {
        return axios.get(`${MY_APP_API}/category/list`);
    }
}

export default new ServiceApi();
