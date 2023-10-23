import React, {useState} from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { faTrash, faCalendar, faGasPump, faTruckMonster, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import SubTitleLabel from './SubTitleLabel';
import Legend from './Legend';
import CarService from "../../service/CarService";

const CarListItem = ({car, removable=false, onRemove}) => {
  const remove = (car) => {
    if(removable === true){
      CarService.remove(car)
                  .then(() => onRemove(car))
                  .catch(e => console.log(e));
    }
  }

  const loadRemoveOption = () => {
    if(removable === true){
      return (
        <TouchableHighlight style={[removeBtnStyle]} 
              underlayColor='transparent'
              onPress={() => remove(car)}>

          <Legend icon={faTrash} iconStyle={iconStyle} iconSize={10} 
              lblStyle={{color:'#d50000'}} value='Apagar' 
          />
          
        </TouchableHighlight>
      );  
    }

    return <></>;
  }

  return (
    <View elevation={1}>
      <View style={listItemStyle}>
        <SubTitleLabel value={car.id} />
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
  paddingHorizontal: 10,
  paddingVertical: 20,
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  borderColor:'#efefef',
  backgroundColor: '#fafafa',
});

const removeBtnStyle = StyleSheet.create({
  alignItems: 'center',
  width: (screenWidth - 20),
  marginLeft:10,
  backgroundColor: '#fafafa',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  marginBottom:5,
});

const iconStyle = StyleSheet.create({
  color:'#d50000',
  marginTop:4, 
  marginRight:2,
});

export default CarListItem;