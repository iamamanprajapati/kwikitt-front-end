import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

class SplashScreen extends Component {
  constructor() {
    super();
    console.warn('run');
    global.MyVar = 'http://d0eaf8f46cb2.ngrok.io';
    this.state = {
      userId: null,
      isLoading: true,
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const abcd = JSON.parse(value);
      this.setState({ userId: abcd });
      if (this.state.userId != null) {
        this.props.navigation.navigate('HomeScreen');
      }
      axios
        .post(`${global.MyVar}/app-version/validate`, {
          platform: 'ANDROID',
          version: '2.0.0',
        })
        .then((response) => {
          if (response.data.data.status === false) {
            Alert.alert(
              'please update the app to use our services',
              '',
              [
                { text: 'Yes', onPress: this.openURL },
              ],
              { cancelable: false }
            )
          }
        });
    } catch (e) {
      console.warn(e);
    }
  };


  openURL = () => {
    Linking.openURL('market://details?id=in.kwikitt');
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009387" />
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>
        <Animatable.View
          animation="fadeInUpBig"
          duration={3000}
          style={styles.footer}>
          <Text style={styles.title}>Join with Kwikitt</Text>
          <View style={{ alignItems: 'flex-end', marginTop: '15%' }}>
            <TouchableOpacity
              onPress={
                () => this.props.navigation.navigate('MobileVerificationScreen')
              }>
              <LinearGradient
                colors={['#bf7366', '#007340']}
                style={styles.signIn}>
                <Text style={styles.textSign}>Get Started</Text>
                <MaterialIcons
                  name="keyboard-arrow-right"
                  color="#fff"
                  size={20}
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    );
  }
}

export default SplashScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.5;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    marginTop: 100,
  },
  title: {
    color: '#05375a',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    color: 'grey',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
  },
});
