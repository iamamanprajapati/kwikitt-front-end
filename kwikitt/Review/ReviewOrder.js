import React, { Component } from 'react';
import { View, Text, BackHandler, Image, ScrollView,ActivityIndicator } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import StarRating from 'react-native-star-rating';
import Timestamp from 'react-timestamp';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import Header from '../Header';


const labels = ["Booked", "Accepted", "Assigned to Partner", "In Progress", "Confirm"];
const rejectLabels = ["Booked", "Rejected"];


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
      review:'',
      isLoading:true
    };
  }

  onStarRatingPress(rating, id) {
    this.setState({
      starCount:rating
    })
    axios.post(`${global.MyVar}/booking/feedback`, {
      bookingId: id,
      rating: rating,
      review: this.state.review
    }).then(response => {
      console(response.data.data.rating)
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
      const userId1 = JSON.parse(userId);
      console.log(userId1)
      this.setState({ userId: userId1 })
      const bookingId1 = JSON.parse(bookingId);
      console.log('run')
      axios.get(`${global.MyVar}/booking/${bookingId1}`)
        .then(response => {
          if(response.data.data.feedback===null){
            this.setState({
              starCount:0,
              review:'',
              isLoading:false
            })
          }
          else{
          this.setState({
            starCount: response.data.data.feedback.rating,
            review:response.data.data.feedback.review,
            isLoading:false
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

  StepIndicator = (bookingStatus) => {
    if (bookingStatus !== "REJECTED") {
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
  }

  render() {
    const { id, bookingStatus, name, time, image, address, feedback } = this.props.route.params
    const {isLoading} = this.state
    return isLoading === true ? (

      <ActivityIndicator
      style={{ flex: 1 }}
      animating={true}
      size="large"
      color="#0000ff"
    />):(
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
            <Text style={{ marginLeft: 10, marginTop: 20, fontWeight: 'bold',fontSize:15 }}>{name}</Text>
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
          <Text style={{ marginTop: 5, marginLeft: 10, fontSize: 15,fontWeight:'bold' }}>Address</Text>
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
          this.StepIndicator(bookingStatus)
        }

        <View
          style={{
            borderBottomColor: '#d6c4c3',
            borderBottomWidth: 1,
            marginTop: 10
          }}
        />
        <View style={{ height: 50, flexDirection: 'row' }}>
          <View style={{ flex: .4, marginTop: 12, marginLeft: 10 }}>
            <StarRating
              disabled={false}
              maxStars={5}
              rating={this.state.starCount}
              selectedStar={(rating) => this.onStarRatingPress(rating, id)}
              fullStarColor="red"
              animation="rotate"
              starSize={25}
            />
          </View>
          <View style={{ flex: .6, marginTop: 15 }}>
            <Text onPress={() => this.props.navigation.navigate('Review',{id:id,rating:this.state.starCount})} style={{ alignSelf: 'flex-end', marginRight: 30, color: 'blue', fontSize: 12 }}>Write a Review</Text>
          </View>
        </View>
        <View
          style={{
            borderBottomColor: '#d6c4c3',
            borderBottomWidth: 1,
          }}
        />
        <View style={{ height: 50, justifyContent: 'center' }}>
          <Text onPress={() => this.props.navigation.navigate('Help')} style={{ fontSize: 13, alignSelf: 'center', fontWeight: 'bold' }}>NEED HELP ?</Text>
        </View>
        <View
          style={{
            borderBottomColor: '#d6c4c3',
            borderBottomWidth: 1,
          }}
        />
      </ScrollView>
    )
  }
}


export default ReviewOrder;
