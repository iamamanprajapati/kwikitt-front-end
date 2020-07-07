import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  StatusBar,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import SpinnerButton from 'react-native-spinner-button';

class AddAddress extends Component {
  constructor() {
    super();
    global.MyVar;
    this.state = {
      city: 'Shahjahanpur',
      street: '',
      pinCode: '242001',
      state: 'Uttar Pradesh',
      userId: null,
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const abcd = JSON.parse(value);
      this.setState({userId: abcd});
    } catch (e) {
      console.warn(e);
    }
  };

  componentDidMount() {
    this.getData();
  }

  CheckTextInput = () => {
    if (this.state.street.length >= '2') {
      axios
        .post(`${global.MyVar}/api/address/add-or-update`, {
          city: this.state.city,
          street: this.state.street,
          pinCode: this.state.pinCode,
          state: this.state.state,
          userId: this.state.userId,
        })
        .then((response) => {
          this.props.navigation.navigate('Address');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.setState({defaultLoading: false});
      Alert.alert('Please Enter Address');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009386" />
        <View style={styles.footer}>
          <View style={styles.action}>
            <TextInput
              placeholder="Area, Colony, Street, Sector"
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({street: text});
              }}
              value={this.state.street}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="Town/City"
              editable={false}
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({city: text});
              }}
              value={this.state.city}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="PIN Code"
              editable={false}
              style={styles.textInput}
              keyboardType="number-pad"
              onChangeText={(text) => {
                this.setState({pinCode: text});
              }}
              value={this.state.pinCode}
            />
          </View>

          <View style={styles.action}>
            <TextInput
              placeholder="State"
              editable={false}
              style={styles.textInput}
              onChangeText={(text) => {
                this.setState({state: text});
              }}
              value={this.state.state}
            />
          </View>

          <View>
            <SpinnerButton
              spinnerType="UIActivityIndicator"
              buttonStyle={styles.buttonStyle}
              isLoading={this.state.defaultLoading}
              onPress={() => {
                this.setState({defaultLoading: true});
                this.CheckTextInput();
              }}>
              <Text style={styles.textSign}>Add Address</Text>
            </SpinnerButton>
          </View>
        </View>
      </View>
    );
  }
}

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    paddingVertical: 80,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: 'black',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    color: 'black',
    paddingLeft: 10,
    fontWeight: '800',
    fontSize: 15,
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#009387',
    borderRadius: 10,
    marginTop: 30,
  },
});
