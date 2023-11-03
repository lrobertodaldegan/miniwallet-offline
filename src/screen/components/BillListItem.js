import React, {useState, useEffect} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
  faCircleCheck, 
  faSackDollar, 
  faTrash, 
  faArrowTrendDown, 
  faArrowTrendUp } from "@fortawesome/free-solid-svg-icons";
import SubTitleLabel from './SubTitleLabel';
import Legend from './Legend';
import BillService from "../../service/BillService";
import Months from "../../service/Months";

const IN = 'IN';
const OK = 'OK';
const PAGAR = 'PAGAR';

const BillListItem = ({
    bill, 
    refMonth=Months.names[(new Date()).getMonth() + 1],
    refYear=(new Date()).getFullYear(),
    removable=false, 
    onRemove=()=>null, 
    onUpdateBillStatus=()=>null}) => {

  const [statusLbl, setStatusLbl] = useState(null);

  const init = () => {
    let m = !bill.refMonth || bill.refMonth == null ? refMonth : bill.refMonth;
    let y = !bill.refYear || bill.refYear == null ? refYear : bill.refYear;

    BillService.getStatus(bill.id, m, y)
                .then((sts) => setStatusLbl(sts))
                .catch((e) => console.log(e));
  }

  const updateBillStatus = () => {
    if(bill.type != IN){

      let m = !bill.refMonth || bill.refMonth == null ? refMonth : bill.refMonth;
      let y = !bill.refYear || bill.refYear == null ? refYear : bill.refYear;

      if(statusLbl == PAGAR){
        setStatusLbl(OK);

        BillService.payAntecipate(bill.id, m, y)
                    .catch((e) => console.log(e));
      } else {
        setStatusLbl(PAGAR);

        BillService.unpayAntecipate(bill.id, m, y)
                    .catch((e) => console.log(e));
      }

      onUpdateBillStatus();
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
        <TouchableHighlight style={[removeBtnStyle]} 
              underlayColor='transparent'
              onPress={() => remove(bill)}>

          <View style={{flexDirection:'row'}}>
            <Legend icon={faTrash} iconStyle={iconStyle} lblStyle={{color:'#d50000'}} value='Apagar' />
          </View>
          
        </TouchableHighlight>
      );  
    }

    return <></>;
  }

  const loadIcon = () => {
    let margin = {marginBottom:5};
    let yellow = {color:'#ffc25e'};
    let green = {color:'#06901E'};
    let lgreen = {color:'#91ff93'};
    let black = {...margin, color:'#000'};
    let gray = {...margin, color:'#ccc'};

    let icon = <FontAwesomeIcon icon={faCircleCheck} size={25} style={gray}/>;
    let iconLgnd = 'Pagar'; 

    if(bill.type == IN){
      icon = <FontAwesomeIcon icon={faSackDollar} size={25} style={black}/>;
      iconLgnd = 'Recebido!'; 
    } else {
      if(statusLbl == OK){
        icon = <FontAwesomeIcon icon={faCircleCheck} size={25} style={black}/>;
        iconLgnd = 'Pago!'; 
      }
    }

    return (
      <View style={iconWrap}>
        {icon}

        <Legend icon={null} value={iconLgnd}/>
      </View>
    );
  }

  const getBkgItemColor = () => {
    let yellow = {backgroundColor:'#ffeed1'};
    let green = {backgroundColor:'#c4ffcf'};
    let lgreen = {backgroundColor:'#d6ffd7'};

    if(bill.type == IN){
      return lgreen;
    } else {
      if(statusLbl == OK)
        return green;
    }

    return yellow;
  }

  init();

  return (
    <View>
      <View style={[listItemStyle]} elevation={1}>
        <View style={liLeftStyle}>
          <View style={liHeaderStyle}>
            <Legend icon={null} value={`${bill.desc} - ${bill.cat}`} />

            <FontAwesomeIcon icon={bill.type == IN ? faArrowTrendUp : faArrowTrendDown} 
                size={12}
                style={[legendIcon, {color: bill.type == IN ? '#000' : '#d50000'}]}
            />
          </View>

          <SubTitleLabel value={`R$ ${bill.value}`} />
        </View>

        <TouchableHighlight style={liRightStyle} 
            underlayColor='transparent'
            onPress={() => updateBillStatus()}>

          {loadIcon()}
        </TouchableHighlight>
      </View>

      {loadRemoveOption()}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

const iconWrap = StyleSheet.create({
  alignItems:'center',
  marginTop:10,
  width:screenWidth * 0.15,
});

const legendIcon = StyleSheet.create({
  marginTop:2.5,
  marginLeft: 5
});
const listItemStyle = StyleSheet.create({
  flexDirection:'row',
  marginTop: 5,
  marginBottom: 1,
  marginHorizontal:10,
  paddingHorizontal: 30,
  paddingVertical: 20,
  borderRadius:10,
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
  backgroundColor: '#f7f7f7',
  borderBottomLeftRadius: 10,
  borderBottomRightRadius: 10,
  marginBottom:5,
});

const iconStyle = StyleSheet.create({
  color:'#d50000',
  marginTop:2.5, 
  marginRight:2,
});

export default BillListItem;