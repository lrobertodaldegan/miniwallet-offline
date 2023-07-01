import React from 'react';

import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';

const Board = ({content, icon=faTriangleExclamation, iconStyle={}, style={}, action= () => null}) => {
  return (
    <TouchableHighlight 
        underlayColor='#e1fce8'
        style={[cardStyle, style]}
        onPress={() => action()}>

        <View style={contentWrapper}>
          <FontAwesomeIcon icon={icon} size={30} style={[iiconStyle, iconStyle]}/>

          <>{content}</>
        </View>

    </TouchableHighlight>
  );
}

const screenWidth = Dimensions.get('window').width;

const cardStyle = StyleSheet.create({
  width: screenWidth - 20,
  borderWidth:1,
  borderColor:'#efefef',
  borderRadius:10,
  fontSize: 26,
  marginHorizontal: 10,
  color: '#555',
  justifyContent:'center',
  alignItens: 'center',
  backgroundColor:'#fafafa'
});

const iiconStyle = StyleSheet.create({
  color:'#ffc25e',
  marginRight:20
});

const contentWrapper = StyleSheet.create({
  flexDirection:'row',
  alignItens: 'center',
  padding:20,
});

export default Board;