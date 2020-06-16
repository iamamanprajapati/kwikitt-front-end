import React, { Component } from 'react';
import Carousel from 'react-native-banner-carousel';
import { StyleSheet, Image, View, Dimensions,Animated,Easing } from 'react-native';
 
const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 210;
 
export default class Banner extends Component {
  constructor(props){
    super(props)
    this.state={
     arr:[
      {
        id:1,
        image:require('./assets/contact.png')
      },
      {
        id:2,
        image:require('./assets/mobile.png')
      },
      {
        id:3,
        image:require('./assets/electrician.png')
      }
    ]
  }
  }

    render() {
        return (
            <View style={styles.container}>
                <Carousel
                    autoplay
                    autoplayTimeout={3000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                      {
                        this.state.arr.map(item=>(
                          <Image style={{ width: BannerWidth, height: BannerHeight }} key={item.id} source={item.image} />
                        ))
                      }
                    
                </Carousel>
            </View>
        );
    }
}
 
const styles = StyleSheet.create({
    container: {
        marginTop:5,
        flex: .30,
        height:165,
        backgroundColor: '#fff',
        justifyContent: 'center'
    },
});