import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableHighlight,
} from 'react-native';

import { faWallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';

import TitleLabel from './components/TitleLabel';
import Label from './components/Label';
import Btn from './components/Btn';
import mobileAds, { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720~7808361383';

const HomeNewScreen = ({navigation}) => {
  const [title, setTitle] = useState('Miniwallet');

  mobileAds().initialize();

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#d9dae1'/>

      <View style={styles.nextPageOptStyle} >
        <View style={styles.ad}>
          <BannerAd
              unitId={adUnitId}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: false,
              }}
          />
        </View>

        <TitleLabel value={title} customStyle={styles.title}/>
        
        <TouchableHighlight underlayColor='transparent' onPress={() => navigation.navigate('Home')}>
          <View style={styles.card} elevation={10}>
            <Btn action={() => navigation.navigate('Home')} 
                label='Carteira' icon={faWallet} iconSize={20}
                customStyle={[styles.btnStyle2]} lblColor='#000'
            />

            <Label value={'Aqui você gerencia sua carteira de gastos gerais'}
                customStyle={styles.lbl}
            />
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor='transparent' onPress={() => navigation.navigate('Garage')}>
          <View style={styles.card} elevation={10}>
            <Btn action={() => navigation.navigate('Garage')} 
                label='Garagem' icon={faWarehouse} iconSize={20}
                customStyle={[styles.btnStyle2]} lblColor='#000'
            />

            <Label value={'Aqui você gerencia sua carteira de gastos gerais'}
                customStyle={styles.lbl}
            />
          </View>
        </TouchableHighlight>
      </View>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  nextPageOptStyle:{
    width: screenWidth,
    height:screenHeight,
    backgroundColor:'#d9dae1',
    paddingHorizontal:10,
    
  },
  title:{
    color: '#000',
    textAlign:'center',
    marginTop:80,
    marginBottom: screenHeight / 11,
  },
  lbl:{
    color: '#333',
    marginLeft: 45,
    marginBottom: 30,
    fontSize:14
  },
  card:{
    marginTop:40,
    backgroundColor:'#fff',
    borderRadius:10,
    width:screenWidth - 40,
    marginLeft:10,
  },
  btnWrap:{
    justifyContent:'center',
    marginVertical:20,
    
  },
  btnStyle:{
    width:screenWidth / 2.5
  },
  btnStyle2:{
    width:screenWidth / 2.5,
    backgroundColor:'#fff'
  },
  ad:{
    alignItems:'center',
  },
});

const nextPageOptStyle = StyleSheet.create({
  width: screenWidth,
  height:screenHeight,
  backgroundColor:'#06901E',
  padding:10
});

const title = StyleSheet.create({
  color: '#fafafa',
  marginTop:screenWidth / 8
});

const lbl = StyleSheet.create({
  color: '#fafafa',
  marginLeft: 10
});

const btnWrap = StyleSheet.create({
  flexDirection:'row',
  justifyContent:'center'
});

const btnStyle = StyleSheet.create({
  width:screenWidth / 2.5
});

export default HomeNewScreen;