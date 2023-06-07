import React, {useEffect, useState} from "react";

import {
  FlatList,
  View,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

import { useIsFocused } from "@react-navigation/native";

import Label from "./components/Label";
import CarBillListItem from "./components/CarBillListItem";
import CarBillService from "../service/CarBillService";
import FloatBtn from "./components/FloatBtn";
import Legend from "./components/Legend";
import TitleLabel from "./components/TitleLabel";

const GarageScreen = ({navigation}) => {
  const [itens, setItens] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused) 
      init();
  },[isFocused]);

  const init = () => {
    reset();

    CarBillService.get().then((result) => organizeItens(result))
                  .catch(e => console.log(e));
  }

  const toDate = (d) => {
    let day = `${d[0]}${d[1]}`;
    let mon = `${d[3]}${d[4]}`;
    let yea = `${d[6]}${d[7]}${d[8]}${d[9]}`;

    let dt = new Date();
    dt.setDate(day);
    dt.setMonth(parseInt(mon) - 1);
    dt.setFullYear(yea);

    return dt;
  }

  const organizeItens = (itens) => {
    if(itens && itens !== null && itens.length > 0){
      let result = itens.reverse();

      itens.sort((a, b) => {
        let da = toDate(a.date);
        let db = toDate(b.date);

        if(da > db)
          return -1;

        if(da < db)
          return 1;

        return 0;
      });

      setItens(result)
    }
  }

  const reset = () => {
    setItens([]);
  }

  const loadWelcomeMsg = () => {
    let hour = new Date().getHours();

    let msg = 'Boa noite!';

    if(hour > 5 || hour < 12)
      msg = 'Bom dia!';
    else if(hour > 12 || hour < 18)
      msg = 'Boa tarde!';

    return msg;
  }

  return (
    <View>
      <FlatList
        ListHeaderComponent={() => {
          return (
            <>
              <View>
                <TouchableHighlight underlayColor='#ddd' 
                    onPress={() => navigation.navigate('Home')}>

                  <Label value='Ir pra Carteira'/>
                </TouchableHighlight>
              </View>

              <View>
                <TitleLabel value={loadWelcomeMsg()}/>
              </View>

              <View>
                <TouchableHighlight 
                    underlayColor='#ddd'
                    style={refreshBtnStyle}
                    onPress={() => init()}>
                  
                  <Legend value='Atualizar lista'/>
                </TouchableHighlight>
              </View>
            </>
          );
        }}
        data={itens}
        style={{marginBottom: 80}}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => {
          return (
            <CarBillListItem bill={item} removable={true} 
                  onRemove={() => init()}/>
          );
        }}
      />

      <FloatBtn label='Adicionar gasto com carro' 
          action={() => navigation.navigate('AddCarBill')} 
      />
    </View>
  );
}

const refreshBtnStyle = StyleSheet.create({
  flexDirection: 'row',
  justifyContent:'center',
  paddingVertical: 10,
});

export default GarageScreen;