import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import Animation from 'lottie-react-native';
import anim from '../assets/soda_loader.json';

export class BookOrder extends Component {
    componentDidMount() {
        this.animation.play();
      }
    render() {
        return (
          <View style={styles.container}>
            <View>
              <Animation
                ref={animation => {
                  this.animation = animation;
                }}
                style={{
                  width: 150,
                  height: 150,
                  marginTop:80
                }}
                loop={false}
                source={anim}
              />
            </View>
            <Text style={styles.welcome}>Order Booked</Text>
            <TouchableOpacity
                    style={{alignItems:'center'}}
                    onPress={()=>this.props.navigation.navigate('MyOrders')}
               >
                            <LinearGradient
                                colors={['#08d4c4', '#01ab9d']}
                                style={styles.signIn}
                            >
                                <Text style={[styles.textSign, { color: '#fff' }]}>Go To Home</Text>
                            </LinearGradient>
                        </TouchableOpacity>
          </View>
        );
      }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'white'
    },
    welcome: {
      fontSize: 30,
      textAlign: 'center',
      marginTop: 80,
      color: '#00b304',
      fontWeight:'bold'
    },
    signIn: {
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginTop: 30,
  },
  textSign: {
      fontSize: 18,
      fontWeight: 'bold'
  },
  textInput: {
      color: '#05375a',
      margin:'3%',
      marginTop:'6%',
      borderWidth:1,

  },
  });

  AppRegistry.registerComponent('lottieloader', () => lottieloader);

  export default BookOrder;