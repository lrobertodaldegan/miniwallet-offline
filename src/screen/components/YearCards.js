import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import Card from './Card';
import Legend from './Legend';

const YearCards = ({refYear, action}) => {
  return (
    <View style={[styles.typeOptionsWrap, {paddingHorizontal:8}]}>
      <Card action={() => action(new Date().getFullYear() - 1)}
          style={[
            styles.yearCard, 
            styles.card, refYear == new Date().getFullYear() - 1 ? styles.cardSelected : {}
          ]}
          content={
            <View style={styles.cardLblWrap}>
              <Legend customStyle={styles.cardLbl} value={new Date().getFullYear() - 1} />
            </View>
          } 
      />

      <Card action={() => action(new Date().getFullYear())}
          style={[
            styles.yearCard, 
            styles.card, refYear == new Date().getFullYear() ? styles.cardSelected : {}
          ]}
          content={
            <View style={styles.cardLblWrap}>
              <Legend customStyle={styles.cardLbl} value={new Date().getFullYear()} />
            </View>
          } 
      />

      <Card action={() => action(new Date().getFullYear() + 1)}
          style={[
            styles.yearCard, 
            styles.card, refYear == new Date().getFullYear() + 1 ? styles.cardSelected : {}
          ]}
          content={
            <View style={styles.cardLblWrap}>
              <Legend customStyle={styles.cardLbl} value={new Date().getFullYear() + 1} />
            </View>
          } 
      />
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  typeOptionsWrap: {
    flexDirection:'row'
  },
  card:{marginVertical:5},
  cardLblWrap:{
    flexDirection:'row',
    justifyContent:'center'
  },
  cardLblIcon: {
    marginTop:2.5,
    marginRight: 5
  },
  cardLbl: {
    textAlign:'center'
  },
  cardSelected: {
    borderWidth:5,
    borderColor: '#9df79c',
  },
  yearCard: {
    width:(screenWidth - 20) / 3.1,
    marginHorizontal:2.5,
  },
});

export default YearCards;