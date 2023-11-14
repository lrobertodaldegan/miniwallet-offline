import React, {useState, useEffect}from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TextInput,
  ScrollView,
} from 'react-native';
import { 
  faWarning, 
  faGasPump, 
  faTruckMonster, 
  faScrewdriverWrench, 
  faPlus, 
  faCar 
} from "@fortawesome/free-solid-svg-icons";
import FloatBtn from '../FloatBtn';
import CarBillService from "../../../service/CarBillService";
import CarService from "../../../service/CarService";
import Card from '../Card';
import Legend from '../Legend';
import Label from '../Label';

const CarBillForm = ({onSubmit}) => {
  const [car, setCar] = useState(null);
  const [desc, setDesc] = useState(null);
  const [obs, setObs] = useState(null);
  const [value, setValue] = useState(null);
  const [day, setDay] = useState(null);
  const [descError, setDescError] = useState(false);
  const [carError, setCarError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const [dayError, setDayError] = useState(false);
  const [cars, setCars] = useState([]);
  const [msg, setMsg] = useState(null);

  useEffect(()=>{
    CarService.get().then(cs => {
      setCars(cs);
    }).catch(e => console.log(e));
  }, []);

  useEffect(() =>{
    let dt = new Date();
    let d  = dt.getDate();
    let m  = dt.getMonth() + 1;
    let y  = dt.getFullYear();

    if(d < 10)
      d = `0${d}`;

    if(m < 10)
      m = `0${m}`;
    
    setDay(`${d}/${m}/${y}`);
  }, []);

  const save = () => {
    if((car && car !== null) && (value && value !== null)
                             && (desc && desc !== null)
                             && (day && day !== null)){
      setMsg(null);
      
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
    } else {
      setCarError(!(car && car !== null));
      setValueError(!(value && value !== null));
      setDayError(!(day && day !== null));
      setDescError(!(desc && desc !== null));

      setMsg('Selecione um carro, informe um valor, selecione o tipo de gasto e a data para continuar!');
    }
  }

  const renderCarsOptions = () => {
    let cs = [];

    cars.forEach(c => {
      cs.push(
        <Card action={() => setCar(car == c.id ? null : c.id)} key={c.id}
            style={[styles.cardOption, carError === true ? styles.cardError : {}, car == c.id ? styles.cardSelected : {}]}
            content={<Legend icon={faCar} value={c.id} customStyle={{justifyContent:'center'}}/>}
        />
      );
    });

    return cs;
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
      <ScrollView contentContainerStyle={styles.formStyle}>

        <Label value='Tipo de gasto' customStyle={styles.lbl}/>

        <View style={styles.cardWrap}>
          <Card action={() => setDesc('Combustível')}
              style={[styles.cardOption, descError === true ? styles.cardError : {}, desc == 'Combustível' ? styles.cardSelected : {}]}
              content={<Legend icon={faGasPump} value='Combustível' customStyle={{justifyContent:'center'}}/>}
          />

          <Card action={() => setDesc('Borracharia')}
              style={[styles.cardOption, descError === true ? styles.cardError : {}, desc == 'Borracharia' ? styles.cardSelected : {}]}
              content={<Legend icon={faTruckMonster} value='Borracharia' customStyle={{justifyContent:'center'}}/>}
          />

          <Card action={() => setDesc('Manutenção')}
              style={[styles.cardOption, descError === true ? styles.cardError : {}, desc == 'Manutenção' ? styles.cardSelected : {}]}
              content={<Legend icon={faScrewdriverWrench} value='Manutenção' customStyle={{justifyContent:'center'}}/>}
          />
        </View>

        <Label value='Carro' customStyle={styles.lbl}/>

        <View style={styles.cardWrap}>
          {renderCarsOptions()}
        </View>

        <Label value='Detalhes (valor, data e observações)' customStyle={styles.lbl}/>

        <TextInput placeholder='Valor' 
            placeholderTextColor={valueError === true ? '#d50000' : '#333'}
            style={[styles.inputStyle, styles.inputHalf, valueError === true ? styles.inputErrorStyle : {}]}
            keyboardType='numeric'
            value={value} 
            onChangeText={setValue}
        />

        <TextInput placeholder='Data (DD/MM/YYYY)' 
            placeholderTextColor={dayError === true ? '#d50000' : '#333'}
            style={[styles.inputStyle, styles.inputHalf, dayError === true ? styles.inputErrorStyle : {}]}
            value={day} 
            onChangeText={setDay}
        />

        <TextInput placeholder='Observação (ex.: KM, detalhe da manutenção...)' 
            placeholderTextColor='#333'
            style={[styles.inputStyle, styles.inputHalf]}
            value={obs} 
            onChangeText={setObs}
        />

        {renderMsg()}
      </ScrollView>

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
    backgroundColor:'#fafafa'
  },
  cardError:{
    borderWidth:2,
    borderColor:'#d50000',
    backgroundColor:'#ffe6e6'
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
  lbl:{
    fontSize:14,
    marginLeft:5
  },
  msg:{
    color:'#d50000'
  },
});

export default CarBillForm;