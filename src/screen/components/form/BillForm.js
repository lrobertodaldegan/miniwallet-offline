import React, {useState}from 'react';

import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native';

import Months from '../../../service/Months';
import Btn from '../Btn';
import SubTitleLabel from '../SubTitleLabel';
import FloatOptions from './FloatOptions';

import BillService from "../../../service/BillService";

const BillForm = ({onSubmit}) => {
  const [showForm, setShowForm] = useState(true);

  const [desc, setDesc] = useState(null);
  const [type, setType] = useState(null);
  const [cat, setCat] = useState(null);
  const [value, setValue] = useState(null);
  const [refMonth, setRefMonth] = useState(null);
  const [refYear, setRefYear] = useState(null);

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
                .then((result) => onSubmit())
                .catch(e => console.log(e));
  }

  const loadForm = () => {
    if(showForm){
      return (
        <View style={formStyle}>
          <TextInput placeholder='Descrição' 
              placeholderTextColor='#333'
              style={inputStyle}
              value={desc} 
              onChangeText={setDesc}
          />

          <TextInput placeholder='Categoria' 
              placeholderTextColor='#333'
              style={inputStyle}
              value={cat} 
              onChangeText={setCat}
          />

          <TextInput placeholder='Valor' 
              placeholderTextColor='#333'
              style={inputStyle}
              keyboardType='numeric'
              value={value} 
              onChangeText={setValue}
          />

          <FloatOptions 
              label={type && type != null ? `Tipo: ${type}` : 'Escolha um tipo'}
              options={['IN', 'OUT']}
              onSelect={setType}
          />

          <FloatOptions 
              label={refYear && refYear != null ? `Ano: ${refYear}` : 'Escolha um ano'}
              options={[
                new Date().getFullYear(),
                new Date().getFullYear()+1,
                new Date().getFullYear()+2,
                new Date().getFullYear()+3,
                new Date().getFullYear()+4,
              ]}
              onSelect={setRefYear}
          />

          <FloatOptions 
              label={refMonth && refMonth != null ? `Mês: ${refMonth}` 
                                                : 'Escolha um mês'}
              options={Months.names}
              onSelect={setRefMonth}
          />

          <Btn label='Adicionar' action={() => save()}/>
        </View>
      );
    }

    return <></>;
  }

  return (
    <View>
      <TouchableHighlight underlayColor='#ddd' 
          style={style}
          onPress={() => setShowForm(!showForm)}>
        <SubTitleLabel customStyle={btnLblStyle} value='Add conta ou gasto'/>
      </TouchableHighlight>

      {loadForm()}
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

export default BillForm;