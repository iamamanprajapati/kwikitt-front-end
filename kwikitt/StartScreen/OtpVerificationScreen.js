import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform, StatusBar, Alert} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import * as Animatable from 'react-native-animatable';
import axios from 'axios';
import SpinnerButton from 'react-native-spinner-button';
import AsyncStorage from '@react-native-community/async-storage';
import AwesomeAlert from 'react-native-awesome-alerts';

class OtpVerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      defaultLoading: false,
      showAlert: false,
    };
  }

  onSubmit = async (value) => {
    try {
      await AsyncStorage.setItem('token', JSON.stringify(value));
    } catch (e) {
      console.warn(e);
    }
  };

  onRoleSubmit = async (r) =>{
    try {
      await AsyncStorage.setItem('role', r);
    } catch (error) {
      console.warn(e);
    }
  }

  checkService = (id)=>{
      axios.get(`${global.MyVar}/service-partner/list/service/${id}`)
      .then(response=>{
        if(response.data.data.length===0){
          this.props.navigation.navigate('LoginServiceScreen',{userId:id});
        }
        else{
          this.props.navigation.navigate('HomeScreen');
        }
      })
  }

  refreshComponent = () => {
    this.setState({
      defaultLoading: false,
    });
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () =>
      this.refreshComponent(),
    );
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  CheckTextInput = (data) => {
    if (this.state.otp.length >= '4') {
      this.setState({defaultLoading: true});
      axios
        .post(`${global.MyVar}/user/verify/otp/finish`, {
          otp: this.state.otp,
          phone: data,
        })
        .then((response) => {
          if (!response.data.data.isRegistered) {
            this.props.navigation.navigate('RegistrationScreen', {
              data1: data,
            });
          } else {
                this.onSubmit(response.data.data.id);
                    if(response.data.data.roles[1]){
                      this.onRoleSubmit(response.data.data.roles[1])
                      this.checkService(response.data.data.id);
                    }
                    else{
                      this.props.navigation.navigate('HomeScreen');
                    }
          }
        })
        .catch((error) => {
          this.setState({
            showAlert: true,
          });
        });
    } else {
      Alert.alert('please enter otp');
      this.setState({
        defaultLoading: false,
      });
    }
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
      defaultLoading: false,
    });
  };

  render() {
    const {showAlert} = this.state;
    const {data} = this.props.route.params;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#009386" />
        <View style={styles.header}>
          <Text style={styles.text_header}>OTP SCREEN</Text>
        </View>
        <Animatable.View
          animation="slideInUp"
          duration={2000}
          style={styles.footer}>
          <View style={styles.action}>
            <OTPInputView
              style={{width: '80%', height: 200}}
              pinCount={4}
              onCodeChanged={(text) => {
                this.setState({otp: text});
              }}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
            />
          </View>
          <View>
            <SpinnerButton
              spinnerType="UIActivityIndicator"
              buttonStyle={styles.buttonStyle}
              isLoading={this.state.defaultLoading}
              onPress={() => {
                this.CheckTextInput(data);
              }}>
              <Text style={styles.textSign}>OTP Verify</Text>
            </SpinnerButton>
          </View>
        </Animatable.View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Alert"
          message="Please Enter a valid OTP"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="OK"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

export default OtpVerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS == 'android' ? -12 : 0,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#009387',
    borderRadius: 7,
    marginTop: 30,
  },
});
