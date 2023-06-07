import {
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  StatusBar
} from 'react-native';

import TitleLabel from './components/TitleLabel';

const HomeNewScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor='#06901E'/>
      <View style={nextPageOptStyle}>

        <TouchableHighlight 
            underlayColor='#ddd'
            style={refreshBtnStyle}
            onPress={() => navigation.navigate('Garage')}>
          
          <TitleLabel value='Garagem'/>

        </TouchableHighlight>

        <TouchableHighlight 
            underlayColor='#ddd'
            style={refreshBtnStyle}
            onPress={() => navigation.navigate('Home')}>
          
          <TitleLabel value='Carteira de Gastos'/>

        </TouchableHighlight>

      </View>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const nextPageOptStyle = StyleSheet.create({
  width: screenWidth,
  marginTop: screenHeight / 3,
  paddingHorizontal: 20,
  justifyContent:'space-between'

});

const refreshBtnStyle = StyleSheet.create({
  flexDirection: 'row',
  justifyContent:'center',
  paddingVertical: 10,
});

export default HomeNewScreen;