import React, { Component } from 'react';
import { View, ImageBackground, Image, TouchableNativeFeedback, Linking, BackHandler } from 'react-native';

class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  mobileCall = () => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:${6395893748}';
    }
    else {
      phoneNumber = 'telprompt:${6395893748}';
    }

    Linking.openURL(phoneNumber);
  };

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
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground style={{ width: '100%', height: '100%' }} source={require('./contactpage.png')}>
          <View style={{ flex: 1, flexDirection: 'row', }}>
            <View style={{ flex: .33, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableNativeFeedback onPress={() => Linking.openURL('http://api.whatsapp.com/send?phone=91' + 7275924625)} >
                <Image
                  source={require('./wp.png')}
                  style={{ width: 100, height: 100, marginTop: 200 }}
                />
              </TouchableNativeFeedback>
            </View>
            <View style={{ flex: .33, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableNativeFeedback onPress={() => this.mobileCall()} activeOpacity={0.7} >
                <Image
                  source={require('./call.png')}
                  style={{ width: 90, height: 90, marginTop: 200 }}
                />
              </TouchableNativeFeedback>
            </View>
            <View style={{ flex: .33, justifyContent: 'center', alignItems: 'center' }}>
              <TouchableNativeFeedback onPress={() => Linking.openURL('mailto:kwikitt.pvt.ltd@gmail.com?subject=Hello, Kwikitt &body=Need Help,')} >
                <Image
                  source={require('./email.png')}
                  style={{ width: 90, height: 90, marginTop: 200 }}
                />
              </TouchableNativeFeedback>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

export default Help;
