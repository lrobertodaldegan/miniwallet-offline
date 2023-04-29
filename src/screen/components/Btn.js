import React from 'react';

import {
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

const Btn = ({label, customStyle, action}) => {
  return (
    <TouchableHighlight style={[btnStyle, customStyle]} onPress={() => action()}>
      <Text style={lblStyle}>{label}</Text>
    </TouchableHighlight>
  );
};

const btnStyle = StyleSheet.create({
  backgroundColor: '#06901E',
  paddingVertical: 20
});

const lblStyle = StyleSheet.create({
  color: '#fff',
  fontSize: 18,
  textAlign: 'center'
});

export default Btn;