import React, { Component } from 'react'
import axios from 'axios'
import { View, Text, TouchableOpacity, ImageBackground, StatusBar, Image, ScrollView,BackHandler,Alert,Button } from 'react-native'
import Banner from './Banner'
import Header from './Header'
import serviceApi from './ServiceApi'
import { createStackNavigator } from '@react-navigation/stack';
import ViewServices from './ViewServices'
import Order from './Order/Order'
import AsyncStorage from '@react-native-community/async-storage';


export class CategoryScreen extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      userId:''
    }
  }


  componentDidMount() {
    this.refreshCategory();
    this.getData()
  }

//   onSubmit = async (value) => {
//     try {
//         await AsyncStorage.setItem('token', '')
//     } catch (e) {
//         console.warn(e)
//     }
// }

  getData = async () => {
    try {
        const value = await AsyncStorage.getItem('token')
        this.setState({userId:value})
    } catch (e) {
        console.warn(e)
    }
}


  refreshCategory = () => {
    serviceApi.retrieveAllCategory().then((response) => {
      this.setState({ data: response.data.data });
    });
  };

  render() {
    const { data } = this.state
    return (
      <View style={{ flex: 1, backgroundColor: 'rgb(241, 243, 246)' }}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#009384"
          translucent={false}
          networkActivityIndicatorVisible={true}
        />
        <Header />
        <ScrollView>
          <Banner />
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', padding: 3 }}>
            {
              data.map(list => (
                <TouchableOpacity onPress={() =>{
                 
                  this.props.navigation.navigate('Services', { list })}}>
                  <ImageBackground style={{ width: 170, height: 200, marginTop: 5, justifyContent: 'center', backgroundColor: 'white', elevation: 4 }}>
                    <View>
                      <Image style={{ width: 120, height: 120, alignSelf: 'center', elevation: 4 }} source={{uri:`http://147.139.33.186/uploads/categories/${list.categoryImage}`}} />
                      <Text key={list.id} style={{ fontSize: 10, margin: 10, textAlign: 'center' }}>{list.name}</Text>
                      <Text>{JSON.parse(this.state.userId)}</Text>
                    </View>
                  </ImageBackground>
                  {/* <Button title="Remove" onPress={()=>this.onSubmit()} /> */}
                </TouchableOpacity>
              ))
            }
          </View>
        </ScrollView>
      </View>
    )
  }
}


const Stack = createStackNavigator();

export default class Category extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Services" component={ViewServices} />
        <Stack.Screen name="Order" component={Order} />
      </Stack.Navigator>
    );
  }
}