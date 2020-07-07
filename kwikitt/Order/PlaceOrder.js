import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import SpinnerButton from 'react-native-spinner-button';
import {Icon} from 'react-native-elements';

class PlaceOrder extends Component {
  constructor() {
    super();
    global.MyVar;
    this.state = {
      names: '',
      serviceImages: '',
      desc: '',
      bookingTime: '',
      servId: null,
      userId: null,
      defaultLoading: false,
    };
  }

  getData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('token');
      const abcd = JSON.parse(value1);
      const value2 = await AsyncStorage.getItem('orderId');
      const serviceId = JSON.parse(value2);
      this.setState({servId: serviceId, userId: abcd});
      axios.get(`${global.MyVar}/service/${serviceId}`).then((response) => {
        this.setState({
          names: response.data.name,
          serviceImages: response.data.serviceImage,
          desc: response.data.description,
        });
      });
    } catch (e) {
      console.warn(e);
    }
  };

  CheckTextInput = (addId) => {
    if (this.state.bookingTime.length >= '0') {
      axios
        .post(`${global.MyVar}/booking/place`, {
          addressId: addId,
          bookingRemarks: this.state.bookingTime,
          customerId: this.state.userId,
          paymentMethod: 'COD',
          serviceId: this.state.servId,
        })
        .then((response) => {
          this.props.navigation.navigate('bookOrder');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert('Please Provide Service Timing ');
      this.setState({defaultLoading: false});
    }
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {addId, street, city, state, pinCode} = this.props.route.params;
    const {serviceImages} = this.state;
    return (
      <View style={{flex: 1}}>
        <Image
          style={{width: 120, height: 120, alignSelf: 'center', elevation: 4}}
          source={{uri: `${global.MyVar}/uploads/services/${serviceImages}`}}
        />
        <Text style={{alignSelf: 'center', fontWeight: 'bold', fontSize: 20}}>
          {this.state.names}
        </Text>
        <Text style={{marginTop: '5%', marginLeft: '5%'}}>
          <Text style={{fontWeight: 'bold', fontSize: 17}}>Description:</Text>{' '}
          {this.state.desc}{' '}
        </Text>
        <TextInput
          placeholder="Remarks"
          style={styles.textInput}
          onChangeText={(text) => {
            this.setState({bookingTime: text});
          }}
        />

        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <SpinnerButton
            spinnerType="UIActivityIndicator"
            buttonStyle={styles.buttonStyle}
            isLoading={this.state.defaultLoading}
            onPress={() => {
              this.setState({defaultLoading: true});
              this.CheckTextInput(addId);
            }}>
            <Text style={styles.textSign}>Place Order</Text>
          </SpinnerButton>
        </View>
        <View style={{flex: 1, marginTop: 25}}>
          <Text
            style={{
              color: 'red',
              fontSize: 13,
              marginLeft: 13,
              fontWeight: 'bold',
            }}>
            SELECTED ADDRESS
          </Text>
          <ImageBackground
            style={{
              marginLeft: 5,
              marginRight: 5,
              padding: 5,
              backgroundColor: 'white',
              borderWidth: 4,
              borderColor: 'white',
              elevation: 4,
              height: 150,
            }}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text>{street},</Text>
                <Text>{city},</Text>
                <Text>{pinCode},</Text>
                <Text>{state},</Text>
              </View>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Icon
                  style={{}}
                  size={20}
                  reverse
                  name="settings-backup-restore"
                  type="MaterialIcons"
                  color="green"
                  onPress={() => {
                    this.props.navigation.navigate('Address');
                  }}
                />
                <Text style={{color: 'red', marginTop: 0, fontSize: 10}}>
                  Change
                </Text>
                <Text style={{color: 'red', fontSize: 10}}>ADDRESS</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    );
  }
}

export default PlaceOrder;

const styles = StyleSheet.create({
  signIn: {
    width: 200,
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
  textInput: {
    color: '#05375a',
    margin: '3%',
    marginTop: '6%',
    borderWidth: 1,
  },
  buttonStyle: {
    justifyContent: 'center',
    height: 50,
    backgroundColor: '#009387',
    borderRadius: 7,
    width: 200,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30,
  },
})