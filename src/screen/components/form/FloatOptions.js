import React, {useState} from 'react';

import {
  ScrollView,
  View,
  TouchableHighlight,
  StyleSheet,
  Dimensions
} from 'react-native';

import Label from '../Label';

const FloatOptions = ({label, options, onSelect}) => {
  const [showOptions, setShowOptions] = useState(false);
  
  const handleSelection = (selectedOption) => {
    setShowOptions(false);

    onSelect(selectedOption);
  }

  const loadOptions = () => {
    return !showOptions 
            ? <></>
            : (
                <ScrollView style={optionsWrapStyle}>
                  {options.map(o => {
                    return (
                      <TouchableHighlight key={o} underlayColor='#fff'
                          onPress={() => handleSelection(o)}>
                        <Label value={o}/>
                      </TouchableHighlight>
                    );
                  })}
                </ScrollView>
              );
  }

  return (
    <View>
      <TouchableHighlight underlayColor='#fff'
          onPress={() => setShowOptions(true)}
      >
          <Label customStyle={{color:'#888'}} value={label}/>
      </TouchableHighlight>

      {loadOptions()}
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const optionsWrapStyle = StyleSheet.create({
  left: 0,
  bottom: 0,
  paddingVertical: 20,
  position:'absolute',
  width: screenWidth,
  backgroundColor: '#eee',
  maxHeight: screenHeight / 4
});

export default FloatOptions;