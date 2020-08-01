import React, { Component } from 'react';
import { View, Text, BackHandler, Image, ScrollView, ActivityIndicator, Linking, TouchableOpacity, Dimensions } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import StarRating from 'react-native-star-rating';
import Timestamp from 'react-timestamp';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Header';
import { Icon } from 'react-native-elements';


const labels = ["Booked", "Accepted", "Assigned to Partner", "In Progress", "Done"];
const rejectLabels = ["Booked", "Rejected"];
const cancelLabels = ["Booked", "Cancelled"]

const Width = Dimensions.get('window').width;
const Width1 = (Width) - 50
const Width2 = (Width / 2) - 40


const customStyles = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'green',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'green',
  stepStrokeUnFinishedColor: 'black',
  separatorFinishedColor: 'green',
  separatorUnFinishedColor: 'black',
  stepIndicatorFinishedColor: 'green',
  stepIndicatorUnFinishedColor: 'black',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: 'green',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: 'black',
  labelSize: 13,
  currentStepLabelColor: 'green',
}

const customStylesRejection = {
  stepIndicatorSize: 10,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'red',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'red',
  stepStrokeUnFinishedColor: 'red',
  separatorFinishedColor: 'red',
  separatorUnFinishedColor: 'red',
  stepIndicatorFinishedColor: 'red',
  stepIndicatorUnFinishedColor: 'red',
  stepIndicatorCurrentColor: 'red',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: 'red',
  stepIndicatorLabelFinishedColor: 'red',
  stepIndicatorLabelUnFinishedColor: 'red',
  labelColor: 'red',
  labelSize: 13,
  currentStepLabelColor: 'red',
}

class ReviewOrder extends Component {
  constructor(props) {
    global.MyVar;
    super(props);
    this.state = {
      currentPosition: "Order Summary",
      starCount: 0,
      userId: null,
      review: '',
      isLoading: true,
      bookingStatus: ''
    };
  }

  onStarRatingPress(rating, id) {
    this.setState({
      starCount: rating
    })
    axios.post(`${global.MyVar}/booking/feedback`, {
      bookingId: id,
      rating: rating,
      review: this.state.review
    }).then(response => {
      console.log(response.data.data.rating)
    })
  }

  handleBackButton = async () => {
    this.props.navigation.navigate('MyOrders')
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
      const bookStatus = await AsyncStorage.getItem('bookingStatus');
      console.log(bookStatus);
      const userId1 = JSON.parse(userId);
      console.log(userId1)
      this.setState({ userId: userId1, bookingStatus: bookStatus })
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
          <Text style={{ marginTop: 5, marginLeft: 10, fontSize: 15, fontWeight: 'bold' }}>Your Review</Text>
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

  changeTextByEditReview = (review, id, rating) => {
    if (review === "") {
      return (
        <Text onPress={() => this.props.navigation.navigate('Review', { review: review, id: id, rating: rating })} style={{ alignSelf: 'flex-end', marginRight: 30, color: 'blue', fontSize: 12 }}>Write a Review</Text>
      )
    }
    else {
      return (
        <Text onPress={() => this.props.navigation.navigate('Review', { review: review, id: id, rating: rating })} style={{ alignSelf: 'flex-end', marginRight: 30, color: 'blue', fontSize: 12 }}>Edit Review</Text>
      )
    }
  }

  getRating = (id, review, starCount, bookingStatus) => {
    if (bookingStatus === "DONE") {
      return (
        <View>
          <View style={{ height: 50, flexDirection: 'row' }}>
            <View style={{ flex: .4, marginTop: 12, marginLeft: 10 }}>
              <StarRating
                disabled={false}
                maxStars={5}
                rating={starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating, id)}
                fullStarColor="red"
                animation="rotate"
                starSize={25}
              />
            </View>
            <View style={{ flex: .6, marginTop: 15 }}>
              {this.changeTextByEditReview(review, id, starCount)}
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
        <View>

        </View>
      )
    }
  }

  StepIndicator = (bookingStatus) => {
    console.log(bookingStatus)
    if (bookingStatus !== "REJECTED" && bookingStatus !== "CANCELLED") {
      return (
        <View style={{ height: 200 }}>
          <StepIndicator
            stepCount={5}
            customStyles={customStyles}
            currentPosition={this.onChange(bookingStatus)}
            labels={labels}
            direction="vertical"
          />
        </View>
      )
    }
    else {
      if (bookingStatus === "REJECTED") {
        return (
          <View style={{ height: 75 }}>
            <StepIndicator
              stepCount={2}
              customStyles={customStylesRejection}
              currentPosition={2}
              labels={rejectLabels}
              direction="vertical"
            />
          </View>
        )
      }
      else {
        return (
          <View style={{ height: 75 }}>
            <StepIndicator
              stepCount={2}
              customStyles={customStylesRejection}
              currentPosition={2}
              labels={cancelLabels}
              direction="vertical"
            />
          </View>
        )
      }
    }
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

  getContactOfPartner = (bookingStatus, usersByPartner) => {
    if (bookingStatus === "BOOKED" || bookingStatus === "ACCEPTED" || bookingStatus === "CANCELLED" || bookingStatus === "REJECTED" || bookingStatus === "DONE") {
      return (
        <View style={{ height: 0 }}>
        </View>
      )
    }
    else {
      if (usersByPartner !== null) {
        return (
          <View>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <View style={{ flexDirection: 'column', flex: .75 }}>
                <Text style={{ fontWeight: 'bold', marginTop: 5, marginLeft: 10 }}>Partner</Text>
                <View style={{ justifyContent: 'center' }} ><Text style={{ marginLeft: 10, fontSize: 12 }}>{usersByPartner.name}</Text></View>
              </View>
              <View style={{ flex: .25, justifyContent: 'center', alignItems: 'center' }}>
                <Icon
                  size={15}
                  style={{ alignSelf: 'center' }}
                  reverse
                  name="call"
                  type="ionicons"
                  color="green"
                  onPress={() => this.mobileCall(usersByPartner.mobile)}
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
      return (
        <View style={{ height: 0 }}></View>
      )
    }
  }

  changeStatus = (id, status) => {
    this.setState({
      isLoading: true
    })
    axios.post(`${global.MyVar}/booking/update/status/${id}`,
      {
        message: "",
        status: status
      }
    )
      .then(response => {
        this.setState({ bookingStatus: status, isLoading: false })
        this.render();
      })
  }

  CancelOrder = (bookingStatus, id) => {
    console.log(bookingStatus)
    if (bookingStatus === "DONE" || bookingStatus === "CANCELLED" || bookingStatus === "REJECTED") {
      return (
        <View></View>
      )
    }
    return (
      <View style={{ flexDirection: 'row', flex: 1, marginTop: 20 }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => this.changeStatus(id, "CANCELLED")}
            style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 1, height: 45, width: Width1, backgroundColor: 'green', borderRadius: 5, borderColor: 'white' }}><Text style={{ color: 'white' }}>Cancel Order</Text></TouchableOpacity>
        </View>
      </View>
    )
  }

  render() {
    const { id, name, time, image, address, feedback, usersByPartner } = this.props.route.params
    const { isLoading } = this.state
    return isLoading === true ? (

      <ActivityIndicator
        style={{ flex: 1 }}
        animating={true}
        size="large"
        color="#0000ff"
      />) : (
        <View style={{ flex: 1 }}>
          <Header />
          <ScrollView style={{ flex: 1 }}>
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
              this.StepIndicator(this.state.bookingStatus)
            }
            <View
              style={{
                borderBottomColor: '#d6c4c3',
                borderBottomWidth: 1,
                marginTop: 10
              }}
            />
            {
              this.getContactOfPartner(this.state.bookingStatus, usersByPartner)
            }

            {
              this.getRating(id, this.state.review, this.state.starCount, this.state.bookingStatus)
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
              this.CancelOrder(this.state.bookingStatus, id)
            }
          </ScrollView>
        </View>
      )
  }
}

export default ReviewOrder;
