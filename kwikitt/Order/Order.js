import React, {Component} from 'react';
import Address from './Address';
import {createStackNavigator} from '@react-navigation/stack';
import AddAddress from './AddAddress';
import EditAddress from './EditAddress';
import PlaceOrder from './PlaceOrder';
import BookOrder from './BookOrder';

const Stack = createStackNavigator();

export class Order extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="Address" headerMode="none">
        <Stack.Screen name="Address" component={Address} />
        <Stack.Screen name="AddAddress" component={AddAddress} />
        <Stack.Screen name="EditAddress" component={EditAddress} />
        <Stack.Screen name="placeOrder" component={PlaceOrder} />
        <Stack.Screen name="bookOrder" component={BookOrder} />
      </Stack.Navigator>
    );
  }
}

export default Order;
