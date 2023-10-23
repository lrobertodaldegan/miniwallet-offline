import React from 'react';

import {
  StyleSheet,
  View,
  Dimensions
} from 'react-native';

const Hr = () => {
  return (
    <View style={hr}></View>
  );
};

const screenWidth = Dimensions.get('window').width;

const hr = StyleSheet.create({
  width: screenWidth / 5,
  marginLeft: screenWidth / 2.5,
  height: 1,
  borderBottomWidth: 1,
  borderColor:'#000',
});

export default Hr;