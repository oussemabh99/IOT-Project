import { View, Text, StyleSheet, Button } from 'react-native';
import  { usePushNotifications }  from '../notifications/expo-notif';
import { StatusBar } from "expo-status-bar";
import { hautTemp } from '../notifications/api-send';
const Selection = ({ navigation }) => {
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  console.log (`Token: ${expoPushToken?.data} ??`)
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
      <View >
     
      <StatusBar style="auto" />
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
