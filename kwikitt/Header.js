import React, {Component} from 'react';
import {View, Text, Share, Alert} from 'react-native';
import {Icon} from 'react-native-elements';

export class Header extends Component {
  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'अगर  आप घर बैठे ही अपने इलेक्ट्रॉनिक उपकरण जैसे *AC*, *फ्रिज*, *वाशिंग* *मशीन*, *टीवी*, *कूलर*, *पंखा*, *मोबाइल*, *घर की वायरिंग पुरानी या नई*, ठीक कराना चाहते है। तो दी गई लिंक की सहायता से हमारा एप्लीकेशन डाउनलोड करे। आपके सभी उपकरण घर पर ही ठीक कर दिए जाएंगे आपको कही जाने की आवश्यक्ता नही।धन्यवाद।। https://play.google.com/store/apps/details?id=in.kwikitt',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  render() {
    return (
      <View style={{backgroundColor: '#009387', flexDirection: 'row'}}>
        <View style={{flex: 3.8, justifyContent: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              marginLeft: 10,
              marginTop: 10,
              paddingBottom: 10,
              color: 'white',
            }}>
            Kwikitt
          </Text>
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Icon
            size={30}
            name="share-2"
            type="feather"
            color="white"
            onPress={() => this.onShare()}
          />
        </View>
      </View>
    );
  }
}

export default Header;
