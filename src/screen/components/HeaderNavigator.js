import React from 'react';

import {
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Label from './Label';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/8258424111';

const HeaderNavigator = ({icon, navigation, action}) => {
  return (
    <>
      <BannerAd
            unitId={adUnitId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: false,
            }}
      />

      <View style={headerNavigatorWrap} elevation={2}>
        

        <TouchableHighlight 
            underlayColor='transparent' 
            style={headerBtnWrap}
            onPress={() => navigation.goBack()}>

          <View style={headerBtn}>
            <FontAwesomeIcon icon={faChevronLeft} size={14} style={[iconStyle, lbl]}/>

            <Label value='Voltar' customStyle={lbl}/>
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor='transparent' 
        style={headerBtnWrap}
            onPress={() => action()}>

          <View style={headerBtn}>

            <Label value='Ir para ' customStyle={lbl}/>

            <FontAwesomeIcon icon={icon} size={25} style={[iconStyle, lbl, {marginTop:9.5}]}/>
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
}

const headerNavigatorWrap = StyleSheet.create({
  flexDirection:'row',
  justifyContent:'space-between',
  paddingTop:20,
  paddingHorizontal: 20,
  paddingBottom: 20,
  backgroundColor:'#f7f7f7',
  borderBottomLeftRadius:30
});

const iconStyle = StyleSheet.create({
  color:'#000',
  marginTop:13.5,
});

const headerBtnWrap = StyleSheet.create({
  borderRadius:10
});

const headerBtn = StyleSheet.create({
  flexDirection:'row',
  alignItens:'center',
  marginTop:5
});

const lbl = StyleSheet.create({
  color:'#000'
});

export default HeaderNavigator;