import React, {useEffect, useState} from "react";

import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import { faWallet } from '@fortawesome/free-solid-svg-icons/faWallet';

import BillService from "../service/BillService";
import { useIsFocused } from "@react-navigation/native";
import BillsByMonthListItem from "./components/BillsByMonthListItem";
import HeaderNavigator from "./components/HeaderNavigator";

const IN = 'IN';
const FIXA = 'Fixa';

const BillsScreen = ({navigation}) => {
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

        if(i && i.cat){
          let key = getBillMapKey(i);

          if((newMap.get(key) && [...newMap.get(key).values()].length > 0) == true){
            newMap.get(key).push(i);
          } else {
            newMap.set(key, [i]);
          }
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

  const getMapKeys = () => {
    let k = []

    if(mapItensByMonth && mapItensByMonth !== null)
      k = [...mapItensByMonth.keys()];

    return k.reverse();
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
      <View style={bkg}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <HeaderNavigator icon={faWallet} 
                  navigation={navigation}
                  action={() => navigation.navigate('Home')} 
              />
            );
          }}
          data={getMapKeys()}
          style={{marginBottom: 80}}
          renderItem={(key) => {
            return (
              <BillsByMonthListItem month={key.item} 
                  balance={getBalanceOfMonth(key.item)} 
                  bills={mapItensByMonth.get(key.item)}
              />
            );
          }}
        />
      </View>
  );
}

const bkg = StyleSheet.create({
  backgroundColor:'#e8faed'
});

const iconStyle = StyleSheet.create({
  marginTop:14,
  marginLeft:20,
  color:'#555'
});

const headerBtn = StyleSheet.create({
  flexDirection:'row',
  alignItens:'center'
});

export default BillsScreen;