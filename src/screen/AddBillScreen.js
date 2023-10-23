import React, {useState} from "react";
import {
  StyleSheet,
  Dimensions,
  View,
  ScrollView,
} from 'react-native';
import { faWallet, faCheck } from '@fortawesome/free-solid-svg-icons';
import BillForm from "./components/form/BillForm";
import FixBillForm from "./components/form/FixBillForm";
import HeaderNavigator from "./components/HeaderNavigator";
import Card from "./components/Card";
import Label from "./components/Label";
import Board from "./components/Board";

const FIXA = 'Fixa';
const OUTRAS = 'Outras';

const AddBillScreen = ({navigation}) => {
  const [form, setForm] = useState('');
  const [success, setSuccess] = useState(false);

  const reset = () => {
    setSuccess(false);
  }

  const loadForm = () => {
    let formSelected = <></>;

    if(form == FIXA)
      formSelected = <FixBillForm onSubmit={() => setSuccess(true)}/>;

    if(form == OUTRAS)
      formSelected = <BillForm onSubmit={() => setSuccess(true)}/>;

    return formSelected;
  }

  const loadBoard = () => {
    if(success) {
      return (
        <Board action={() => reset()} icon={faCheck} iconStyle={{color:'#000'}}
            content={<Label value='Ok! Adicionado com sucesso!' />} 
        />
      );
    }

    return <></>;
  }

  return (
    <ScrollView style={styles.wrap}>
      <HeaderNavigator icon={faWallet} 
          navigation={navigation} 
          action={() => navigation.navigate('Home')}
      />

      <Label value='Tipo de lançamento' customStyle={styles.lbl}/>

      <View style={styles.formOptionsWrap}>
        <Card action={() => setForm(FIXA)}
            style={form == FIXA ? styles.cardSelected : {}}
            content={<Label customStyle={styles.cardLbl} value={'Add conta fixa'} />} 
        />

        <Card action={() => setForm(OUTRAS)}
            style={form == OUTRAS ? styles.cardSelected : {}}
            content={<Label customStyle={styles.cardLbl} value={'Add gasto'} />} 
        />
      </View>

      {loadBoard()}

      {loadForm()}
    </ScrollView>
  );
}

const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  wrap: {
    backgroundColor:'#f7f7f7',
    height:screenHeight
  },
  formOptionsWrap: {
    flexDirection:'row'
  },
  cardLbl: {
    textAlign:'center'
  },
  cardSelected:{
    borderColor:'#000',
    borderWidth:1,
  },
  lbl:{
    fontSize:14,
    marginLeft:5,
    marginTop:10
  }
});

export default AddBillScreen;