
import React, {useState} from 'react';

import {
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Modal = ({content, isActive=false, onClose}) => {

  if(isActive){
    return (
      <View style={obscureBkg}>
        <View style={bkg}>
          <TouchableHighlight underlayColor='#e1fce8' style={header} onPress={() => onClose()}>
            <FontAwesomeIcon icon={faXmark} size={headerClose.fontSize} style={headerClose}/>
          </TouchableHighlight>

          <View style={body}>
            <>{content}</>
          </View>
        </View>
      </View>
    );
  } else {
    return <></>;
  }
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const obscureBkg = StyleSheet.create({
  position:'absolute',
  backgroundColor:'rgba(255,255,255,0.8)',
  width:screenWidth,
  height:screenHeight,
});

const bkg = StyleSheet.create({
  position:'absolute',
  backgroundColor:'#fefefe',
  top:screenHeight / 4,
  left:10,
  width:screenWidth - 20,
  height:screenHeight / 2,
});

const header = StyleSheet.create({
  flexDirection:'row',
  justifyContent:'flex-end'
});

const headerClose = StyleSheet.create({
  fontSize:20,
  margin:20,
  color:'#777',
});

const body = StyleSheet.create({

});

export default Modal;