import React, {useEffect, useState} from "react";

import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

import CarBillService from "../service/CarBillService";
import { useIsFocused } from "@react-navigation/native";
import CarBillsByMonthListItem from "./components/CarBillsByMonthListItem";
import HeaderNavigator from "./components/HeaderNavigator";
import { faWarehouse } from "@fortawesome/free-solid-svg-icons";
import Months from "../service/Months";

const CarBillsScreen = ({navigation}) => {
  const [mapItensByMonth, setMapItensByMonth] = useState(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused)
      loadItens();
  },[isFocused]);

  const loadItens = () => {
    CarBillService.get()
                .then((result) => doItensMapByMonth(result))
                .catch((e) => console.log(e));
  }

  const doItensMapByMonth = (itens) => {
    if(itens && itens !== null && itens.length > 0){
      let newMap = new Map(); 

      for(let c=0; c<itens.length; c++){
        let i = itens[c];

        if(i && i.desc){
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
    let year = bill.date.substring(6);
    let month = bill.date.substring(3,5);

    if(month.startsWith('0'))
      month = month.substring(1);

    return `${Months.names[month]}/${year}`;
  }

  const getMapKeys = () => {
    let k = []

    if(mapItensByMonth && mapItensByMonth !== null)
      k = [...mapItensByMonth.keys()];

    return k.reverse();
  }

  const getGasCostOfMonth = (itemKey) => {
    let balance = new Number(0);
    
    if(itemKey){
      const itens = mapItensByMonth.get(itemKey);

      if(itens){
        for(let i=0; i < itens.length; i++){
          let val = itens[i].value;

          if(itens[i].desc == 'Combustível')
            balance = balance + new Number(val);
        }
      }
    }

    return new Number(balance);
  }

  const getCostsOfMonth = (itemKey) => {
    let costs = new Number(0);
    
    if(itemKey){
      const itens = mapItensByMonth.get(itemKey);

      if(itens){
        for(let i=0; i < itens.length; i++){
          let val = itens[i].value;

          costs = costs + new Number(val);
        }
      }
    }

    return new Number(costs);
  }

  return (
      <View style={bkg}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <HeaderNavigator icon={faWarehouse} 
                  navigation={navigation}
                  action={() => navigation.navigate('Garage')} 
              />
            );
          }}
          data={getMapKeys()}
          style={{marginBottom: 80}}
          renderItem={(key) => {
            return (
              <CarBillsByMonthListItem month={key.item} 
                  costs={getCostsOfMonth(key.item)}
                  gasCost={getGasCostOfMonth(key.item)} 
                  bills={mapItensByMonth.get(key.item)}
                  onRemove={() => loadItens()}
              />
            );
          }}
        />
      </View>
  );
}

const bkg = StyleSheet.create({
  backgroundColor:'#f7f7f7'
});

export default CarBillsScreen;