import {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableHighlight,
  ScrollView,
} from 'react-native';

import { faWallet, faWarehouse } from '@fortawesome/free-solid-svg-icons';

import TitleLabel from './components/TitleLabel';
import Label from './components/Label';
import Btn from './components/Btn';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitIdTop = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/8258424111';
const adUnitIdBot = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/9810617852';

const HomeNewScreen = ({navigation}) => {
  const [title, setTitle] = useState('Miniwallet');

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#f7f7f7'/>

      <ScrollView contentContainerStyle={styles.nextPageOptStyle} >
        <View style={styles.ad}>
          <BannerAd
              unitId={adUnitIdTop}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: false,
              }}
          />
        </View>

        <TitleLabel value={title} customStyle={styles.title}/>
        
        <TouchableHighlight underlayColor='transparent' onPress={() => navigation.navigate('Home')}>
          <View style={styles.card} elevation={5}>
            <Btn action={() => navigation.navigate('Home')} 
                label='Carteira' icon={faWallet} iconSize={20}
                customStyle={[styles.btnStyle2]} lblColor='#fff'
            />

            <Label value={'Aqui você gerencia sua carteira de gastos gerais'}
                customStyle={styles.lbl}
            />
          </View>
        </TouchableHighlight>

        <TouchableHighlight underlayColor='transparent' onPress={() => navigation.navigate('Garage')}>
          <View style={[styles.card,styles.cardRight]} elevation={5}>
            <Btn action={() => navigation.navigate('Garage')} 
                label='Garagem' icon={faWarehouse} iconSize={20}
                customStyle={[styles.btnStyle2]} lblColor='#fff'
            />

            <Label value={'Aqui você gerencia sua garagem de gastos gerais'}
                customStyle={[styles.lbl,{textAlign:'right'}]}
            />
          </View>
        </TouchableHighlight>

        <Label value={'Criado por\nLucas Roberto'}
            customStyle={[styles.lblLgnd]}
        />

        <View style={styles.ad}>
          <BannerAd
              unitId={adUnitIdBot}
              size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
              requestOptions={{
                requestNonPersonalizedAdsOnly: false,
              }}
          />
        </View>
      </ScrollView>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  nextPageOptStyle:{
    width: screenWidth,
    height:screenHeight - 80,
    backgroundColor:'#f7f7f7',
    paddingHorizontal:10,
  },
  title:{
    color: '#000',
    textAlign:'center',
    fontSize:40,
    marginTop: screenHeight * 0.07,
    marginBottom: screenHeight * 0.07,
  },
  lbl:{
    color: '#fff',
    marginHorizontal: 40,
    marginBottom: 30,
    fontSize:14,
    width:screenWidth/2
  },
  lblLgnd:{
    marginTop:screenHeight * 0.04,
    marginBottom:screenHeight * 0.04,
    color: '#000',
    fontSize: 10,
    textAlign:'center'
  },
  card:{
    marginTop:screenHeight * 0.03,
    backgroundColor:'#000',
    borderRadius:20,
    borderTopLeftRadius:0,
    width:screenWidth - 80,
    marginLeft:30,
  },
  cardRight:{
    alignItems:'flex-end',
    borderTopLeftRadius:20,
    borderTopRightRadius:0,
  },
  btnStyle:{
    width:screenWidth / 2.5
  },
  btnStyle2:{
    width:screenWidth / 2.5,
    backgroundColor:'#000',
    marginVertical:1
  },
  ad:{
    alignItems:'center',
  },
});

export default HomeNewScreen;