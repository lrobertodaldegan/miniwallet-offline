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
import { faWarehouse, faCalculator, faCalendar, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import BalanceCards from "./components/BalanceCards";
import FloatBtn from './components/FloatBtn';
import TitleLabel from './components/TitleLabel';
import BillListItem from "./components/BillListItem";
import BillService from "../service/BillService";
import Months from "../service/Months";
import Legend from "./components/Legend";
import HeaderNavigator from "./components/HeaderNavigator";
import Modal from "./components/Modal";
import Label from "./components/Label";
import Board from "./components/Board";
import { BannerAd,BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
const adUnitIdBot = __DEV__ ? TestIds.BANNER : 'ca-app-pub-2420598559068720/9810617852';

const IN = 'IN';
const OUT = 'OUT';

const PAGAR = 'PAGAR';

const MODAL_OPTIONS = [
  {
    dt:new Date((new Date()).getFullYear(), (new Date()).getMonth() - 2, 10), 
    lbl: `${Months.names[(new Date()).getMonth() -1]}/${(new Date()).getFullYear()}`,
    bold:false
  },
  {
    dt:new Date((new Date()).getFullYear(), (new Date()).getMonth() - 1, 10), 
    lbl: `${Months.names[(new Date()).getMonth()]}/${(new Date()).getFullYear()}`,
    bold:false
  },
  {
    dt:new Date((new Date()).getFullYear(), (new Date()).getMonth(), 10), 
    lbl: `${Months.names[(new Date()).getMonth() +1]}/${(new Date()).getFullYear()}`,
    bold:true
  },
  {
    dt:new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 10), 
    lbl: `${Months.names[(new Date()).getMonth() +2]}/${(new Date()).getFullYear()}`,
    bold:false
  },
  {
    dt:new Date((new Date()).getFullYear(), (new Date()).getMonth() + 2, 10), 
    lbl: `${Months.names[(new Date()).getMonth() +3]}/${(new Date()).getFullYear()}`,
    bold:false
  },
]

const HomeScreen = ({navigation}) => {
  const [itens, setItens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [openBills, setOpenBills] = useState(false);
  const [d, setD] = useState(new Date());

  const focus = useIsFocused();

  useEffect(() => {
    if(focus)
      init();
  },[focus]);

  const init = () => {
    reset();

    loadItens(d);
  }

  const reset = () => {
    setItens([]);

    setOpenBills(false);
  }

  const loadItens = (dataRef) => {
    let m = Months.names[d.getMonth()+1];
    let a = d.getFullYear();

    if(dataRef && dataRef !== null) {
      m = Months.names[dataRef.getMonth()+1];
      a = dataRef.getFullYear();
    }

    BillService.getByMonthAndYear(m, a)
                .then((result) => {
                  setItens(result); 
                  loadBoard(result);
                })
                .catch((e) => console.log(e));
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
    if(d && d !== null)
      return `${Months.names[d.getMonth()+1]}/${d.getFullYear()}`;

    return '';
  }

  const onSelectOption = (option) => {
    setD(option);

    setShowModal(false);

    loadItens(option);
  }

  const loadBoard = (is) => {
    setOpenBills(false);

    for(let i=0; i < is.length; i++){
      if(OUT === is[i].type){
        BillService.getStatus(is[i].id, is[i].refMonth, is[i].refYear)
                  .then((sts) => {
                    if(PAGAR === sts){
                      setOpenBills(true);
                    }
                  })
                  .catch((e) => console.log(e));
      }
    }
  }

  const getBoard = () => {
    if(openBills){
      return <Board content={<Label value={`Temos contas em aberto!`}/>}
                  style={{backgroundColor:'#ffe8a8'}}/>;
    }

    return <></>
  }

  const update = () => {
    loadItens(d);
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#f7f7f7'/>

      <View style={bkg}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View style={bkg}>
                <HeaderNavigator icon={faWarehouse} 
                    navigation={navigation}
                    action={() => navigation.navigate('Garage')} />

                <TitleLabel value='Carteira' customStyle={title}/>

                {getBoard()}

                <BalanceCards balance={new Number(getBalanceVal())} 
                    totalBills={new Number(getTotalBillsVal())}
                    navigation={navigation}
                />

                {/* <TouchableHighlight 
                    underlayColor='transparent'
                    style={refreshBtnStyle}
                    onPress={() => update()}>
                  
                  <Legend value='Atualizar'/>
                </TouchableHighlight> */}

                <View style={listOptionsStyle}>
                  <TouchableHighlight 
                      underlayColor='transparent'
                      onPress={() => setShowModal(!showModal)}>
                    
                    <Legend icon={faCalendarCheck} style={loLblStyle} 
                        value={`${getMonthLegendLabel()}`}/>

                  </TouchableHighlight>

                  <TouchableHighlight 
                      underlayColor='transparent'
                      style={loBtnStyle}
                      onPress={() => navigation.navigate('Bills')}>
                    
                    <Legend icon={faCalendar} value='Ver todos os meses'/>

                  </TouchableHighlight>
                </View>
              </View>
            );
          }}
          data={itens}
          style={listStyle}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => 
            <BillListItem bill={item} 
                refMonth={Months.names[d.getMonth()+1]} 
                refYear={d.getFullYear()}
                onUpdateBillStatus={() => update()}
            />
          }
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

        <FloatBtn icon={faCalculator} label='Adicionar conta ou gasto' 
            action={() => navigation.navigate('AddBill')} 
        />

      </View>

      <Modal isActive={showModal} onClose={() => setShowModal(!showModal)}
          content={
            <View>
              <FlatList 
                  data={MODAL_OPTIONS}
                  keyExtractor={(m, i) => m.lbl + i}
                  ListHeaderComponent={() => {
                    return (
                      <View style={modalHeaderlbl}>
                        <Label value='Selecione um mês:'/>
                      </View>
                    )
                  }}
                  renderItem={({item}) => {
                    return (
                      <TouchableHighlight underlayColor='transparent' 
                          style={modalOption}
                          onPress={() => onSelectOption(item.dt)}>

                        <Label value={item.lbl} customStyle={{fontSize: item.bold ? 20 : 16}}/>
                        
                      </TouchableHighlight>
                    );
                  }}
              />
            </View>
          }
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
  color:'#000',
  marginBottom:20
});

const listOptionsStyle = StyleSheet.create({
  width: screenWidth,
  flexDirection: 'row',
  paddingHorizontal: 20,
  justifyContent:'space-between',
  marginTop:10
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

const bkg = StyleSheet.create({
  backgroundColor:'#f7f7f7',
  
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

export default HomeScreen;