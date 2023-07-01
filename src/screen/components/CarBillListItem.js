import React from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";

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
        <TouchableHighlight style={[removeBtnStyle, {backgroundColor:'#ff1717'}]} 
              underlayColor='#e1fce8'
              onPress={() => remove(bill)}>

          <View style={{flexDirection:'row'}}>
            <FontAwesomeIcon icon={faTrash} size={10} style={iconStyle}/>
            <Legend customStyle={{color:'#e8faed'}} value='Apagar' />
          </View>
          
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
            underlayColor='#e1fce8'>
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
  marginTop: 5,
  marginBottom: 1,
  marginHorizontal:10,
  paddingHorizontal: 30,
  paddingVertical: 20,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
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
  borderColor:'#efefef',
  backgroundColor: '#fafafa',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  marginBottom:5,
});

const iconStyle = StyleSheet.create({
  color:'#e8faed',
  marginTop:5, 
  marginRight:5,
});

export default CarBillListItem;