import React, {useState}from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
} from 'react-native';
import { faWarning, faArrowTrendDown, faArrowTrendUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import BillService from '../../../service/BillService';
import Btn from '../Btn';
import Card from "../Card";
import Legend from '../Legend';
import Label from '../Label';

const IN = 'IN';
const OUT = 'OUT';

const FixBillForm = ({onSubmit=()=>null}) => {
  const [desc, setDesc] = useState(null);
  const [type, setType] = useState(null);
  const [value, setValue] = useState(null);
  const [msg, setMsg] = useState(null);

  const reset = () => {
    setDesc(null);
    setType(null);
    setValue(null);
  }

  const save = () => {
    if((desc && desc !== null) && (type && type !== null)
                               && (value && value !== null)){
      setMsg(null);
      
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
    } else {
      setMsg('Informe um valor, uma descrição e selecione se é um lançamento de entrada ou saída!');
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
    <View style={styles.formStyle}>

      <Label value='Detalhes' customStyle={styles.lbl}/>

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
                <Legend icon={faArrowTrendUp} iconSize={15}
                    iconStyle={[styles.cardLblIcon, {color:'#000'}]} 
                    customStyle={styles.cardLbl} value={'Entrada fixa'} />
              </View>
            } 
        />

        <Card action={() => setType(OUT)}
            style={[styles.card, type == OUT ? styles.cardSelected : {}]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={faArrowTrendDown} iconSize={20}
                    iconStyle={[styles.cardLblIcon, {color:'#d50000'}]}
                    customStyle={styles.cardLbl} value={'Saída fixa'} />
              </View>
            } 
        />
      </View>

      {renderMsg()}

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
    color: '#000',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#f0f0f0',
    marginHorizontal:10,
    marginTop:5,
    padding: 10,
    backgroundColor:'#f7f7f7',
    fontFamily: 'Montserrat-Regular',
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
    marginTop:0,
    marginRight: 5
  },
  cardLbl: {
    textAlign:'center'
  },
  cardSelected: {
    borderWidth:1,
    borderColor: '#000',
  },
  lbl:{
    fontSize:14,
    marginLeft:5
  },
  msg:{
    color:'#d50000'
  },
});

export default FixBillForm;