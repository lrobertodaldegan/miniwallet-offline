import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './src/screen/HomeScreen';
import AddBillScreen from './src/screen/AddBillScreen';
import BillsScreen from './src/screen/BillsScreen';

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
        <Stack.Screen name="Home" component={HomeScreen} options={ScreenOptions} />
        <Stack.Screen name="AddBill" component={AddBillScreen} options={ScreenOptions} />
        <Stack.Screen name="Bills" component={BillsScreen} options={ScreenOptions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
