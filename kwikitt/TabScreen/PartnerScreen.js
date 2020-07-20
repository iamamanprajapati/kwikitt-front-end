import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableNativeFeedback,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import { Header } from '../Header';
import Timestamp from 'react-timestamp';
import AwesomeAlert from 'react-native-awesome-alerts';
import { createStackNavigator } from '@react-navigation/stack'
import ChangeBookingStatus from '../Partner/ChangeBookingStatus'
import Help from '../Partner/Help'


export class Partner extends Component {
  constructor(props) {
    super(props);
    global.MyVar;
    this.state = {
      data: [],
      serviceName: '',
      userId: null,
      isLoading: true,
      showAlert: false,
    };
  }

  getStatus = (bookingStatus) => {
    switch (bookingStatus) {
      case 'BOOKED':
        return 'Booked';
      case 'ACCEPTED':
        return 'Accepted';
      case 'ASSIGNED_TO_PARTNER':
        return 'Assigned to Partner';
      case 'IN_PROGRESS':
        return 'In Progress';
      case 'DONE':
        return 'Done';
      case 'REJECTED':
        return 'Rejected';
      case 'ACTIVE':
        return 'Active';
      case 'INACTIVE':
        return 'Inactive';
      default:
        return bookingStatus;
    }
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const r = await AsyncStorage.getItem('role');
      const abcd = JSON.parse(value);
      this.setState({ userId: abcd });
      const id = this.state.userId;
      axios
        .get(`${global.MyVar}/booking/list/partner/${id}`)
        .then((response) => {
          console.log(r);
          if (r !== "ROLE_SERVICE_PROVIDER") {
            this.setState({ showAlert: true, isLoading: false });
          } else {
            this.setState({
              data: response.data.data,
              isLoading: false,
            });
          }
        })
        .catch((error) => {
          this.setState({
            isLoading: false,
            showAlert: true,
          });
        });
    } catch (e) { }
  };

  StoreOrderId = async (value) => {
    console.log(value)
    try {
      await AsyncStorage.setItem('bookingId', JSON.stringify(value));
    } catch (e) {
      console.warn(e);
    }
  }

  RenderReview = (id, bookingStatus, name, time, image, address, feedback, userId) => {
    this.StoreOrderId(id);
    this.props.navigation.navigate('ChangeBookingStatus', { id: id, bookingStatus: bookingStatus, name: name, time: time, image: image, address: address, feedback: feedback, userId: userId })
  }

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  refreshComponent = () => {
    this.getData();
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () =>
      this.refreshComponent()
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }


  render() {
    const { showAlert } = this.state;
    const { data, isLoading } = this.state;

    return isLoading === true ? (
      <ActivityIndicator
        style={{ flex: 1 }}
        animating={true}
        size="large"
        color="#0000ff"
      />
    ) : (
        <View style={{ flex: 1 }}>
          <Header />
          <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
              {data.map((list) => (
                <View
                  key={list.id}
                  style={{ flex: 1, flexDirection: 'column-reverse' }}>
                  <ImageBackground
                    style={{
                      marginTop: 5,
                      marginLeft: 5,
                      marginRight: 5,
                      backgroundColor: 'white',
                      borderWidth: 0,
                      borderColor: 'white',
                      marginTop: 4,
                      elevation: 4,
                      height: 150,
                    }}>
                    <TouchableNativeFeedback onPress={() => this.RenderReview(list.id, list.bookingStatus, list.service.name, list.bookingDate / 1000, list.service.serviceImage, list.address, list.feedback, list.usersByCustomer.name)} >
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                          <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 16, marginLeft: 10 }}>
                              {list.service.name}
                            </Text>
                            <Text>{list.rating}</Text>
                            <Text
                              style={{
                                marginLeft: 10,
                                marginTop: 10,
                                fontSize: 10,
                                color: 'green',
                              }}>
                              {'\u2B24'}
                              <Text style={{ fontSize: 12 }}>
                                {' '}
                                <Timestamp
                                  time={list.bookingDate / 1000}
                                  format="full"
                                  component={Text}
                                />
                              </Text>
                            </Text>
                            <Text
                              style={{
                                marginLeft: 12,
                                marginTop: 20,
                                fontSize: 14,
                                color: 'red',
                              }}>
                              {this.getStatus(list.bookingStatus)}
                            </Text>
                          </View>
                          <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Image
                              style={{ height: 100, width: 100 }}
                              source={{
                                uri: `${global.MyVar}/uploads/services/${list.service.serviceImage}`,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                    </TouchableNativeFeedback>
                  </ImageBackground>
                </View>
              ))}
            </ScrollView>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title="Alert"
              message="You are not partner of kwikitt team"
              closeOnTouchOutside={false}
              closeOnHardwareBackPress={true}
              showCancelButton={false}
              showConfirmButton={false}
              confirmText="OK"
              confirmButtonColor="#DD6B55"
              onConfirmPressed={() => {
                this.hideAlert();
              }}
            />
          </View>
        </View>
      );
  }
}

const Stack = createStackNavigator();

export class PartnerScreen extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="PartnerScreen" component={Partner} />
        <Stack.Screen name="ChangeBookingStatus" component={ChangeBookingStatus} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    )
  }
}

export default PartnerScreen;
console.disableYellowBox = true;
