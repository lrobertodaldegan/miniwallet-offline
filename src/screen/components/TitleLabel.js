import React from 'react';

import {
  Text,
  StyleSheet
} from 'react-native';

const TitleLabel = ({value}) => {
  return (
    <Text style={style}>
      {value}
    </Text>
  );
};

const style = StyleSheet.create({
  fontSize: 26,
  paddingHorizontal: 20,
  paddingTop: 30,
  paddingBottom: 5,
  color: '#555'
});

export default TitleLabel;