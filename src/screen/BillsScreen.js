import React, {useEffect, useState} from "react";

import {
  FlatList,
  StyleSheet,
  Dimensions,
  View,
  TouchableHighlight,
} from 'react-native';

import SubTitleLabel from './components/SubTitleLabel';
import BillListItem from "./components/BillListItem";
import BillService from "../service/BillService";
import Label from "./components/Label";
import { useIsFocused } from "@react-navigation/native";
import Legend from "./components/Legend";
import { isForOfStatement } from "typescript";

const IN = 'IN';
const OUT = 'OUT';
const FIXA = 'Fixa';

const BillsScreen = ({navigation}) => {
  const [showList, setShowList] = useState(true);
  const [mapItensByMonth, setMapItensByMonth] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused)
      loadItens();
  },[isFocused]);

  const loadItens = () => {
    BillService.get()
                .then((result) => doItensMapByMonth(result))
                .catch((e) => console.log(e));
  }

  const doItensMapByMonth = (itens) => {
    if(itens && itens !== null && itens.length > 0){
      let newMap = new Map(); 

      for(let c=0; c<itens.length; c++){
        let i = itens[c];

        let key = getBillMapKey(i);

        if((newMap.get(key) && [...newMap.get(key).values()].length > 0) == true){
          newMap.get(key).push(i);
        } else {
          newMap.set(key, [i]);
        }
      }
      
      setMapItensByMonth(newMap);
    }
  }

  const getBillMapKey = (bill) => {
    if(bill.cat == FIXA)
      return FIXA;
    else
      return `${bill.refMonth}/${bill.refYear}`;
  }

  const removeHandler = (bill) => {
    try{
      const key = getBillMapKey(bill);

      let itens = mapItensByMonth.get(key);
      
      itens.splice(itens.indexOf(bill), 1);
      
      setMapItensByMonth(itens);

      navigation.navigate('Home');
    }catch(e){
      console.log(e);
    }
  }

  const loadList = (itemKey) => {
    const itens = mapItensByMonth.get(itemKey);

    if((showList && itens && itens != null) == false){
      return <></>;
    } else {
      return (
        <FlatList
            data={itens}
            keyExtractor={(child) => child.id}
            renderItem={(child) => {
              return (
                <BillListItem bill={child.item} 
                    removable={true}
                    onRemove={() => removeHandler(child.item)}
                />
              );
            }}
        />
      );
    }
  }

  const getMapKeys = () => {
    let k = []

    if(mapItensByMonth && mapItensByMonth !== null)
      k = [...mapItensByMonth.keys()];

    return k;
  }

  const getBalanceOfMonth = (itemKey) => {
    let balance = new Number(0);
    
    if(itemKey){
      const itens = mapItensByMonth.get(itemKey);

      if(itens){
        for(let i=0; i < itens.length; i++){
          let val = itens[i].value;

          if(itens[i].type == IN){
            balance = balance + new Number(val);
          } else {
            balance = balance - new Number(val);
          }
        }
      }

      if(itemKey != FIXA)
        balance = balance + getBalanceOfMonth(FIXA);
    }

    return new Number(balance);
  }

  return (
      <FlatList
        ListHeaderComponent={() => {
          return (
            <View>
              <TouchableHighlight underlayColor='#ddd' onPress={() => navigation.goBack()}>
                <Label value='Voltar'/>
              </TouchableHighlight>
            </View>
          );
        }}
        data={getMapKeys()}
        style={{marginBottom: 80}}
        renderItem={(key) => {

          return (
            <>
              <TouchableHighlight underlayColor='#ddd' 
                  style={monthsStyle}
                  onPress={() => null}>

                <View style={monthsLblStyle}>
                  <SubTitleLabel customStyle={btnLblStyle} 
                      value={`${key.item}`}/>
                  
                  <Legend customStyle={{color:'#555'}} 
                      value={` (Saldo: R$ ${getBalanceOfMonth(key.item)})`}/>
                </View>

              </TouchableHighlight>

              {loadList(key.item)}
            </>
          );
        }}
      />
  );
}

const screenWidth = Dimensions.get('window').width;

const monthsStyle = StyleSheet.create({
  padding: 20,
  width: screenWidth,
  
});

const btnLblStyle = StyleSheet.create({
  color:'#555',
  fontWeight:'normal'
});

const monthsLblStyle = StyleSheet.create({
  flexDirection: 'row',
  alignItems:'center'
});

export default BillsScreen;