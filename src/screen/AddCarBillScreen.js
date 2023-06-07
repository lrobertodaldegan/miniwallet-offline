import React from "react";

import CarBillForm from "./components/form/CarBillForm";

const AddCarBillScreen = ({navigation}) => {
  return (<CarBillForm onSubmit={() => navigation.navigate('Garage')}/>);
}

export default AddCarBillScreen;