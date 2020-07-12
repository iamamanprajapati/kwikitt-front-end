import axios from 'axios';
import {Component} from 'react';

class ServiceApi extends Component {
  constructor(props) {
    super(props);
    global.MyVar = 'http://31be0ecc963a.ngrok.io';
  }

  retrieveAllCategory() {
    return axios.get(`${global.MyVar}/category/list`);
  }
}

export default new ServiceApi();
