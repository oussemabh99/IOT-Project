import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Card } from 'react-native-paper'; // Import if you're using react-native-paper

const SetImage = (props) => {
  let imageSource = require('../../../assets/state/no-data.png'); // Default image

  if (props.min != null && props.max != null && props.temp != null) {
    if (props.temp > props.min && props.temp < props.max) {
      imageSource = require('../../../assets/state/good.png');
    } else {
      imageSource = require('../../../assets/state/bad.png');
    }
  }

  return (
    <View >
      
        <Image source={imageSource}  />
      
    </View>
  );
};


export default SetImage;

  