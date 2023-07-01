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
      <StatusBar backgroundColor='#06901E'/>

      <HeaderNavigator icon={faWarehouse} 
                    navigation={navigation}
                    action={() => navigation.navigate('Home')} />

      <CarBillForm onSubmit={() => navigation.navigate('Garage')}/>
    </>
  );
}

export default AddCarBillScreen;