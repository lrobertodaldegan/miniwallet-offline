import React from 'react';

import {
  Text,
  StyleSheet
} from 'react-native';

const SubTitleLabel = ({value, customStyle}) => {
  return (
    <Text style={[style, customStyle]}>
      {value}
    </Text>
  );
};

const style = StyleSheet.create({
  fontSize: 22,
  padding: 10,
  color: '#000',
  fontFamily: 'Montserrat-Regular',
});

export default SubTitleLabel;