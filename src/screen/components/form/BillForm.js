import React, {useState}from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import Btn from '../Btn';
import Card from '../Card';
import Legend from '../Legend';
import BillService from "../../../service/BillService";
import MonthCards from '../MonthCards';
import YearCards from '../YearCards';

const IN = 'IN';
const OUT = 'OUT';

const BillForm = ({onSubmit=()=>null}) => {
  const [desc, setDesc] = useState(null);
  const [type, setType] = useState(null);
  const [cat, setCat] = useState(null);
  const [value, setValue] = useState(null);
  const [refMonth, setRefMonth] = useState(null);
  const [refYear, setRefYear] = useState(null);

  const reset = () => {
    setDesc(null);
    setType(null);
    setCat(null);
    setValue(null);
    setRefMonth(null);
    setRefYear(null);
  }

  const save = () => {
    let bill = {
      id: new Date().getTime(),
      desc: desc,
      type: type,
      cat: cat,
      value: value,
      refMonth: refMonth,
      refYear: refYear,
    }

    BillService.store(bill)
                .then((result) => {
                  onSubmit();

                  reset();
                })
                .catch(e => console.log(e));
  }

  return (
    <View style={styles.formStyle}>
      <TextInput placeholder='Descrição (Ex.: Compra no shopping)' 
          placeholderTextColor='#333'
          style={styles.inputStyle}
          value={desc} 
          onChangeText={setDesc}
      />

      <TextInput placeholder='Categoria (Ex.: Cartão de crédito)' 
          placeholderTextColor='#333'
          style={styles.inputStyle}
          value={cat} 
          onChangeText={setCat}
      />

      <TextInput placeholder='Valor (Ex.: 120)' 
          placeholderTextColor='#333'
          style={styles.inputStyle}
          keyboardType='numeric'
          value={value} 
          onChangeText={setValue}
      />

      <View style={styles.typeOptionsWrap}>
        <Card action={() => setType(IN)}
            style={[styles.card, type == IN ? styles.cardSelected : {}]}
            content={
              <View style={styles.cardLblWrap}>
                <FontAwesomeIcon icon={faArrowTrendUp} size={15} 
                    style={[styles.cardLblIcon, {color:'green'}]}
                />
                <Legend customStyle={styles.cardLbl} value={'Recebi'} />
              </View>
            } 
        />

        <Card action={() => setType(OUT)}
            style={[styles.card, type == OUT ? styles.cardSelected : {}]}
            content={
              <View style={styles.cardLblWrap}>
                <FontAwesomeIcon icon={faArrowTrendDown} size={15} 
                    style={[styles.cardLblIcon, {color:'orange'}]}
                />
                <Legend customStyle={styles.cardLbl} value={'Gastei'} />
              </View>
            } 
        />
      </View>

      <MonthCards refMonth={refMonth} action={setRefMonth}/>

      <YearCards refYear={refYear} action={setRefYear}/>

      <Btn icon={faPlus} label='Adicionar' action={() => save()}/>
    </View>
  );
}

const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  formStyle: {
    height:screenHeight
  },
  inputStyle: {
    color: '#333',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#f0f0f0',
    marginHorizontal:10,
    marginTop:5,
    padding: 10,
    backgroundColor:'#fafafa'
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

export default BillForm;