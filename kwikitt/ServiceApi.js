import axios from 'axios';
import {Component} from 'react';

class ServiceApi extends Component {
  constructor(props) {
    super(props);
    global.MyVar = 'http://a55d89b3bcfd.ngrok.io';
  }

  retrieveAllCategory() {
    return axios.get(`${global.MyVar}/category/list`);
  }
}

export default new ServiceApi();
