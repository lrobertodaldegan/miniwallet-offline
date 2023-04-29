import React from 'react';

import {
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';

const FloatBtn = ({label, customStyle, action}) => {
  return (
    <TouchableHighlight style={[btnStyle, customStyle]} 
        underlayColor='#fff'
        onPress={() => action()}>
      <Text style={lblStyle}>{label}</Text>
    </TouchableHighlight>
  );
};

const screenWidth = Dimensions.get('window').width;

const btnStyle = StyleSheet.create({
  left: 20,
  bottom: 10,
  borderRadius: 50,
  paddingVertical: 20,
  position:'absolute',
  width: screenWidth - 40,
  backgroundColor: '#06901E',
});

const lblStyle = StyleSheet.create({
  color: '#fff',
  fontSize: 18,
  textAlign: 'center'
});

export default FloatBtn;