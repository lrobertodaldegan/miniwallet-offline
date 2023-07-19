import React from 'react';

import {
  Text,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  View
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle} from '@fortawesome/free-solid-svg-icons';

const FloatBtn = ({label, icon=null, customStyle={}, action}) => {
  return (
    <TouchableHighlight style={[styles.btnStyle, customStyle]} 
        underlayColor='#e1fce8' 
        onPress={() => action()}>

      <View style={styles.lblWrap}>
        <FontAwesomeIcon icon={icon !== null ? icon : faCircle} 
            style={[styles.iconStyle, icon !== null ? {} : {marginTop:10}]}
            size={icon !== null ? 15 : 5} 
        />
        <Text style={styles.lblStyle}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  btnStyle: {
    left: 10,
    bottom: 10,
    borderRadius: 10,
    paddingVertical: 20,
    position:'absolute',
    width: screenWidth - 20,
    backgroundColor: '#06901E',
  },
  lblStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
  },
  lblWrap: {
    flexDirection:'row',
    justifyContent:'center'
  },
  iconStyle: {
    marginTop:5,
    marginRight:10,
    color:'#fff'
  }
});

export default FloatBtn;