import { View, Text, StyleSheet, Button } from 'react-native';

const Selection = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Select your connection type:</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="LAN ACCESS"
          onPress={() => navigation.navigate('LAN')} 
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="WAN ACCESS"
          onPress={() => navigation.navigate('main')} // Navigate to WAN screen
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    marginBottom: 20,
    fontSize: 18,
  },
  buttonContainer: {
    marginBottom: 10,
    width: '80%',
  },
});

export default Selection;
