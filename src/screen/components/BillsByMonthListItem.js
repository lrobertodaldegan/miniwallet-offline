import React, {useState} from "react";

import {
  View,
  StyleSheet,
  TouchableHighlight,
  FlatList,
} from 'react-native';

import SubTitleLabel from './SubTitleLabel';
import Legend from './Legend';
import BillListItem from "./BillListItem";
import Hr from "./Hr";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const BillsByMonthListItem = ({month, balance=0, bills}) => {
  const [hide, setHide] = useState(true);

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

  const loadContent = () => {
    let header = (
      <>
        <TouchableHighlight underlayColor='#e1fce8' 
            style={monthsStyle}
            onPress={() => setHide(!hide)}>

          <View style={monthsLblStyle}>
            <SubTitleLabel customStyle={btnLblStyle} 
                value={`${month}`}/>
            
            <Legend customStyle={{color:'#555'}} 
                value={` (Saldo: R$ ${balance})`}/>
          </View>
        </TouchableHighlight>

        {hide ? <Hr /> : <></>}
      </>
    );

    if(hide)
      return header;

    return (
      <>
        {header}

        <FlatList
            data={bills}
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
      </>
    );
  }

  return loadContent();
}

const monthsStyle = StyleSheet.create({
  paddingVertical: 20,
  marginHorizontal: 10,
});

const btnLblStyle = StyleSheet.create({
  color:'#555',
  fontWeight:'normal',
});

const monthsLblStyle = StyleSheet.create({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems:'center'
});

export default BillsByMonthListItem;