import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

const BalanceCards = ({balance, totalBills}) => {
  return (
    <View style={cardWrapperStyle}>
      <View style={cardStyle}>
        <Text style={balanceStyle}>
          Gastos totais
        </Text>
        <Text style={[balanceStyle, {fontWeight:'bold', color: 'red'}]}>
          {`R$ ${totalBills && totalBills !== null ? totalBills : 0}`}
        </Text>
      </View>

      <View style={cardStyle}>
        <Text style={balanceStyle}>
          Saldo
        </Text>
        <Text style={[balanceStyle, {fontWeight:'bold', color: balance && balance !== null && balance > 0 ? 'green' : 'red'}]}>
          {`R$ ${balance && balance !== null ? balance : 0}`}
        </Text>
      </View>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const cardWrapperStyle = StyleSheet.create({
  display:'flex',
  flexDirection:'row',
  flexWrap: "wrap",
  justifyContent:'center',
  alignItens: 'center'
});

const cardStyle = StyleSheet.create({
  width: (screenWidth / 2) - 20,
  borderWidth:1,
  borderColor:'#efefef',
  borderRadius:10,
  fontSize: 26,
  paddingVertical: 20,
  marginHorizontal: 10,
  marginVertical: 20,
  color: '#555',
  justifyContent:'center',
  alignItens: 'center',
  backgroundColor:'#fafafa'
});

const balanceStyle = StyleSheet.create({
  fontSize: 20,
  padding: 10,
  textAlign:'justify',
  color:'#555',
});

export default BalanceCards;