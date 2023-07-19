import React from 'react';

import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle} from '@fortawesome/free-solid-svg-icons';

const Btn = ({label, icon=null, iconSize=15, customStyle={}, lblColor='#fafafa', action=()=>null}) => {


  return (
    <TouchableHighlight underlayColor='#e1fce8' 
        style={[styles.btnStyle, customStyle]} onPress={() => action()}>
          
      <View style={styles.lblWrap}>
        <FontAwesomeIcon icon={icon !== null ? icon : faCircle} 
            style={[styles.iconStyle, icon !== null ? {} : {marginTop:10}, {color:lblColor}]}
            size={icon !== null ? iconSize : 5} 
        />
        <Text style={[styles.lblStyle, {color:lblColor}]}>{label}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#06901E',
    paddingVertical: 20,
    margin:10,
    borderRadius:10
  },
  lblStyle: {
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
  }
});

export default Btn;