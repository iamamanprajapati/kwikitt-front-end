import axios from 'axios'
import { Component } from 'react';

class ServiceApi extends Component  {

    constructor(props){
        super(props)
        global.MyVar='http://147.139.33.186'
    }

    retrieveAllCategory() {
        return axios.get(`${global.MyVar}/category/list`);
    }
}

export default new ServiceApi();