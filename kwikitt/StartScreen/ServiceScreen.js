import React, { Component } from 'react';
import axios from 'axios'

import { Alert, Image, StyleSheet, Text, TouchableHighlight, View, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SpinnerButton from 'react-native-spinner-button';

import PropTypes from 'prop-types';

class Selected_Items_Array {
  constructor() {
    selectedItemsArray = [];
  }

  refreshComponent = () => {
    this.setState({
      selectedItemsArray: []
    })
  }

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () =>
      this.refreshComponent(),
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  pushItem(option) {
    selectedItemsArray.push(option);
  }

  getArray() {
    return selectedItemsArray;
  }
}

class Checkbox extends Component {
  constructor() {
    super();
    this.state = { checked: null }
  }

  componentWillMount() {

    if (this.props.checked) {
      this.setState({ checked: true }, () => {
        this.props.selectedArrayObject.pushItem({
          'key': this.props.keyValue,
          'label': this.props.label,
          'value': this.props.value
        });
      });
    }
    else {
      this.setState({ checked: false });
    }
  }

  toggleState(key, label, value) {
    this.setState({ checked: !this.state.checked }, () => {
      if (this.state.checked) {
        this.props.selectedArrayObject.pushItem({ 'key': key, 'label': label, 'value': value });
      }
      else {
        this.props.selectedArrayObject.getArray().splice(this.props.selectedArrayObject.getArray().findIndex(x => x.key == key), 1);
      }
    });
  }

  render() {
    return (
      <TouchableHighlight
        onPress={this.toggleState.bind(this, this.props.keyValue, this.props.label, this.props.value)}
        underlayColor="transparent"
        style={{ marginVertical: 10 }}>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ width: this.props.size, height: this.props.size, backgroundColor: this.props.color, padding: 3 }}>
            {
              (this.state.checked)
                ?
                (<View style={styles.checkedView}>
                  <Image source={require('../assets/check.png')} style={styles.checkBoxImage} />
                </View>)
                :
                (<View style={styles.uncheckedView} />)
            }

          </View>

          <Text style={[styles.checkBoxLabelText, { color: this.props.labelColor }]}>{this.props.label}</Text>

        </View>

      </TouchableHighlight>
    );
  }
}

export class ServiceScreen extends Component {

  constructor(props) {
    super(props);
    global.MyVar;
    selectedArrayOBJ = new Selected_Items_Array();
    this.state = {
      selectedItems: [],
      data: [],
      phone: '',
      userId: null,
      defaultLoading: false,
    }
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('number');
      this.setState({ phone: value });
    } catch (e) {
      console.warn(e);
    }
  };

  componentDidMount() {
    this.getData()
    axios.get(`${global.MyVar}/service/list`).then((response) => {
      console.log(response.data.data)
      this.setState({
        data: response.data.data,
      });
    });
  }

  onSubmit = async (value, r) => {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(value));
      await AsyncStorage.setItem('role', r);
    } catch (e) {
      console.warn(e);
    }
  };

  registration = (email, name, roles) => {
    this.setState({ defaultLoading: true })
    axios
      .post(`${global.MyVar}/user/register`, {
        email: email,
        name: name,
        phone: this.state.phone,
        roles: roles,
      })
      .then((response) => {
        this.onSubmit(response.data.data.id, response.data.data.roles[1]);
        axios.post(`${global.MyVar}/service-partner/assign-service`, {
          services: selectedArrayOBJ.getArray().map(item => item.value),
          userId: response.data.data.id
        }).then(response => (
          this.props.navigation.navigate('HomeScreen')
        ))
      });
  }

  getId = async () => {
    const value = await AsyncStorage.getItem('token');
    const abcd = JSON.parse(value);
    this.setState({ userId: abcd });
  }

  getSelectedItems = (email, name, roles) => {
    this.registration(email, name, roles);
    this.getId();
    console.log(selectedArrayOBJ.getArray().map(item => item.value));
  }

  render() {
    const { email, name, roles } = this.props.route.params
    return (
      <View style={styles.MainContainer}>
        <Text style={{ fontSize: 20 }}>इनमे से आप कौन से कार्य कर सकते हैं ?</Text>
        <ScrollView style={{ flex: 1, marginTop: 30 }}>
          {
            this.state.data.map(list => (
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 3 }}>
                  <Checkbox size={30}
                    keyValue={list.id}
                    selectedArrayObject={selectedArrayOBJ}
                    checked={false}
                    color="#009387"
                    labelColor="#009387"
                    label={list.name}
                    value={list.id}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Image
                    style={{ height: 50, width: 50, marginTop: 10 }}
                    source={{
                      uri: `${global.MyVar}/uploads/services/${list.serviceImage}`,
                    }}
                  />
                </View>
              </View>
            ))
          }

        </ScrollView>
        <View>
          <SpinnerButton
            spinnerType="UIActivityIndicator"
            buttonStyle={styles.buttonStyle}
            isLoading={this.state.defaultLoading}
            onPress={() => this.getSelectedItems(email, name, roles)}>
            <Text style={styles.textSign}>Sign-In</Text>
          </SpinnerButton>
        </View>
      </View>
    );
  }
}


export default ServiceScreen;

const styles = StyleSheet.create(
  {
    MainContainer:
    {
      flex: 1,
      padding: 20,
    },

    selectedItemsButton:
    {
      marginTop: 25,
      padding: 8,
      backgroundColor: '#2962FF',
    },

    selectedItemsButton_Text:
    {
      color: 'white',
      textAlign: 'center',
      alignSelf: 'stretch',
      fontSize: 18
    },

    checkedView:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },

    checkBoxImage:
    {
      height: '80%',
      width: '80%',
      tintColor: 'white',
      resizeMode: 'contain'
    },
    uncheckedView:
    {
      flex: 1,
      backgroundColor: 'white'
    },
    checkBoxLabelText:
    {
      fontSize: 16,
      paddingLeft: 10
    },
    textSign: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    buttonStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
      backgroundColor: '#009387',
      borderRadius: 7,
      marginTop: 30,
    },
  });

Checkbox.propTypes =
{
  size: PropTypes.number,
  keyValue: PropTypes.number.isRequired,
  selectedArrayObject: PropTypes.object.isRequired,
  color: PropTypes.string,
  label: PropTypes.string,
  labelColor: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool
}

Checkbox.defaultProps =
{
  size: 30,
  color: '#009387',
  labelColor: '#636c72',
  label: 'Default',
  checked: false,
  value: 'Default'
}