import React from 'react';

import {
  Text,
  TouchableHighlight,
  StyleSheet,
  View
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle} from '@fortawesome/free-solid-svg-icons';

const Btn = ({label, icon=null, customStyle={}, action}) => {


  return (
    <TouchableHighlight underlayColor='#e1fce8' 
        style={[styles.btnStyle, customStyle]} onPress={() => action()}>
          
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

const styles = StyleSheet.create({
  btnStyle: {
    backgroundColor: '#06901E',
    paddingVertical: 20,
    margin:10,
    borderRadius:10
  },
  lblStyle: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
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

export default Btn;