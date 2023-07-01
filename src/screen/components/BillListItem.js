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

const IN = 'IN';
const OK = 'OK';
const PAGAR = 'PAGAR';

const BillListItem = ({bill, removable=false, onRemove=()=>null, onUpdateBillStatus=()=>null}) => {
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

  const loadIcon = () => {
    let yellow = {color:'#ffc25e'};
    let green = {color:'#06901E'};
    let lgreen = {color:'#91ff93'};

    let icon = <FontAwesomeIcon icon={faCircleCheck} size={25} style={yellow}/>;

    if(bill.type == IN){
      icon = <FontAwesomeIcon icon={faSackDollar} size={25} style={lgreen}/>;
    } else {
      if(statusLbl == OK)
        icon = <FontAwesomeIcon icon={faCircleCheck} size={25} style={green}/>;
    }

    return icon;
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

  return (
    <View>
      <View style={[listItemStyle, getBkgItemColor()]}>
        <View style={liLeftStyle}>
          <View style={liHeaderStyle}>
            <Legend value={`${bill.desc} - ${bill.cat}`} />

            <FontAwesomeIcon icon={bill.type == IN ? faArrowTrendUp : faArrowTrendDown} 
                size={12}
                style={[legendIcon, {color: bill.type == IN ? 'green' : 'orange'}]}
            />
          </View>

          <SubTitleLabel customStyle={{fontWeight:'bold'}} value={`R$ ${bill.value}`} />
        </View>

        <TouchableHighlight style={liRightStyle} 
            underlayColor='#e1fce8'
            onPress={() => updateBillStatus()}>

          {loadIcon()}
        </TouchableHighlight>
      </View>

      {loadRemoveOption()}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;

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

export default BillListItem;