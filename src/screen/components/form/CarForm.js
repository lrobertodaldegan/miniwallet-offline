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

const CarForm = ({onSubmit}) => {
  const [car, setCar] = useState(null);
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
            placeholderTextColor='#333'
            style={[styles.inputStyle, styles.inputHalf]}
            value={car} 
            onChangeText={setCar}
        />

        {renderMsg()}
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