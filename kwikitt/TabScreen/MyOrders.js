import React, { Component } from 'react';
import {
  View,
  Text,
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
import ReviewOrder from '../Review/ReviewOrder'
import Review from '../Review/Review'
import Help from '../Review/Help'

export class HelloOrders extends Component {
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

  StoreOrderId = async (value) => {
    console.log(value)
    try {
      await AsyncStorage.setItem('bookingId', JSON.stringify(value));
    } catch (e) {
      console.warn(e);
    }
  }

  RenderReview = (id, bookingStatus, name, time, image,address,feedback) => {
    this.StoreOrderId(id);
    this.props.navigation.navigate('ReviewOrder', { id: id, bookingStatus: bookingStatus, name: name, time: time, image: image,address:address,feedback:feedback })
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const abcd = JSON.parse(value);
      this.setState({ userId: abcd });
      const id = this.state.userId;
      axios.get(`${global.MyVar}/booking/list/user/${id}`).then((response) => {
        console.log(response.data);
        if (response.data.data.length === 0) {
          this.setState({ showAlert: true, isLoading: false });
        } else {
          this.setState({
            data: response.data.data,
            isLoading: false,
          });
        }
      });
    } catch (e) { }
  };

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
      this.refreshComponent(),
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
                    <TouchableNativeFeedback onPress={() => this.RenderReview(list.id, list.bookingStatus, list.service.name, list.bookingDate / 1000, list.service.serviceImage,list.address,list.feedback)} >
                      <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 3, flexDirection: 'row' }}>
                          <View style={{ flex: 2 }}>
                            <Text style={{ fontSize: 15, marginLeft: 10,marginTop:10,fontWeight:'bold' }}>
                              {list.service.name}
                            </Text>
                            <Text
                              style={{
                                marginLeft: 10,
                                marginTop: 15,
                                fontSize: 10,
                                color: 'green',
                              }}>
                              {'\u2B24'}
                              <Text style={{ fontSize: 12 }}>
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
              message="You have no any booking"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={true}
              showCancelButton={false}
              showConfirmButton={true}
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

export class MyOrders extends Component {
  render() {
    return (
      <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="MyOrders" component={HelloOrders} />
        <Stack.Screen name="ReviewOrder" component={ReviewOrder} />
        <Stack.Screen name="Review" component={Review} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    )
  }
}

export default MyOrders;

console.disableYellowBox = true;
