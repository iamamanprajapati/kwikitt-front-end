import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform, TextInput, StatusBar, CheckBox } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Animatable from 'react-native-animatable'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';
import SpinnerButton from 'react-native-spinner-button';

class RegistrationScreen extends Component {
    constructor() {
        super()
        {global.MyVar}
        this.state = {
            email: '',
            name: '',
            roles: [
                'ROLE_SERVICE_USER',
                ''
            ],
            isSelected: false,
            defaultLoading:false
        }
    }

    onSubmit = async (value) => {
        try {
            await AsyncStorage.setItem('token', JSON.stringify(value))
        } catch (e) {
            console.warn(e)
        }
    }


    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (reg.test(text) === false) {
            this.setState({ email: text })
            return false;
        }
        else {
            this.setState({ email: text })
        }
    }

    CheckTextInput = (data1) => {
        if (this.state.email != '') {
          if (this.state.name != '') {
            axios.post(`${global.MyVar}/user/register`, {
                email: this.state.email,
                name: this.state.name,
                phone: data1,
                roles: this.state.roles
            }).then(response => {
                this.onSubmit(response.data.data.id)
                this.props.navigation.navigate('HomeScreen')
            }).catch(error => {
                console.warn(error)
            })
          } else {
            alert('Please Enter Name');
            this.setState({defaultLoading:false})
          }
        } else {
          alert('Please Enter Email');
          this.setState({defaultLoading:false})
        }
      };


    chackBoxChange = (val) => {
        if (val === true) {
            this.setState({
                isSelected: false,
            })
            this.state.roles[1] = ''
        }
        else {
            this.setState({
                isSelected: true,
            })
            this.state.roles[1] = 'ROLE_SERVICE_PROVIDER'
        }
    }

    render() {
        const { data1,id1 } = this.props.route.params

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='#009386' />
                <View style={styles.header}>
                    <Text style={styles.text_header}>Registration Form</Text>
                </View>
                <Animatable.View
                    animation="slideInUp"
                    duration={2000}
                    style={styles.footer}>
                    <View style={styles.action}>
                        <MaterialCommunityIcons
                            name='gmail'
                            color='#05375a'
                            size={25}
                        />
                        <TextInput
                            placeholder="Enter Your Email"
                            style={styles.textInput}
                            keyboardType='email-address'
                            autoCapitalize='none'
                            onChangeText={(text) => this.validate(text)}
                            value={this.state.email}
                        />
                    </View>

                    <View style={styles.action}>
                        <MaterialCommunityIcons
                            name='account'
                            color='#05375a'
                            size={25}
                        />
                        <TextInput
                            placeholder="Enter Your Name"
                            style={styles.textInput}
                            onChangeText={(text) => {
                                this.setState({ name: text })
                            }}
                        />
                    </View>

                    <View style={styles.action}>
                        <CheckBox
                            value={this.state.isSelected}
                            onChange={() => this.chackBoxChange(this.state.isSelected)}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>Do you want to be make service provider?</Text>
                    </View>
                    <View>
                        {/* <TouchableOpacity
                           onPress={()=>
                                this.CheckTextInput(data1)
                            }
                        >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>Sign In</Text>
                            </LinearGradient>
                        </TouchableOpacity> */}
                        <SpinnerButton
                                spinnerType="UIActivityIndicator"
                                buttonStyle={styles.buttonStyle}
                                isLoading={this.state.defaultLoading}
                                onPress={() => {
                                this.setState({ defaultLoading: true });
                                this.CheckTextInput(data1)
                                }}
                            >
                                <Text style={styles.textSign}>SignIn</Text>
                            </SpinnerButton>

                    </View>
                </Animatable.View>
            </View>
        )
    }
}


export default RegistrationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS == 'android' ? -12 : 0,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
    },
    checkbox: {
        alignSelf: "center",
    },
    label: {
        margin: 8,
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        backgroundColor: '#009387',
        borderRadius:7,
        marginTop:30
      }
})