import React, {useState}from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native';
import { faGasPump, faTruckMonster, faScrewdriverWrench, faPlus } from "@fortawesome/free-solid-svg-icons";
import FloatBtn from '../FloatBtn';
import CarBillService from "../../../service/CarBillService";
import Card from '../Card';
import Legend from '../Legend';

const CarBillForm = ({onSubmit}) => {
  const [car, setCar] = useState(null);
  const [desc, setDesc] = useState(null);
  const [obs, setObs] = useState(null);
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

        <View style={styles.cardWrap}>
          <Card action={() => setDesc('Combustível')}
              style={[styles.cardOption, desc == 'Combustível' ? styles.cardSelected : {}]}
              content={<Legend icon={faGasPump} value='Combustível' customStyle={{justifyContent:'center'}}/>}
          />

          <Card action={() => setDesc('Borracharia')}
              style={[styles.cardOption, desc == 'Borracharia' ? styles.cardSelected : {}]}
              content={<Legend icon={faTruckMonster} value='Borracharia' customStyle={{justifyContent:'center'}}/>}
          />

          <Card action={() => setDesc('Manutenção')}
              style={[styles.cardOption, desc == 'Manutenção' ? styles.cardSelected : {}]}
              content={<Legend icon={faScrewdriverWrench} value='Manutenção' customStyle={{justifyContent:'center'}}/>}
          />
        </View>

        <TextInput placeholder='Carro' 
            placeholderTextColor='#333'
            style={[styles.inputStyle, styles.inputHalf]}
            value={car} 
            onChangeText={setCar}
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

        <TextInput placeholder='Observação' 
            placeholderTextColor='#333'
            style={[styles.inputStyle, styles.inputHalf]}
            value={obs} 
            onChangeText={setObs}
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
  cardWrap:{
    flexDirection:'row',
    paddingHorizontal:10
  },
  cardOption: {
    width:(screenWidth / 3) - 8,
    marginHorizontal:2
  },
  cardSelected: {
    borderWidth:5,
    borderColor: '#9df79c',
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