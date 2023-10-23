import React from 'react';

import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

const Card = ({content, style={}, action= () => null}) => {
  return (
    <TouchableHighlight
        underlayColor='transparent'
        onPress={() => action()}>

        <View style={[cardStyle, style]} elevation={1}>{content}</View>

    </TouchableHighlight>
  );
}

const screenWidth = Dimensions.get('window').width;

const cardStyle = StyleSheet.create({
  width: (screenWidth / 2) - 20,
  borderRadius:10,
  fontSize: 26,
  paddingVertical: 20,
  marginHorizontal: 10,
  marginVertical: 20,
  color: '#555',
  justifyContent:'center',
  alignItens: 'center',
  backgroundColor:'#f7f7f7'
});

export default Card;