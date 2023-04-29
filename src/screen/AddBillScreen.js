import React from "react";

import BillForm from "./components/form/BillForm";
import FixBillForm from "./components/form/FixBillForm";

const AddBillScreen = ({navigation}) => {
  return (
    <>
      <BillForm onSubmit={() => navigation.navigate('Home')}/>

      <FixBillForm onSubmit={() => navigation.navigate('Home')}/>
    </>
  );
}

export default AddBillScreen;