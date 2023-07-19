import React from 'react';

import {
  Text,
  View,
  StyleSheet,
  Dimensions
} from 'react-native';

import Card from './Card';

const BalanceCards = ({balance=0, totalBills=0}) => {

  const balanceColor = balance > 0 ? '#9df79c' : '#ffeed1';
  const balanceFontColor = balance > 0 ? '#035c00' : '#f29c0f';

  return (
    <View style={cardWrapperStyle}>
      <Card style={{backgroundColor:'#ffeed1'}} content={(
          <View>
            <Text style={[balanceStyle, {color:'#f29c0f'}]}>
              {`R$ ${totalBills}`}
            </Text>

            <Text style={[balanceTitleStyle, {color:'#f29c0f'}]}>Gastos totais</Text>
          </View>
        )}
      />

      <Card style={{backgroundColor:balanceColor}} content={(
          <View>
            <Text style={[balanceStyle, {color: balanceFontColor}]}>
              {`R$ ${balance}`}
            </Text>

            <Text style={[balanceTitleStyle, {color:balanceFontColor}]}>Saldo total</Text>
          </View>
        )}
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const cardWrapperStyle = StyleSheet.create({
  display:'flex',
  flexDirection:'row',
  flexWrap: "wrap",
  justifyContent:'center',
  alignItens: 'center',
  fontFamily: 'Montserrat-Regular',
});

const balanceStyle = StyleSheet.create({
  fontSize: 24,
  padding: 10,
  textAlign:'center',
  color:'#555',
  fontFamily: 'Montserrat-Bold',
});

const balanceTitleStyle = StyleSheet.create({
  fontSize: 14,
  padding: 10,
  textAlign:'center',
  color:'#555',
  fontFamily: 'Montserrat-Regular',
});

export default BalanceCards;