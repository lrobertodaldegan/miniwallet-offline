import React, {useState} from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { faTrash, faCalendar, faGasPump, faTruckMonster, faScrewdriverWrench } from "@fortawesome/free-solid-svg-icons";
import SubTitleLabel from './SubTitleLabel';
import Label from './Label';
import Legend from './Legend';
import CarBillService from "../../service/CarBillService";

const CarBillListItem = ({bill, removable=false, onRemove}) => {
  const [showDetails, setShowDetails] = useState(false);

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
        <TouchableHighlight style={[removeBtnStyle]} 
              underlayColor='transparent'
              onPress={() => remove(bill)}>

          <Legend icon={faTrash} iconStyle={iconStyle} iconSize={10} 
              lblStyle={{color:'#d50000'}} value='Apagar' 
          />
          
        </TouchableHighlight>
      );  
    }

    return <></>;
  }

  const loadDetails = () => {
    if(showDetails){
      return (<Legend value={`Detalhes: ${bill.obs && bill.obs != null ? bill.obs : 'N/A'}`} 
                  icon={null} customStyle={detailsStyle}/>);
    }

    return <></>;
  }

  const loadDescIcon = () => {
    if('Combustível' == bill.desc)
      return faGasPump;

    if('Borracharia' == bill.desc)
      return faTruckMonster;

    return faScrewdriverWrench;
  }

  return (
    <View elevation={1}>
      <TouchableHighlight style={listItemStyle}
          underlayColor='transparent'
          onPress={() => setShowDetails(!showDetails)}>

        <>
          <View style={liLeftStyle}>
            <View style={liHeaderStyle}>
              <Legend icon={faCalendar} value={`${bill.date} - `} />
              <Legend icon={loadDescIcon()}value={bill.desc} />
            </View>

            <SubTitleLabel customStyle={{fontWeight:'bold'}} value={`R$ ${bill.value}`} />
          </View>

          <TouchableHighlight style={liRightStyle} 
              underlayColor='transparent'>
            <Label value={bill.car} />
          </TouchableHighlight>
        </>
      </TouchableHighlight>

      {loadDetails()}

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

const detailsStyle = StyleSheet.create({
  backgroundColor: '#fafafa',
  paddingHorizontal: 10,
  marginHorizontal:10,
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

export default CarBillListItem;