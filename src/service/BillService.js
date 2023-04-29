import AsyncStorage from "@react-native-async-storage/async-storage";

const FIXA = 'Fixa';

const BillStatus = {
  OK: 'OK',
  PAGAR: 'PAGAR'
}

const keyPrefix = '@bill_';
const fixKeyPrefix = '@fixbill_';
const paymentKeyPrefix = '@paymentbill_';

const getAllKeys = async () => {
  let keys = []

  try {
    keys = await AsyncStorage.getAllKeys()
  } catch(e) {
    console.log(e);
  }

  return keys;
}

const getAll = async () => {
  let keys = await getAllKeys();
    
  let bills = [];
  
  if(keys && keys !== null && keys.length > 0){
    let billsMap = null;

    try{
      billsMap = await AsyncStorage.multiGet(keys);

      if(billsMap && billsMap != null && billsMap.length > 0){

        billsMap.map((bm) => {
          if(!bm[0].startsWith(paymentKeyPrefix)){
            bills.push(JSON.parse(bm[1]));
          }
        });
      }
    } catch(e){
      console.log(e);
    }
  }

  return bills;
}

const getPaymentStatus = async (billId, month, fullYear) => {
  try{
    let billStat = await AsyncStorage
                      .getItem(`${paymentKeyPrefix + month}_${fullYear}_${billId}`);

    return billStat && billStat != null ? BillStatus.OK : BillStatus.PAGAR;
  } catch(e){
    console.log(e);
  }
}

const save = async (key, value) => {
  try{
    await AsyncStorage.setItem(key, value);
  } catch(e){
    console.log(e);
  }
}

const del = async (key) => {
  try{
    await AsyncStorage.removeItem(key);
  } catch(e){
    console.log(e);
  }
}
/* *** */
const BillService = {
  store: async (bill) => {
    try{
      if(bill && bill !== null){
        let key = `${keyPrefix + bill.id}`;

        if(bill.cat == FIXA)
          key = `${fixKeyPrefix + bill.id}`;

        await save(key, JSON.stringify(bill));
      }
    } catch(e){
      console.log(e);
    }
  },

  get: async () => await getAll(),

  getStatus: async (billId, month, year) => await getPaymentStatus(billId, month, year),

  getByMonthAndYear: async (month, year) => {
    let bills = await getAll();

    return bills.filter(b => b.cat == FIXA || (year == b.refYear && month == b.refMonth));
  },

  pay: async (billId) => {
    let d = new Date();

    let key = `${paymentKeyPrefix + d.getMonth()}_${d.getFullYear()}_${billId}`;

    return await save(key, BillStatus.OK);
  },

  payAntecipate: async (billId, month, fullyear) => {
    let key = `${paymentKeyPrefix + month}_${fullyear}_${billId}`;

    return await save(key, BillStatus.OK);
  },

  unpayAntecipate: async (billId, month, fullyear) => {
    let key = `${paymentKeyPrefix + month}_${fullyear}_${billId}`;

    await del(key);
  },

  unPay: async (billId) => {
    let d = new Date();

    await del(`${paymentKeyPrefix + d.getMonth()}_${d.getYear()}_${billId}`);
  },

  remove: async (bill) => {
    if(bill && bill !== null){
      let key = `${keyPrefix + bill.id}`;

      if(bill.cat == FIXA)
        key = `${fixKeyPrefix + bill.id}`;

      await del(key);
    }
  },
}

export default BillService;