import React, {useState, useEffect} from "react";
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

const BillsByMonthListItem = ({month,costs=0, balance=0, bills,onRemove=()=>null}) => {
  const [hide, setHide] = useState(true);
  const [itens, setItens] = useState([]);

  useEffect(() => {
    setItens(bills);
  }, []);

  const removeHandler = (bill) => {
    try{
      setItens(itens.splice(itens.indexOf(bill), 1));

      onRemove();
    }catch(e){
      console.log(e);
    }
  }

  const loadContent = () => {
    let header = (
      <View style={{backgroundColor:'#f7f7f7'}}>
        <TouchableHighlight underlayColor='transparent' 
            style={monthsStyle}
            onPress={() => setHide(!hide)}>

          <View style={monthsLblStyle}>
            <SubTitleLabel customStyle={btnLblStyle} 
                value={`${month}`}/>
            
            <Legend icon={null} 
                value={month === 'Fixa' ? `Gastos: R$ ${costs.toFixed(2)}` : `Gastos: R$ ${costs.toFixed(2)}\nSaldo: R$ ${balance.toFixed(2)}`}/>
          </View>
        </TouchableHighlight>

        {hide ? <Hr /> : <></>}
      </View>
    );

    if(hide)
      return header;

    return (
      <View style={{backgroundColor:'#f7f7f7'}}>
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
      </View>
    );
  }

  return loadContent();
}

const monthsStyle = StyleSheet.create({
  paddingVertical: 20,
  marginHorizontal: 10,
});

const btnLblStyle = StyleSheet.create({
  color:'#000',
  fontWeight:'normal',
});

const monthsLblStyle = StyleSheet.create({
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems:'center'
});

export default BillsByMonthListItem;