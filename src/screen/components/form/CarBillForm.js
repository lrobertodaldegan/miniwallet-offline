import React, {useState}from 'react';

import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native';

import Btn from '../Btn';

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
    <View style={formStyle}>
      <TextInput placeholder='Nome do carro' 
          placeholderTextColor='#333'
          style={inputStyle}
          value={car} 
          onChangeText={setCar}
      />

      <TextInput placeholder='Descrição' 
          placeholderTextColor='#333'
          style={inputStyle}
          value={desc} 
          onChangeText={setDesc}
      />

      <TextInput placeholder='Valor' 
          placeholderTextColor='#333'
          style={inputStyle}
          keyboardType='numeric'
          value={value} 
          onChangeText={setValue}
      />

      <TextInput placeholder='Dia do gasto' 
          placeholderTextColor='#333'
          style={inputStyle}
          value={day} 
          onChangeText={setDay}
      />

      <Btn label='Adicionar' action={() => save()}/>
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const formStyle = StyleSheet.create({
  
});

const style = StyleSheet.create({
  padding: 20,
  borderBottomWidth: 1,
  borderColor:'#fff',
  borderBottomRightRadius: 20,
  width: screenWidth,
  backgroundColor: '#fff',

});

const btnLblStyle = StyleSheet.create({
  color:'#555',
  fontWeight:'normal'
});

const inputStyle = StyleSheet.create({
  color: '#333',
});

export default CarBillForm;