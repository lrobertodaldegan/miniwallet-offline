import React, {useEffect}from "react";
import {
  StatusBar,
} from 'react-native';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from "@react-navigation/native";
import CarBillForm from "./components/form/CarBillForm";
import HeaderNavigator from "./components/HeaderNavigator";

const AddCarBillScreen = ({navigation}) => {
  const focus = useIsFocused();

  useEffect(() => {}, [focus]);

  return (
    <>
      <StatusBar backgroundColor='#f7f7f7'/>

      <HeaderNavigator icon={faWarehouse} 
                    navigation={navigation}
                    action={() => navigation.navigate('Garage')} />

      <CarBillForm onSubmit={() => navigation.navigate('Garage')}/>
    </>
  );
}

export default AddCarBillScreen;