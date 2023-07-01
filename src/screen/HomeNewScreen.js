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

const ICON_SIZE = 30;

const HomeNewScreen = ({navigation}) => {
  return (
    <>
      <StatusBar backgroundColor='#e8faed'/>

      <View style={nextPageOptStyle}>

        <Side action={() => navigation.navigate('Garage')}
            style={{backgroundColor:'#e8faed'}}
            content={(
              <>
                <FontAwesomeIcon icon={faWarehouse} size={ICON_SIZE} color={sideTitle.color}/>

                <Text style={sideTitle}>Garagem</Text>
              </>
            )}
        />

        <Side action={() => navigation.navigate('Home')}
            style={{backgroundColor:'#e0ffe9'}}
            content={(
              <>
                <FontAwesomeIcon icon={faWallet} size={ICON_SIZE} color={sideTitle.color}/>

                <Text style={sideTitle}>Carteira</Text>
              </>
            )}
        />

      </View>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;

const nextPageOptStyle = StyleSheet.create({
  width: screenWidth,
  justifyContent:'space-between',
  flexDirection:'row',
  
});

const sideTitle = StyleSheet.create({
  fontSize:20,
  color: '#06901E',
  marginVertical:10,
});

export default HomeNewScreen;