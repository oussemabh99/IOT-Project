import React from 'react';
import { View, Text, StyleSheet, Image,Button } from 'react-native';
const ConnectionError = ({ route,navigation }) => {
    const {error}=route.params
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>Connection Error:{error}</Text>

      
      <Image 
        source={require('../../assets/connection.png')} 
        style={styles.image} 
      />

      <Button 
        title="Return" 
        onPress={() => navigation.navigate('Selection')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    marginBottom: 20,
  },
  image: {
    width: 200, // specify the width of the image
    height: 200, // specify the height of the image
    marginBottom: 20,
  },
});

export default ConnectionError;

