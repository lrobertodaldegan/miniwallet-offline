import React, {useState}from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native';
import { faSave, faWarning } from "@fortawesome/free-solid-svg-icons";
import FloatBtn from '../FloatBtn';
import CarService from "../../../service/CarService";
import TitleLabel from '../TitleLabel';
import Legend from '../Legend';
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitIdBot = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/9810617852';

const CarForm = ({onSubmit}) => {
  const [car, setCar] = useState(null);
  const [carError, setCarError] = useState(false);
  const [msg, setMsg] = useState(null);

  const save = () => {
    if(car && car !== null){
      let carObj = {
        id: car,
        name: car,
      }

      CarService.store(carObj)
                  .then((result) => onSubmit())
                  .catch(e => console.log(e));
    } else {
      setCarError(!(car && car !== null));

      setMsg('Informe um nome válido pro carro!');
    }
  }

  const renderMsg = () => {
    if(msg && msg !== null){
      return <Legend icon={faWarning} value={msg} lblStyle={styles.msg} iconStyle={styles.msg}/>
    } else {
      return <></>
    }
  }

  return (
    <>
      <View style={styles.formStyle}>

        <TitleLabel value='Novo carro' customStyle={styles.title}/>

        <TextInput placeholder='Nome/Apelido do Carro' 
            placeholderTextColor={carError === true ? '#d50000' : '#333'}
            style={[styles.inputStyle, styles.inputHalf, carError === true ? styles.inputErrorStyle : {}]}
            value={car} 
            onChangeText={setCar}
        />

        {renderMsg()}

        <View style={{alignItems:'center', marginTop:20}}>
          <BannerAd
              unitId={adUnitIdBot}
              size={BannerAdSize.MEDIUM_RECTANGLE}
              requestOptions={{
                requestNonPersonalizedAdsOnly: false,
              }}
          />
        </View>
      </View>

      <FloatBtn icon={faSave} label='Salvar carro' action={() => save()}/>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  formStyle: {
    paddingTop:20,
    height:screenHeight,
    backgroundColor:'#f7f7f7'
  },
  doubleInputsWrap:{
    flexDirection:'row'
  },
  inputStyle: {
    color: '#000',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#f0f0f0',
    marginHorizontal:5,
    marginTop:5,
    padding: 10,
    backgroundColor:'#fafafa',
    fontFamily: 'Montserrat-Regular',
  },
  inputErrorStyle:{
    borderWidth:2,
    color: '#d50000',
    borderColor:'#d50000',
  },
  cardWrap:{
    flexDirection:'row',
    paddingHorizontal:10
  },
  cardOption: {
    width:(screenWidth / 3) - 8,
    marginHorizontal:2
  },
  cardSelected: {
    borderWidth:1,
    borderColor: '#000',
  },
  modalHeaderlbl:{
    flexDirection:'row',
    justifyContent:'center',
  },
  modalOption:{
    margin:10
  },
  typeOptionsWrap: {
    flexDirection:'row'
  },
  card:{marginVertical:5},
  cardLblWrap:{
    flexDirection:'row',
    justifyContent:'center'
  },
  cardLblIcon: {
    marginTop:2.5,
    marginRight: 5
  },
  cardLbl: {
    textAlign:'center'
  },
  title:{
    textAlign:'center',
    marginBottom:40
  },
  msg:{
    color:'#d50000'
  },
});

export default CarForm;