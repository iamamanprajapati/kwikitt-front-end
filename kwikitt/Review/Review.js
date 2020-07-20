import React, { Component } from 'react';
import { View, Text,BackHandler,StyleSheet,TextInput } from 'react-native';
import SpinnerButton from 'react-native-spinner-button';
import axios from 'axios'



class Review extends Component {
  constructor(props) {
    super(props);
    global.MyVar;
    this.state = {
      message:'',
      defaultLoading:false
    };
  }

  sendReview = (id,rating) =>{
    axios.post(`${global.MyVar}/booking/feedback`, {
      bookingId: id,
      rating: rating,
      review: this.state.message
    }).then(response => {
      this.props.navigation.navigate('ReviewOrder')
    })
  }
 
  backAction = async () => {
    this.props.navigation.navigate('ReviewOrder')
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.backAction);
  }


  render() {
    const {review,id,rating} = this.props.route.params
    return (
      <View style={{flex:1,alignItems:'center'}}>
        <TextInput
              
              placeholder="Write Your Review"
              editable
              style={{borderWidth:1,marginTop:10,width:350,textAlignVertical: 'top',fontSize:20}}
              multiline={true}
              numberOfLines={10}
              onChangeText={(text) => {
                this.setState({message: text});
              }}
            />
            <SpinnerButton
              spinnerType="UIActivityIndicator"
              buttonStyle={styles.buttonStyle}
              isLoading={this.state.defaultLoading}
              onPress={() => {
                this.setState({defaultLoading: true});
                this.sendReview(id,rating);
              }}>
              <Text style={styles.textSign}>Review</Text>
            </SpinnerButton>
      </View>
    );
  }
}

export default Review;

const styles = StyleSheet.create({
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    height: 50,
    backgroundColor: '#009387',
    borderRadius: 7,
    marginTop: 30,
    width:200
  },
});


