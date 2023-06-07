import React, {useEffect, useState} from "react";

import {
  FlatList,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  StatusBar
} from 'react-native';

import { useIsFocused } from "@react-navigation/native";

import BalanceCards from "./components/BalanceCards";
import FloatBtn from './components/FloatBtn';
import TitleLabel from './components/TitleLabel';
import BillListItem from "./components/BillListItem";
import BillService from "../service/BillService";
import Months from "../service/Months";
import Legend from "./components/Legend";
import Label from "./components/Label";

const IN = 'IN';
const OUT = 'OUT';

const HomeScreen = ({navigation}) => {
  const [itens, setItens] = useState([]);
  const [wellcomeMsg, setWellcomeMsg] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused)
      init();
  },[isFocused]);

  const init = () => {
    reset();

    loadItens();
    loadWelcomeMsg();
  }

  const reset = () => {
    setItens([]);
  }

  const loadItens = () => {
    const d = new Date();

    BillService.getByMonthAndYear(
                  Months.names[d.getMonth()], 
                  d.getFullYear())
                .then((result) => setItens(result))
                .catch((e) => console.log(e));
  }

  const loadWelcomeMsg = () => {
    let hour = new Date().getHours();

    let msg = 'Boa noite!';

    if(hour > 5 || hour < 12)
      msg = 'Bom dia!';
    else if(hour > 12 || hour < 18)
      msg = 'Boa tarde!';

    setWellcomeMsg(`Olá! ${msg}`);
  }

  const getTotalBillsVal = () => {
    let val = new Number(0);
    
    for(let i=0; i < itens.length; i++){
      if(itens[i].type == OUT)
        val = val + new Number(itens[i].value);
    }

    return val;
  }

  const getBalanceVal = () => {
    let val = new Number(0);
    
    for(let i=0; i < itens.length; i++){
      if(itens[i].type == IN)
        val = val + new Number(itens[i].value);
    }

    return val - getTotalBillsVal();
  }

  const getMonthLegendLabel = () => {
    const d = new Date();

    return `${Months.names[d.getMonth()]}/${d.getFullYear()}`;
  }

  return (
    <>
      <StatusBar backgroundColor='#06901E'/>
      <View>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View>
                <View>
                  <TouchableHighlight underlayColor='#ddd' 
                      onPress={() => navigation.navigate('Garage')}>

                    <Label value='Ir pra Garagem'/>
                  </TouchableHighlight>
                </View>
                <TitleLabel value={wellcomeMsg}/>

                <BalanceCards balance={new Number(getBalanceVal())} 
                    totalBills={new Number(getTotalBillsVal())}
                />

                <TitleLabel value='Contas e gastos'/>

                <TouchableHighlight 
                    underlayColor='#ddd'
                    style={refreshBtnStyle}
                    onPress={() => init()}>
                  
                  <Legend value='Atualizar lista'/>
                </TouchableHighlight>

                <View style={listOptionsStyle}>
                  <Legend 
                      style={loLblStyle}
                      value={`${getMonthLegendLabel()}`}
                  />

                  <TouchableHighlight 
                      underlayColor='#ddd'
                      style={loBtnStyle}
                      onPress={() => navigation.navigate('Bills')}>
                    
                    <Legend value='Ver todos os meses'/>

                  </TouchableHighlight>
                </View>
              </View>
            );
          }}
          data={itens}
          style={{marginBottom: 80}}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => <BillListItem bill={item} />}
        />

        <FloatBtn label='Adicionar conta ou gasto' 
            action={() => navigation.navigate('AddBill')} 
        />

      </View>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;

const listOptionsStyle = StyleSheet.create({
  width: screenWidth,
  flexDirection: 'row',
  paddingHorizontal: 20,
  justifyContent:'space-between'

});

const loLblStyle = StyleSheet.create({
  width: (screenWidth / 2) - 20,
  textAlign:'left',
});

const loBtnStyle = StyleSheet.create({
  flexDirection: 'row',
  width: (screenWidth / 2) - 20,
  justifyContent:'flex-end',
  paddingBottom: 10,
});

const refreshBtnStyle = StyleSheet.create({
  flexDirection: 'row',
  justifyContent:'center',
  paddingVertical: 10,
});

export default HomeScreen;