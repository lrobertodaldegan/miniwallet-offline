import React, {useState}from 'react';

import {
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  View,
  TextInput,
} from 'react-native';
import BillService from '../../../service/BillService';
import Btn from '../Btn';

import SubTitleLabel from '../SubTitleLabel';
import FloatOptions from './FloatOptions';

const FixBillForm = ({onSubmit}) => {
  const [showForm, setShowForm] = useState(false);

  const [desc, setDesc] = useState(null);
  const [type, setType] = useState(null);
  const [value, setValue] = useState(null);

  const save = () => {
    let bill = {
      id: new Date().getTime(),
      desc: desc,
      type: type,
      cat: 'Fixa',
      value: value
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
        <SubTitleLabel customStyle={btnLblStyle} value='Add conta ou gasto fixos'/>
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

export default FixBillForm;