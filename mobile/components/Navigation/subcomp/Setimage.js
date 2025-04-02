import { React, useState, useEffect } from 'react';
import { View, Image } from 'react-native';
import { hautTemp } from '../../notifications/api-send';

const SetImage = (props) => {
  const [actual_status, setStatus] = useState(true);
  const [imageSource, setImageSource] = useState(require('../../../assets/state/no-data.png'));

  useEffect(() => {
    if (props.min != null && props.max != null && props.temp != null) {
      if (props.temp > props.min && props.temp < props.max) {
        setImageSource(require('../../../assets/state/good.png'));
        setStatus(true);
      } else {
        setImageSource(require('../../../assets/state/bad.png'));
        setStatus(false);
      }
    }
  }, [props.temp, props.min, props.max]);

  useEffect(() => {
    if (!actual_status) {
      hautTemp();
    }
  }, [actual_status]);

  return (
    <View>
      <Image source={imageSource} />
    </View>
  );
};

export default SetImage;

  