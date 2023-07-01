import React from 'react';

import {
  Text,
  StyleSheet
} from 'react-native';

const Label = ({value, customStyle}) => {
  return (
    <Text style={[style, customStyle]}>
      {value}
    </Text>
  );
};

const style = StyleSheet.create({
  fontSize: 16,
  paddingHorizontal: 10,
  paddingTop: 10,
  paddingBottom: 5,
  color: '#555'
});

export default Label;