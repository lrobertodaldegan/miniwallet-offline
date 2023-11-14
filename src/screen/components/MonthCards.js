import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
} from 'react-native';
import Months from '../../service/Months';
import Card from './Card';
import Legend from './Legend';

const MonthCards = ({refMonth, action, style={}}) => {
  return (
    <>
      <View style={[styles.typeOptionsWrap, {paddingHorizontal:8.5}]}>
        <Card action={() => action(Months.names[1])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[1] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[1]} />
              </View>
            } 
        />

        <Card action={() => action(Months.names[2])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[2] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[2]} />
              </View>
            } 
        />

        <Card action={() => action(Months.names[3])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[3] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[3]} />
              </View>
            } 
        />

        <Card action={() => action(Months.names[4])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[4] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[4]} />
              </View>
            } 
        />
      </View>

      <View style={[styles.typeOptionsWrap, {paddingHorizontal:8.5}]}>
        <Card action={() => action(Months.names[5])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[5] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[5]} />
              </View>
            } 
        />

        <Card action={() => action(Months.names[6])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[6] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[6]} />
              </View>
            } 
        />

        <Card action={() => action(Months.names[7])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[7] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[7]} />
              </View>
            } 
        />

        <Card action={() => action(Months.names[8])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[8] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[8]} />
              </View>
            } 
        />
      </View>

      <View style={[styles.typeOptionsWrap, {paddingHorizontal:8.5}]}>
        <Card action={() => action(Months.names[9])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[9] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[9]} />
              </View>
            } 
        />

        <Card action={() => action(Months.names[10])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[10] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[10]} />
              </View>
            } 
        />

        <Card action={() => action(Months.names[11])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[11] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[11]} />
              </View>
            } 
        />

        <Card action={() => action(Months.names[12])}
            style={[
              styles.monthCard, 
              styles.card, 
              style,
              refMonth == Months.names[12] ? styles.cardSelected : {}
            ]}
            content={
              <View style={styles.cardLblWrap}>
                <Legend icon={null}customStyle={styles.cardLbl} value={Months.names[12]} />
              </View>
            } 
        />
      </View>
    </>
  );
};

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  typeOptionsWrap: {
    flexDirection:'row'
  },
  card:{marginVertical:5},
  cardError:{
    borderWidth:2,
    borderColor:'#d50000',
    backgroundColor:'#ffe6e6'
  },
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
    borderWidth:1,
    borderColor: '#000',
    backgroundColor:'#fafafa',
  },
  monthCard: {
    width:(screenWidth - 20) / 4.1,
    marginHorizontal:1.5,
  },
});

export default MonthCards;