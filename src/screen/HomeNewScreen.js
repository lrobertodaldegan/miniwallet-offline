import {
  View,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons/faWarehouse';
import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';

import Side from './components/Side';
import TitleLabel from './components/TitleLabel';
import Label from './components/Label';
import Btn from './components/Btn';

const ICON_SIZE = 30;

const HomeNewScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor='#06901E'/>

      <View style={nextPageOptStyle}>
        <TitleLabel value='Bem-vindo!' customStyle={title}/>

        <Label value='Ir para:' customStyle={[lbl, {marginBottom:20}]}/>

        <View style={btnWrap}>
          <Btn action={() => navigation.navigate('Home')} 
              label='Carteira' icon={faWallet} iconSize={20}
              customStyle={[btnStyle, {backgroundColor:'#c9ffd3'}]} lblColor='#06901E'
          />
        </View>

        <Label value='ou' customStyle={[lbl, {textAlign:'center', marginVertical:20}]}/>

        <View style={btnWrap}>
          <Btn action={() => navigation.navigate('Garage')} 
              label='Garagem' icon={faWarehouse} iconSize={20}
              customStyle={[btnStyle, {backgroundColor:'#c9ffd3'}]} lblColor='#06901E'
          />
        </View>
      </View>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const nextPageOptStyle = StyleSheet.create({
  width: screenWidth,
  height:screenHeight,
  backgroundColor:'#06901E',
  padding:10
});

const title = StyleSheet.create({
  color: '#fafafa',
  marginTop:screenWidth / 2.5
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