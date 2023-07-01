import React, {useState}from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import FloatBtn from '../FloatBtn';
import CarBillService from "../../../service/CarBillService";

const CarBillForm = ({onSubmit}) => {
  const [car, setCar] = useState(null);
  const [desc, setDesc] = useState(null);
  const [value, setValue] = useState(null);
  const [day, setDay] = useState(null);

  const save = () => {
    let carBill = {
      id: new Date().getTime(),
      car: car,
      desc: desc,
      value: value,
      date: day
    }

    CarBillService.store(carBill)
                .then((result) => onSubmit())
                .catch(e => console.log(e));
  }

  return (
    <>
      <View style={styles.formStyle}>
        <TextInput placeholder='Carro' 
            placeholderTextColor='#333'
            style={[styles.inputStyle, styles.inputHalf]}
            value={car} 
            onChangeText={setCar}
        />

        <TextInput placeholder='Item (Ex.: Combustível)' 
            placeholderTextColor='#333'
            style={[styles.inputStyle, styles.inputHalf]}
            value={desc} 
            onChangeText={setDesc}
        />

        <TextInput placeholder='Valor' 
            placeholderTextColor='#333'
            style={[styles.inputStyle, styles.inputHalf]}
            keyboardType='numeric'
            value={value} 
            onChangeText={setValue}
        />

        <TextInput placeholder='Data (DD/MM/YYYY)' 
            placeholderTextColor='#333'
            style={[styles.inputStyle, styles.inputHalf]}
            value={day} 
            onChangeText={setDay}
        />
      </View>

      <FloatBtn icon={faPlus} label='Adicionar gasto com carro' action={() => save()}/>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  formStyle: {
    paddingTop:20,
    height:screenHeight,
    backgroundColor:'#e8faed'
  },
  doubleInputsWrap:{
    flexDirection:'row'
  },
  inputStyle: {
    color: '#333',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#f0f0f0',
    marginHorizontal:5,
    marginTop:5,
    padding: 10,
    backgroundColor:'#fafafa',
    
  },
  inputHalf:{
    
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
  cardSelected: {
    borderWidth:5,
    borderColor: '#9df79c',
  },
});

export default CarBillForm;