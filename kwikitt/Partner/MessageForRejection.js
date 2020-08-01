import React, { Component } from 'react';
import { View, Text, BackHandler, StyleSheet, TextInput, Alert } from 'react-native';
import SpinnerButton from 'react-native-spinner-button';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage';


class MessageForRejection extends Component {
    constructor(props) {
        super(props);
        global.MyVar;
        this.state = {
            message: '',
            defaultLoading: false
        };
    }

    StoreOrderId = async () => {
        try {
            await AsyncStorage.setItem('bookingStatus', "REJECTED");
        } catch (e) {
            console.warn(e);
        }
    }

    CheckTextInput = (id, reject) => {
        if (this.state.message.length >= '1') {
            axios.post(`${global.MyVar}/booking/update/status/${id}`, {
                message: this.state.message,
                status: reject,
            })
                .then(response => {
                    this.StoreOrderId()
                    this.props.navigation.navigate('ChangeBookingStatus')
                })
                .catch((error) => {
                    console.log(error);
                });
        } else {
            Alert.alert('Please Enter Message of Rejection');
            this.setState({ defaultLoading: false });
        }
    };



    backAction = async () => {
        this.props.navigation.navigate('ChangeBookingStatus')
    };

    componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
    }

    render() {
        const { id, reject } = this.props.route.params
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <TextInput

                    placeholder="Write Your Message"
                    editable
                    style={{ marginTop: 10, width: 350, textAlignVertical: 'top', fontSize: 15, fontStyle: 'normal' }}
                    multiline={true}
                    numberOfLines={10}
                    onChangeText={(text) => {
                        this.setState({ message: text });
                    }}
                />
                <SpinnerButton
                    spinnerType="UIActivityIndicator"
                    buttonStyle={styles.buttonStyle}
                    isLoading={this.state.defaultLoading}
                    onPress={() => {
                        this.setState({ defaultLoading: true });
                        this.CheckTextInput(id, reject);
                    }}>
                    <Text style={styles.textSign}>Reject</Text>
                </SpinnerButton>
            </View>
        );
    }
}

export default MessageForRejection;

const styles = StyleSheet.create({
    textSign: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 50,
        backgroundColor: 'red',
        borderRadius: 7,
        marginTop: 30,
        width: 200
    },
});