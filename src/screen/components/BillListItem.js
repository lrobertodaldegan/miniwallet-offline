import React, {useState, useEffect} from "react";

import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';

import SubTitleLabel from './SubTitleLabel';
import Label from './Label';
import Legend from './Legend';
import BillService from "../../service/BillService";

const IN = 'IN';
const OK = 'OK';
const PAGAR = 'PAGAR';

const BillListItem = ({bill, removable, onRemove}) => {
  const [statusLbl, setStatusLbl] = useState(null);

  useEffect(() => {
    BillService.getStatus(bill.id, bill.refMonth, bill.refYear)
                .then((sts) => setStatusLbl(sts))
                .catch((e) => console.log(e));
  }, []);

  const updateBillStatus = () => {
    if(bill.type != IN){
      if(statusLbl == PAGAR){
        setStatusLbl(OK);

        BillService.payAntecipate(bill.id, bill.refMonth, bill.refYear)
                    .catch((e) => console.log(e));
      } else {
        setStatusLbl(PAGAR);

        BillService.unpayAntecipate(bill.id, bill.refMonth, bill.refYear)
                    .catch((e) => console.log(e));
      }
    }
  }

  const remove = (bill) => {
    if(removable === true){
      BillService.remove(bill)
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
            <Legend value={`${bill.desc} - `} />
            <Legend value={bill.cat} />
          </View>

          <SubTitleLabel customStyle={{fontWeight:'bold'}} value={`R$ ${bill.value}`} />
        </View>

        <TouchableHighlight style={liRightStyle} 
            underlayColor='#ddd'
            onPress={() => updateBillStatus()}>
          <Label value={bill.type == IN ? 'ENTRADA' : statusLbl} />
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

export default BillListItem;