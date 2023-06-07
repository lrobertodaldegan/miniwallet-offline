import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screen/HomeScreen';
import HomeNewScreen from './src/screen/HomeNewScreen';
import AddBillScreen from './src/screen/AddBillScreen';
import BillsScreen from './src/screen/BillsScreen';
import GarageScreen from './src/screen/GarageScreen';
import AddCarBillScreen from './src/screen/AddCarBillScreen';

const Stack = createNativeStackNavigator();

const ScreenOptions = {
  headerShown: false,
  headerStyle: {
    backgroundColor: '#06901E',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeNew" component={HomeNewScreen} options={ScreenOptions} />
        <Stack.Screen name="Home" component={HomeScreen} options={ScreenOptions} />
        <Stack.Screen name="AddBill" component={AddBillScreen} options={ScreenOptions} />
        <Stack.Screen name="Bills" component={BillsScreen} options={ScreenOptions} />
        <Stack.Screen name="Garage" component={GarageScreen} options={ScreenOptions} />
        <Stack.Screen name="AddCarBill" component={AddCarBillScreen} options={ScreenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
