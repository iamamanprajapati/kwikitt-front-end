import axios from 'axios'
import { Component } from 'react';
const MY_APP_API='http://fe6929445222.ngrok.io'

class ServiceApi extends Component  {

    constructor(props){
        super(props)
        global.MyVar='http://fe6929445222.ngrok.io'
    }

    retrieveAllCategory() {
        return axios.get(`${MY_APP_API}/category/list`);
    }
}

export default new ServiceApi();
