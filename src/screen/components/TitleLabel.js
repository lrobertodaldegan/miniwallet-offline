import React from 'react';

import {
  Text,
  StyleSheet
} from 'react-native';

const TitleLabel = ({value, customStyle={}}) => {
  return (
    <Text style={[style, customStyle]}>
      {value}
    </Text>
  );
};

const style = StyleSheet.create({
  fontSize: 30,
  paddingHorizontal: 20,
  paddingTop: 30,
  paddingBottom: 5,
  color: '#555',
  fontFamily: 'Montserrat-Regular',
});

export default TitleLabel;