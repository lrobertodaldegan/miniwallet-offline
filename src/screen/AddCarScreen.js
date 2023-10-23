import React, {useEffect}from "react";
import {
  StatusBar,
} from 'react-native';
import { faWarehouse } from '@fortawesome/free-solid-svg-icons';
import { useIsFocused } from "@react-navigation/native";
import CarForm from "./components/form/CarForm";
import HeaderNavigator from "./components/HeaderNavigator";

const AddCarScreen = ({navigation}) => {
  const focus = useIsFocused();

  useEffect(() => {}, [focus]);

  return (
    <>
      <StatusBar backgroundColor='#f7f7f7'/>

      <HeaderNavigator icon={faWarehouse} 
                    navigation={navigation}
                    action={() => navigation.navigate('Garage')} />

      <CarForm onSubmit={() => navigation.navigate('Cars')}/>
    </>
  );
}

export default AddCarScreen;