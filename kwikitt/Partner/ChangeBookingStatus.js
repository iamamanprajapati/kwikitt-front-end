import React, { Component } from 'react';
import { View, Text, BackHandler, Image, ScrollView, ActivityIndicator, Dimensions, Linking } from 'react-native';
import StarRating from 'react-native-star-rating';
import Timestamp from 'react-timestamp';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Header';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';

const labels = ["Booked", "Accepted", "Assigned to Partner", "In Progress", "Done"];
const rejectLabels = ["Booked", "Rejected"];

const Width = Dimensions.get('window').width;
const Width1 = (Width) - 50
const Width2 = (Width / 2) - 40

const inprogress = "IN_PROGRESS"

class ChangeBookingStatus extends Component {
  constructor(props) {
    global.MyVar;
    super(props);
    this.state = {
      currentPosition: "Order Summary",
      starCount: 0,
      userId: null,
      review: '',
      isLoading: true,
    };
  }

  handleBackButton = async () => {
    this.props.navigation.navigate('PartnerScreen')
  }

  refreshComponent = () => {
    this.getData();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton)
  };

  componentDidMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    this._unsubscribe = this.props.navigation.addListener('focus', () =>
      this.refreshComponent(),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton)
    this._unsubscribe();
  }

  getData = async () => {
    try {
      const bookingId = await AsyncStorage.getItem('bookingId');
      const userId = await AsyncStorage.getItem('token');
      const userId1 = JSON.parse(userId);
      console.log(userId1)
      this.setState({ userId: userId1 })
      const bookingId1 = JSON.parse(bookingId);
      console.log('run')
      axios.get(`${global.MyVar}/booking/${bookingId1}`)
        .then(response => {
          if (response.data.data.feedback === null) {
            this.setState({
              starCount: 0,
              review: '',
              isLoading: false
            })
          }
          else {
            this.setState({
              starCount: response.data.data.feedback.rating,
              review: response.data.data.feedback.review,
              isLoading: false
            })
          }
        })
    } catch (e) { }
  }

  mobileCall = (mobile) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${mobile}`;
    }
    else {
      phoneNumber = `telprompt:${mobile}`
    }

    Linking.openURL(phoneNumber);
  };

  onChange = (value) => {
    switch (value) {
      case "BOOKED": return 1;
      case "ACCEPTED": return 2;
      case "ASSIGNED_TO_PARTNER": return 3
      case "IN_PROGRESS": return 4;
      case "DONE": return 5;
    }
  }

  getReview = (review) => {
    if (review === "") {
      return (
        <View style={{ height: 0 }}><Text> </Text></View>
      )
    }
    else {
      return (
        <View>
          <Text style={{ marginTop: 5, marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>Review</Text>
          <Text style={{ marginLeft: 10, marginBottom: 10 }}>{review}</Text>
          <View
            style={{
              borderBottomColor: '#d6c4c3',
              borderBottomWidth: 1,
            }}
          />
        </View>
      )
    }
  }

  getRating = (feedback, bookingStatus) => {
    if (feedback !== null) {
      if (feedback.rating !== 0) {
        if (bookingStatus === "DONE") {
          return (
            <View>
              <View style={{ height: 50, flexDirection: 'row' }}>
                <View style={{ flex: .4, marginTop: 12, marginLeft: 10 }}>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={feedback.rating}
                    fullStarColor="red"
                    starSize={25}
                  />
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#d6c4c3',
                  borderBottomWidth: 1,
                }}
              />
            </View>
          )
        }
        else {
          return (
            <View></View>
          )
        }
      }
      return (
        <View>
          <View style={{ height: 50, flexDirection: 'row' }}>
            <View style={{ flex: .4, marginTop: 12, marginLeft: 10 }}>
              <Text>Not Yet Rated</Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#d6c4c3',
              borderBottomWidth: 1,
            }}
          />
        </View>
      )
    }
    return (
      <View></View>
    )
  }

  getContactOfPartner = (bookingStatus, usersByCustomer) => {
    if (bookingStatus === "BOOKED" || bookingStatus === "ACCEPTED" || bookingStatus === "CANCEL" || bookingStatus === "REJECTED" || bookingStatus === "DONE") {
      return (
        <View style={{ height: 0 }}>
        </View>
      )
    }
    else {
      return (
        <View>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <View style={{ flexDirection: 'column', flex: .75 }}>
              <Text style={{ fontWeight: 'bold', marginTop: 5, marginLeft: 10 }}>User</Text>
              <View style={{ justifyContent: 'center' }} ><Text style={{ marginLeft: 10 }}>{usersByCustomer.name}</Text></View>
            </View>
            <View style={{ flex: .25, justifyContent: 'center', alignItems: 'center' }}>
              <Icon
                size={15}
                style={{ alignSelf: 'center' }}
                reverse
                name="call"
                type="ionicons"
                color="green"
                onPress={() => this.mobileCall(usersByCustomer.mobile)}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#d6c4c3',
              borderBottomWidth: 1,
              marginTop: 0
            }}
          />
        </View>
      )
    }
  }

  changeStatus = (id, status) => {
    this.setState({
      isLoading: true
    })
    axios.post(`${global.MyVar}/booking/update/status/${id}`, {
      status,
    }
    )
      .then(response => {
        this.refreshComponent();
      })
  }

  RejectOrInprogress = (bookingStatus, id) => {
    if (bookingStatus === "ASSIGNED_TO_PARTNER") {
      return (
        <View style={{ flexDirection: 'row', flex: 1, marginTop: 20 }}>
          <View style={{ flex: .5, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.changeStatus(id, "IN_PROGRESS")}
              style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, height: 45, width: Width2, backgroundColor: 'green', borderRadius: 5, borderColor: 'white' }}><Text style={{ color: 'white' }}>In Progress</Text></TouchableOpacity>
          </View>
          <View style={{ flex: .5, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.changeStatus(id, "REJECT")}
              style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, height: 45, width: Width2, backgroundColor: '#ff3333', borderRadius: 5, borderColor: 'white' }}><Text style={{ color: 'white' }}>Reject</Text></TouchableOpacity>
          </View>
        </View>
      )
    }
    else if (bookingStatus === "IN_PROGRESS") {
      return (
        <View style={{ flexDirection: 'row', flex: 1, marginTop: 20 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => this.changeStatus(id, "DONE")}
              style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, height: 45, width: Width1, backgroundColor: 'green', borderRadius: 5, borderColor: 'white' }}><Text style={{ color: 'white' }}>Done</Text></TouchableOpacity>
          </View>
        </View>
      )
    }
  }


  render() {
    const { id, bookingStatus, name, time, image, address, feedback, usersByCustomer } = this.props.route.params
    const { isLoading } = this.state
    return isLoading === true ? (

      <ActivityIndicator
        style={{ flex: 1 }}
        animating={true}
        size="large"
        color="#0000ff"
      />) : (
        <ScrollView style={{ flex: 1 }}>
          <Header />
          <View style={{ height: 30 }}>
            <Text style={{ color: '#8c8281', marginTop: 10, marginLeft: 10 }}>Order ID - {id}</Text>
            <View
              style={{
                borderBottomColor: '#d6c4c3',
                borderBottomWidth: 1,
                marginTop: 10
              }}
            />
          </View>
          <View style={{ flexDirection: 'row', height: 130 }}>
            <View style={{ flex: .7, marginTop: 10 }}>
              <Text style={{ marginLeft: 10, marginTop: 20, fontWeight: 'bold', fontSize: 15 }}>{name}</Text>
              <Text
                style={{
                  marginLeft: 10,
                  marginTop: 5,
                  fontSize: 10,
                  color: 'green',
                }}>
                {'\u2B24'}
                <Text style={{ fontSize: 12 }}>
                  <Timestamp
                    time={time}
                    format="full"
                    component={Text}
                  />
                </Text>
              </Text>

            </View>
            <View style={{ flex: .3 }}>
              <Image
                style={{ height: 100, width: 100, alignSelf: 'center', marginTop: 25 }}
                source={{
                  uri: `${global.MyVar}/uploads/services/${image}`,
                }}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomColor: '#d6c4c3',
              borderBottomWidth: 1,
              marginTop: 10
            }}
          />
          <View >
            <Text style={{ marginTop: 5, marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>Address</Text>
            <Text style={{ marginTop: 5, marginLeft: 10, fontSize: 12, }}>{address.street} , {address.city} , {address.state} , {address.pinCode}</Text>
          </View>
          <View
            style={{
              borderBottomColor: '#d6c4c3',
              borderBottomWidth: 1,
              marginTop: 10
            }}
          />
          {
            this.getContactOfPartner(bookingStatus, usersByCustomer)
          }

          {
            this.getRating(feedback, bookingStatus)
          }
          {this.getReview(this.state.review)}
          <View style={{ height: 50, justifyContent: 'center' }}>
            <Text onPress={() => this.props.navigation.navigate('Help')} style={{ fontSize: 13, alignSelf: 'center', fontWeight: 'bold' }}>NEED HELP ?</Text>
          </View>
          <View
            style={{
              borderBottomColor: '#d6c4c3',
              borderBottomWidth: 1,
            }}
          />
          {
            this.RejectOrInprogress(bookingStatus, id)
          }
        </ScrollView>
      )
  }
}


export default ChangeBookingStatus;
