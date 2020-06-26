import axios from 'axios'
import { Component } from 'react';
const MY_APP_API='http://147.139.33.186'

class ServiceApi extends Component  {

    constructor(props){
        super(props)
        global.MyVar='http://147.139.33.186'
    }

    retrieveAllCategory() {
        return axios.get(`${MY_APP_API}/category/list`);
    }
}

export default new ServiceApi();
