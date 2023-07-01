import React from 'react';

import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Side = ({content, style={}, action}) => {
  return (
    <TouchableHighlight 
        underlayColor='#e1fce8'
        style={[sideWrapper, style]}
        onPress={() => action()}>

        <>{content}</>

    </TouchableHighlight>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const sideWrapper = StyleSheet.create({
  justifyContent:'center',
  alignItems:'center',
  width:screenWidth/2,
  height:screenHeight,
});

export default Side;