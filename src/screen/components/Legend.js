import React from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import { faArrowRotateLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const Legend = ({value, icon=faArrowRotateLeft, iconStyle={}, iconSize=12, customStyle={}, lblStyle={}}) => {
  
  const loadIcon = () => {
    if(icon && icon != null)
      return <FontAwesomeIcon icon={icon} size={iconSize} style={[styles.icon, iconStyle]}/>;

    return <></>;
  }
  
  return (
    <View style={[styles.wrap, customStyle]}>
      
      {loadIcon()}

      <Text style={[styles.lbl, lblStyle]}>
        {value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  lbl: {
    fontSize: 12,
    paddingHorizontal: 2,
    paddingVertical: 2,
    color: '#222',
    fontFamily: 'Montserrat-Regular',
  },
  icon: {
    color:'#222',
    marginTop:4,
    marginHorizontal:5
  },
  wrap: {
    flexDirection:'row',
  }
});

export default Legend;