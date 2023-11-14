import React, {useState}from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native';
import { faWarning, faArrowTrendDown, faArrowTrendUp, faPlus } from '@fortawesome/free-solid-svg-icons';
import Btn from '../Btn';
import Card from '../Card';
import Legend from '../Legend';
import Label from '../Label';
import BillService from "../../../service/BillService";
import MonthCards from '../MonthCards';
import YearCards from '../YearCards';

const IN = 'IN';
const OUT = 'OUT';

const BillForm = ({onSubmit=()=>null}) => {
  const [desc, setDesc] = useState(null);
  const [descError, setDescError] = useState(false);
  const [type, setType] = useState(null);
  const [typeError, setTypeError] = useState(false);
  const [cat, setCat] = useState(null);
  const [value, setValue] = useState(null);
  const [valueError, setValueError] = useState(false);
  const [refMonth, setRefMonth] = useState(null);
  const [refMonthError, setRefMonthError] = useState(false);
  const [refYear, setRefYear] = useState(null);
  const [refYearError, setRefYearError] = useState(false);

  const [msg, setMsg] = useState(null);

  const reset = () => {
    setDesc(null);
    setType(null);
    setCat(null);
    setValue(null);
    setRefMonth(null);
    setRefYear(null);

    setDescError(null);
    setTypeError(null);
    setValueError(null);
    setRefMonthError(null);
    setRefYearError(null);

    setMsg(null);
  }

  const save = () => {
    if((value && value !== null) && (desc && desc !== null)
                                 && (type && type!== null)
                                 && (refMonth && refMonth !== null)
                                 && (refYear  && refYear  !== null)){
      setMsg(null);

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
    } else {
      setDescError(!(desc && desc !== null));
      setTypeError(!(type && type!== null));
      setValueError(!(value && value !== null));
      setRefMonthError(!(refMonth && refMonth !== null));
      setRefYearError(!(refYear  && refYear  !== null));

      setMsg('Informe uma descrição, o valor, o mês e ano de referência e se é um lançamento de entrada ou saída!');
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

      <TextInput placeholder='Descrição (Ex.: Compra no shopping)' 
          placeholderTextColor={descError === true ? '#d50000' : '#333'}
          style={[styles.inputStyle, descError === true ? styles.inputErrorStyle : {}]}
          value={desc} 
          onChangeText={setDesc}
      />

      <TextInput placeholder='Categoria (Ex.: Cartão de crédito)' 
          placeholderTextColor='#333'
          style={[styles.inputStyle]}
          value={cat} 
          onChangeText={setCat}
      />

      <TextInput placeholder='Valor (Ex.: 120)' 
          placeholderTextColor={valueError === true ? '#d50000' : '#333'}
          style={[styles.inputStyle, valueError === true ? styles.inputErrorStyle : {}]}
          keyboardType='numeric'
          value={value} 
          onChangeText={setValue}
      />

      <Label value='Tipo' customStyle={styles.lbl}/>

      <View style={styles.typeOptionsWrap}>
        <Card action={() => setType(IN)}
            style={[styles.card, typeError === true ? styles.cardError : {}, type == IN ? styles.cardSelected : {}]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={faArrowTrendUp} iconSize={15} 
                    iconStyle={[styles.cardLblIcon, {color:'#000'}]}
                    customStyle={styles.cardLbl} value={'Recebi'} />
              </View>
            } 
        />

        <Card action={() => setType(OUT)}
            style={[styles.card, typeError === true ? styles.cardError : {}, type == OUT ? styles.cardSelected : {}]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={faArrowTrendDown} iconSize={15} 
                    iconStyle={[styles.cardLblIcon, {color:'#d50000'}]}
                    customStyle={styles.cardLbl} value={'Gastei'} />
              </View>
            } 
        />
      </View>

      <Label value='Mês de referência' customStyle={styles.lbl}/>

      <MonthCards refMonth={refMonth} action={setRefMonth} style={refMonthError === true ? styles.cardError : {}}/>

      <Label value='Ano de referência' customStyle={styles.lbl}/>

      <YearCards refYear={refYear} action={setRefYear} style={refYearError === true ? styles.cardError : {}}/>

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
    color: '#333',
    borderWidth:1,
    borderRadius:10,
    borderColor:'#f0f0f0',
    marginHorizontal:10,
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
  cardError:{
    borderWidth:2,
    borderColor:'#d50000',
    backgroundColor:'#ffe6e6'
  },
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
    borderWidth:1,
    backgroundColor:'#fafafa',
    borderColor: '#000',
  },
  lbl:{
    fontSize:14,
    marginLeft:5,
    marginTop:10
  },
  msg:{
    color:'#d50000'
  },
});

export default BillForm;