import React, {useEffect, useState} from "react";

import {
  FlatList,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useIsFocused } from "@react-navigation/native";
import { faCar, faWarehouse } from '@fortawesome/free-solid-svg-icons/';
import CarListItem from "./components/CarListItem";
import CarService from "../service/CarService";
import FloatBtn from "./components/FloatBtn";
import Legend from "./components/Legend";
import TitleLabel from "./components/TitleLabel";
import HeaderNavigator from "./components/HeaderNavigator";

const CarsScreen = ({navigation}) => {
  const [itens, setItens] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused) 
      init();
  },[isFocused]);

  const init = () => {
    reset();

    CarService.get().then((result) => setItens(result))
                  .catch(e => console.log(e));
  }

  const reset = () => {
    setItens([]);
  }

  return (
    <>
      <StatusBar backgroundColor='#f7f7f7'/>

      <View style={bkg}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <>
                <HeaderNavigator icon={faWarehouse} 
                    navigation={navigation}
                    action={() => navigation.navigate('Garage')} />

                <TitleLabel value='Meus carros' customStyle={title}/>

                <TouchableHighlight 
                    underlayColor='transparent'
                    style={refreshBtnStyle}
                    onPress={() => init()}>
                  
                  <Legend value='Atualizar'/>
                </TouchableHighlight>
              </>
            );
          }}
          data={itens}
          style={listStyle}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <CarListItem car={item} removable={true} onRemove={() => init()}/>
            );
          }}
        />

        <FloatBtn icon={faCar} label='Adicionar carro' 
            action={() => navigation.navigate('AddCar')} 
        />
      </View>
    </>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const listStyle = StyleSheet.create({
  marginBottom: 80,
  minHeight:screenHeight * 0.85
});

const title = StyleSheet.create({
  textAlign:'center',
  marginBottom:20,
});

const refreshBtnStyle = StyleSheet.create({
  flexDirection: 'row',
  justifyContent:'center',
  paddingVertical: 10,
});

const bkg = StyleSheet.create({
  backgroundColor:'#f7f7f7',
  
});

const cardsWrap = StyleSheet.create({
  flexDirection:'row',
  justifyContent:'space-between'
});

const costLbl = StyleSheet.create({
  fontSize:24,
  fontWeight:'bold',
  textAlign:'center'
});

const costSubLbl = StyleSheet.create({
  fontSize:12,
  textAlign:'center'
});

const headerOptions = StyleSheet.create({
  flexDirection:'row',
  width:screenWidth,
  paddingHorizontal:10,
  justifyContent:'space-between'
});

const modalHeaderlbl = StyleSheet.create({
  flexDirection:'row',
  justifyContent:'center',
});

const modalOption = StyleSheet.create({
  margin:10
});

export default CarsScreen;