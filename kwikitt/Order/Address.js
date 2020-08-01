import React, { Component } from 'react';
import axios from 'axios';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  TouchableHighlight,
  ActivityIndicator,
  BackHandler
} from 'react-native';
import { Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

const Width = Dimensions.get('window').width;

export class Address extends Component {
  constructor() {
    super();
    global.MyVar;
    this.state = {
      data: [],
      userId: null,
      orderId: null,
      names: '',
      serviceImages: '',
      desc: '',
      servId: null,
      isLoading: true,
      showAlert: false,
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const abcd = JSON.parse(value);
      const value2 = await AsyncStorage.getItem('orderId');
      const serviceId = JSON.parse(value2);
      this.setState({ servId: serviceId, userId: abcd });
      const id = this.state.userId;
      axios
        .get(`${global.MyVar}/api/address/list/${id}`)
        .then((response) => {
          this.setState({
            data: response.data.data,
          });
        })
        .catch((error) => {
          this.setState({
            showAlert: true,
          });
        });
      axios.get(`${global.MyVar}/service/${serviceId}`).then((response) => {
        this.setState({
          names: response.data.name,
          serviceImages: response.data.serviceImage,
          desc: response.data.description,
          isLoading: false,
        });
      });
    } catch (e) { }
  };

  addAddress = () => {
    this.setState({
      showAlert: false,
    });
    this.props.navigation.navigate('AddAddress', { id: this.state.userId });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  onSubmit = async (value) => {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(value));
    } catch (e) {
      console.warn(e);
    }
  };

  refreshComponent = () => {
    this.getData();
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () =>
      this.refreshComponent(),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    this._unsubscribe();

  }


  backAction = async () => {
    this.props.navigation.navigate('Services');
  };

  deleteAddress = (id) => {
    this.setState({
      isLoading: true
    })
    axios
      .delete(
        `${global.MyVar}/api/address/delete/${id}`,
      )
      .then((response) => {
        this.refreshComponent();
      });
  }

  render() {
    const { showAlert } = this.state;
    const { data } = this.state;
    const { serviceImages, isLoading } = this.state;

    return isLoading === true ? (
      <ActivityIndicator
        style={{ flex: 1 }}
        animating={true}
        size="large"
        color="#0000ff"
      />
    ) : (
        <View style={{ flex: 1 }}>
          <View>
            <TouchableOpacity
              style={{ alignItems: 'center', marginBottom: 5 }}
              onPress={() =>
                this.props.navigation.navigate('AddAddress', {
                  id: this.state.userId,
                })
              }>
              <LinearGradient
                colors={['#08d4c4', '#01ab9d']}
                style={styles.signIn}>
                <Text style={[styles.textSign, { color: '#fff' }]}>
                  + Add New Address
              </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <ScrollView>
            <View style={{ flex: 1 }}>
              <View style={{ width: Width }}>
                <Image
                  style={{
                    width: 120,
                    height: 120,
                    alignSelf: 'center',
                    elevation: 4,
                  }}
                  source={{
                    uri: `${global.MyVar}/uploads/services/${serviceImages}`,
                  }}
                />
                <Text
                  style={{ alignSelf: 'center', fontWeight: 'bold', fontSize: 20 }}>
                  {this.state.names}
                </Text>
                <Text
                  style={{
                    marginTop: '5%',
                    marginLeft: '5%',
                    fontSize: 12,
                    paddingBottom: 10,
                  }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
                    Description:
                </Text>{' '}
                  {this.state.desc}{' '}
                </Text>
              </View>
            </View>

            <View style={{ flex: 1 }}>
              {data.map((j) => (
                <TouchableHighlight>
                  <ImageBackground
                    style={{
                      marginTop: 5,
                      marginLeft: 5,
                      marginRight: 5,
                      padding: 5,
                      backgroundColor: 'white',
                      borderWidth: 4,
                      borderColor: 'white',
                      marginTop: 4,
                      height: 150,
                    }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text>{j.street},</Text>
                        <Text>{j.city},</Text>
                        <Text>{j.pinCode},</Text>
                        <Text>{j.state},</Text>
                        <TouchableOpacity
                          style={{
                            width: '40%',
                            height: 40,
                            marginTop: 5,
                            borderRadius: 7,
                          }}
                          onPress={() =>
                            this.props.navigation.navigate('placeOrder', {
                              addId: j.id,
                              street: j.street,
                              city: j.city,
                              state: j.state,
                              pinCode: j.pinCode,
                            })
                          }>
                          <LinearGradient
                            colors={['#08d4c4', '#01ab9d']}
                            style={styles.signIn1}>
                            <Text style={[styles.textSign1, { color: '#fff' }]}>
                              Select
                          </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flex: 0.25,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={{ flex: 0.5 }}>
                          <Icon
                            size={20}
                            reverse
                            name="edit"
                            type="font-awesome"
                            color="green"
                            onPress={() => {
                              this.props.navigation.navigate('EditAddress', {
                                id1: j.id,
                                street1: j.street,
                              });
                            }}
                          />
                        </View>
                        <View style={{ flex: 0.5 }}>
                          <Icon
                            size={20}
                            reverse
                            name="delete"
                            type="AntDesign"
                            color="red"
                            onPress={() => this.deleteAddress(j.id)}
                          />
                        </View>
                      </View>
                    </View>
                  </ImageBackground>
                </TouchableHighlight>
              ))}
            </View>
          </ScrollView>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="Alert"
            message="Please Add a new address"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={true}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText="No, cancel"
            confirmText="OK"
            confirmButtonColor="#DD6B55"
            onCancelPressed={() => {
              this.hideAlert();
            }}
            onConfirmPressed={() => {
              this.addAddress();
            }}
          />
        </View>
      );
  }
}

export default Address;

const styles = StyleSheet.create({
  signIn: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 0,
    borderRadius: 0,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  signIn1: {
    width: '100%',
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 7,
  },
  textSign1: {
    fontSize: 13,
    fontWeight: 'bold',
  },
});
