import axios from 'axios'
import { Component } from 'react';
const MY_APP_API='http://d7a83cf50e6b.ngrok.io'

class ServiceApi extends Component  {

    constructor(props){
        super(props)
        global.MyVar='http://d7a83cf50e6b.ngrok.io'
    }

    retrieveAllCategory() {
        return axios.get(`${MY_APP_API}/category/list`);
    }
}

export default new ServiceApi();