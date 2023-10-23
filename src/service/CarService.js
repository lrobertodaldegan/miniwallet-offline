import AsyncStorage from "@react-native-async-storage/async-storage";

const keyPrefix = '@car_';

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

  let carKeys = [];

  keys.map((k) => {
    if(k.startsWith(keyPrefix))
      carKeys.push(k);
  });
  
  if(carKeys && carKeys !== null && carKeys.length > 0){
    let billsMap = null;

    try{
      billsMap = await AsyncStorage.multiGet(carKeys);

      if(billsMap && billsMap != null && billsMap.length > 0){
        billsMap.map((bm) => {
          if(bm[0].startsWith(keyPrefix))
            bills.push(JSON.parse(bm[1]));
        });
      }
    } catch(e){
      console.log(e);
    }
  }

  return bills;
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
const CarService = {
  store: async (car) => {
    try{
      if(car && car !== null){
        let key = `${keyPrefix + car.id}`;

        await save(key, JSON.stringify(car));
      }
    } catch(e){
      console.log(e);
    }
  },

  get: async () => await getAll(),

  remove: async (car) => {
    if(car && car !== null){
      let key = `${keyPrefix + car.id}`;

      await del(key);
    }
  },
}

export default CarService;