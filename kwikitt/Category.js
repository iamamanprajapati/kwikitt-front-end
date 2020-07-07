import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableNativeFeedback,
  ActivityIndicator,
  ImageBackground,
  StatusBar,
  Image,
  ScrollView,
  BackHandler,
  Alert,
  Dimensions,
} from 'react-native';
import Banner from './Banner';
import Header from './Header';
import serviceApi from './ServiceApi';
import {createStackNavigator} from '@react-navigation/stack';
import ViewServices from './ViewServices';
import Order from './Order/Order';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from 'react-native-push-notification';

const Width = Dimensions.get('window').width;
const W1 = Width / 2 - 5;

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export class CategoryScreen extends Component {
  constructor() {
    super();
    PushNotification.configure({
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    global.MyVar;
    this.state = {
      data: [],
      userId: '',
      isLoading: true,
    };
  }

  renderToService = ({list}) => {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this.props.navigation.navigate('Services', {list});
  };

  refreshComponent = () => {
    this.refreshCategory();
    this.getData();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  };

  componentDidMount() {
    this._unsubscribe = this.props.navigation.addListener('focus', () =>
      this.refreshComponent(),
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    this._unsubscribe();
  }

  handleBackButton = () => {
    Alert.alert(
      'Exit App',
      'Exiting the application?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => BackHandler.exitApp(),
        },
      ],
      {
        cancelable: false,
      },
    );
    return true;
  };

  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      this.setState({userId: value});
    } catch (e) {
      console.warn(e);
    }
  };

  refreshCategory = () => {
    serviceApi.retrieveAllCategory().then((response) => {
      this.setState({data: response.data.data, isLoading: false});
    });
  };

  render() {
    const {data} = this.state;
    const {isLoading} = this.state;
    return isLoading === true ? (
      <ActivityIndicator
        style={{flex: 1}}
        animating={true}
        size="large"
        color="#0000ff"
      />
    ) : (
      <View style={{flex: 1, backgroundColor: 'rgb(241, 243, 246)'}}>
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
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              padding: 3,
            }}>
            {data.map((list) => (
              <ImageBackground
                style={{
                  width: W1,
                  height: 200,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                  elevation: 4,
                  marginTop: 1,
                }}>
                <TouchableNativeFeedback
                  background={TouchableNativeFeedback.Ripple('#bfbfbf')}
                  onPress={() => this.renderToService({list})}>
                  <View key={list.id}>
                    <Image
                      style={{
                        width: 150,
                        height: 160,
                        alignSelf: 'center',
                        elevation: 4,
                      }}
                      source={{
                        uri: `${global.MyVar}/uploads/categories/${list.categoryImage}`,
                      }}
                    />
                    <Text
                      key={list.id}
                      style={{
                        fontSize: 13,
                        marginBottom: 20,
                        textAlign: 'center',
                      }}>
                      {list.name}
                    </Text>
                  </View>
                </TouchableNativeFeedback>
              </ImageBackground>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const Stack = createStackNavigator();

export default class Category extends Component {
  render() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="Services" component={ViewServices} />
        <Stack.Screen name="Order" component={Order} />
      </Stack.Navigator>
    );
  }
}

console.disableYellowBox = true;
