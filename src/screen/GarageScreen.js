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
import { faWallet, faScrewdriverWrench, faCarSide, faCar } from '@fortawesome/free-solid-svg-icons/';
import Label from "./components/Label";
import CarBillListItem from "./components/CarBillListItem";
import CarBillService from "../service/CarBillService";
import CarService from "../service/CarService";
import FloatBtn from "./components/FloatBtn";
import Legend from "./components/Legend";
import TitleLabel from "./components/TitleLabel";
import Modal from "./components/Modal";
import HeaderNavigator from "./components/HeaderNavigator";
import Card from "./components/Card";
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitIdBot = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/9810617852';

const GarageScreen = ({navigation}) => {
  const [itens, setItens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filtered, setFiltered] = useState(false);
  const [filterLbl, setFilterLbl] = useState('');
  const [totalLbl, setTotalLbl] = useState([]);
  const [totalFuelLbl, setTotalFuelLbl] = useState([]);
  const [cars, setCars] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    if(isFocused) 
      init();
  },[isFocused]);

  const init = () => {
    reset();

    CarBillService.get().then((result) => organizeItens(result))
                  .catch(e => console.log(e));

    CarService.get().then(cs => setCars(cs)).catch(e=> console.log(e));
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

  const organizeItens = (its) => {
    if(its && its !== null && its.length > 0){
      let result = its;

      result.sort((a, b) => {
        let da = toDate(a.date);
        let db = toDate(b.date);

        if(da > db)
          return -1;

        if(da < db)
          return 1;

        return 0;
      });

      setItens(result);
      
      setFiltered(false);
    }
  }

  const filter = (car) => {
    if(itens && itens !== null && itens.length > 0){
      let ifd = itens.filter((i) => i.car === car);

      setItens(ifd);
      setFiltered(true);
      setFilterLbl('Limpar filtro');
    }
  }

  const reset = () => {
    setItens([]);
    setShowModal(false);
    setFiltered(false);
    setFilterLbl('Filtrar por carro');
  }

  const loadTotalMsg = () => {
    let monthTotal = 0;

    if(itens && itens !== null && itens.length > 0){
      itens.map((i) => {
        let dt = toDate(i.date);

        let dtAtual = new Date();

        if(dt.getMonth() === dtAtual.getMonth()
            && dt.getFullYear() === dtAtual.getFullYear()){
      
          monthTotal += parseFloat(i.value);
        }
      });    
    }

    return `R$ ${monthTotal}`;
  }

  const loadTotalFuelMsg = () => {
    let fuelTotal = 0;

    if(itens && itens !== null && itens.length > 0){
      itens.map((i) => {
        if(i.desc && i.desc !== null && i.desc.includes('ombust')){

          let dt = toDate(i.date);

          let dtAtual = new Date();

          if(dt.getMonth() === dtAtual.getMonth() 
              && dt.getFullYear() === dtAtual.getFullYear()){
          
            fuelTotal += parseFloat(i.value);
          }
        }
      });
    }

    return `R$ ${fuelTotal}`;
  }

  const getModalOptions = () => {
    let options = [];

    if(itens && itens !== null && itens.length > 0){
      itens.map((i) => {
        if(options.indexOf(i.car) < 0)
          options.push(i.car);
      });
    }

    if(options.length > 0) {
      return (
        <View>
          <FlatList 
              data={options}
              keyExtractor={(c, i) => c + i}
              ListHeaderComponent={() => {
                return (
                  <View style={modalHeaderlbl}>
                    <Label value='Selecione um carro:'/>
                  </View>
                )
              }}
              renderItem={({item}) => {
                return (
                  <TouchableHighlight underlayColor='#e1fce8' 
                      style={modalOption}
                      onPress={() => onSelectOption(item)}>

                    <Label value={item}/>
                    
                  </TouchableHighlight>
                );
              }}
          />
        </View>
      );
    } else {
      return <></>
    }
  }

  const onSelectOption = (option) => {
    setShowModal(false);

    filter(option);
  }

  return (
    <>
      <StatusBar backgroundColor='#f7f7f7'/>

      <View style={bkg}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <>
                <HeaderNavigator icon={faWallet} 
                    navigation={navigation}
                    action={() => navigation.navigate('Home')} />

                <TitleLabel value='Garagem' customStyle={title}/>
              
                <View style={cardsWrap}>
                  <Card action={() => navigation.navigate('CarBills')} content={(
                      <View>
                        <Label value={loadTotalMsg()} customStyle={costLbl}/>
                        <Label value={'gastos\neste mês'} customStyle={costSubLbl}/>
                      </View>
                    )}
                  />
                
                  <Card action={() => navigation.navigate('CarBills')} content={(
                      <View>
                        <Label value={loadTotalFuelMsg()} customStyle={costLbl}/>
                        <Label value={'gastos em\ncombustível este mês'} customStyle={costSubLbl}/>
                      </View>
                    )}
                  />
                </View>

                <TouchableHighlight 
                    underlayColor='transparent'
                    style={refreshBtnStyle}
                    onPress={() => init()}>
                  
                  <Legend value='Atualizar'/>
                </TouchableHighlight>
              
                <View style={headerOptions}>
                  <TouchableHighlight 
                      underlayColor='transparent'
                      style={refreshBtnStyle}
                      onPress={() => filtered ? init() : setShowModal(true)}>
                    
                    <Legend icon={faCarSide} value={filterLbl}/>
                  </TouchableHighlight>

                  <TouchableHighlight 
                      underlayColor='transparent'
                      style={refreshBtnStyle}
                      onPress={() => navigation.navigate('Cars')}>
                    
                    <Legend icon={faCar} value='Meus carros'/>
                  </TouchableHighlight>
                </View>
              </>
            );
          }}
          data={itens}
          style={listStyle}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => {
            return (
              <CarBillListItem bill={item} removable={true} 
                    onRemove={() => init()}/>
            );
          }}
          ListFooterComponent={
            <View style={{alignItems:'center', marginTop:5}}>
              <BannerAd
                  unitId={adUnitIdBot}
                  size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                  requestOptions={{
                    requestNonPersonalizedAdsOnly: false,
                  }}
              />
            </View>
          }
        />

        <FloatBtn icon={faScrewdriverWrench} label='Adicionar gasto com carro' 
            action={() => navigation.navigate(cars.length > 0 ? 'AddCarBill' : 'AddCar')} 
        />
      </View>

      <Modal isActive={showModal} onClose={() => setShowModal(!showModal)}
          content={getModalOptions()}
      />
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

export default GarageScreen;