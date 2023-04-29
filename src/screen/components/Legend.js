import React from 'react';

import {
  Text,
  StyleSheet
} from 'react-native';

const Legend = ({value, customStyle}) => {
  return (
    <Text style={[style, customStyle]}>
      {value}
    </Text>
  );
};

const style = StyleSheet.create({
  fontSize: 12,
  paddingHorizontal: 2,
  paddingVertical: 2,
  color: '#555'
});

export default Legend;