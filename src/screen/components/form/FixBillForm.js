import React, {useState}from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowTrendDown, faArrowTrendUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import BillService from '../../../service/BillService';
import Btn from '../Btn';
import Card from "../Card";
import Legend from '../Legend';

const IN = 'IN';
const OUT = 'OUT';

const FixBillForm = ({onSubmit=()=>null}) => {
  const [desc, setDesc] = useState(null);
  const [type, setType] = useState(null);
  const [value, setValue] = useState(null);

  const reset = () => {
    setDesc(null);
    setType(null);
    setValue(null);
  }

  const save = () => {
    let bill = {
      id: new Date().getTime(),
      desc: desc,
      type: type,
      cat: 'Fixa',
      value: value
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
      <TextInput placeholder='Descrição da conta (Ex.: Luz)' 
          placeholderTextColor='#333'
          style={styles.inputStyle}
          value={desc} 
          onChangeText={setDesc}
      />

      <TextInput placeholder='Valor da conta (Ex.: 150)' 
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
                <Legend customStyle={styles.cardLbl} value={'Entrada fixa'} />
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
                <Legend customStyle={styles.cardLbl} value={'Saída fixa'} />
              </View>
            } 
        />
      </View>

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
  card:{},
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

export default FixBillForm;