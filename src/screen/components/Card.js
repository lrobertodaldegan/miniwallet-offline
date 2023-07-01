import React from 'react';

import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Card = ({content, style={}, action= () => null}) => {
  return (
    <TouchableHighlight 
        underlayColor='#e1fce8'
        style={[cardStyle, style]}
        onPress={() => action()}>

        <>{content}</>

    </TouchableHighlight>
  );
}

const screenWidth = Dimensions.get('window').width;

const cardStyle = StyleSheet.create({
  width: (screenWidth / 2) - 20,
  borderWidth:1,
  borderColor:'#efefef',
  borderRadius:10,
  fontSize: 26,
  paddingVertical: 20,
  marginHorizontal: 10,
  marginVertical: 20,
  color: '#555',
  justifyContent:'center',
  alignItens: 'center',
  backgroundColor:'#fafafa'
});

export default Card;