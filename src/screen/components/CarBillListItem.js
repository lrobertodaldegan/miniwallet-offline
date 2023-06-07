import React from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import SubTitleLabel from './SubTitleLabel';
import Label from './Label';
import Legend from './Legend';
import CarBillService from "../../service/CarBillService";

const CarBillListItem = ({bill, removable, onRemove}) => {

  const remove = (bill) => {
    if(removable === true){
      CarBillService.remove(bill)
                  .then(() => onRemove(bill))
                  .catch(e => console.log(e));
    }
  }

  const loadRemoveOption = () => {
    if(removable === true){
      return (
        <TouchableHighlight style={removeBtnStyle} 
              underlayColor='#ddd'
              onPress={() => remove(bill)}>

          <Legend customStyle={{color:'red'}} value='Apagar' />
          
        </TouchableHighlight>
      );  
    }

    return <></>;
  }

  return (
    <View>
      <View style={listItemStyle}>
        <View style={liLeftStyle}>
          <View style={liHeaderStyle}>
            <Legend value={`${bill.date} - `} />
            <Legend value={bill.desc} />
          </View>

          <SubTitleLabel customStyle={{fontWeight:'bold'}} value={`R$ ${bill.value}`} />
        </View>

        <TouchableHighlight style={liRightStyle} 
            underlayColor='#ddd'>
          <Label value={bill.car} />
        </TouchableHighlight>
      </View>

      {loadRemoveOption()}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const listItemStyle = StyleSheet.create({
  flexDirection:'row',
  marginVertical: 5,
  marginHorizontal:10,
  paddingHorizontal: 30,
  paddingVertical: 20,
  borderRadius: 20,
  borderColor:'#efefef',
  backgroundColor: '#fafafa',
});

const liHeaderStyle = StyleSheet.create({
  flexDirection:'row',
  paddingLeft: 5
});

const liLeftStyle = StyleSheet.create({
  width: (screenWidth - 80) / 1.5,
});

const liRightStyle = StyleSheet.create({
  flexDirection:'row',
  justifyContent:'flex-end',
  alignItems: 'center',
  width: (screenWidth - 80) / 3
});

const removeBtnStyle = StyleSheet.create({
  alignItems: 'center',
  width: (screenWidth - 20),
  marginLeft:10,

});

export default CarBillListItem;