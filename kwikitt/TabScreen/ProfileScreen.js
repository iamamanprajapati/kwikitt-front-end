import React, {Component} from 'react';
import {View, Text, Image, ActivityIndicator, StyleSheet} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import SpinnerButton from 'react-native-spinner-button';

export class ProfileScreen extends Component {
  constructor() {
    super();
    global.MyVar;
    this.state = {
      userId: null,
      name: '',
      email: '',
      mobile: '',
      isLoading: true,
    };
  }

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      const abcd = JSON.parse(value);
      this.setState({userId: abcd});
      axios
        .get(`${global.MyVar}/user/${this.state.userId}`)
        .then((response) => {
          this.setState({
            name: response.data.data.name,
            email: response.data.data.email,
            mobile: response.data.data.mobile,
            isLoading: false,
          });
        });
    } catch (e) {
      console.warn(e);
    }
  };

  onSubmit = async (value) => {
    try {
      await AsyncStorage.setItem('token', '');
    } catch (e) {
      console.warn(e);
    }
  };

  CheckTextInput = () => {
    this.onSubmit();
    this.props.navigation.navigate('SplashScreen');
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const {isLoading} = this.state;
    return isLoading === true ? (
      <ActivityIndicator style={{flex: 1}} size="large" color="#009386" />
    ) : (
      <View style={{flex: 1, backgroundColor: '#009386', alignItems: 'center'}}>
        <Image
          style={{width: 120, height: 120, marginTop: 60}}
          source={require('../profile.png')}
        />
        <Text
          style={{
            marginTop: 20,
            fontWeight: 'bold',
            fontSize: 25,
            color: 'white',
          }}>
          {this.state.name}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontWeight: '200',
            color: 'white',
          }}>
          {' '}
          {this.state.email}
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontWeight: '200',
            color: 'white',
          }}>
          {this.state.mobile}
        </Text>
        <SpinnerButton
          spinnerType="UIActivityIndicator"
          buttonStyle={styles.buttonStyle}
          isLoading={this.state.defaultLoading}
          onPress={() => {
            this.setState({defaultLoading: true});
            this.CheckTextInput();
          }}>
          <Text style={styles.textSign}>Log Out</Text>
        </SpinnerButton>
      </View>
    );
  }
}

export default ProfileScreen;

console.disableYellowBox = true;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#009387',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 100,
    backgroundColor: '#d9d9d9',
    borderRadius: 10,
    marginTop: 20,
  },
});
