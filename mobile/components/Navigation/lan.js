import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import  { usePushNotifications }  from '../notifications/expo-notif';
import { send_key } from '../notifications/api-send';

export default function LAN({ navigation }) {
  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);
  const key = 'ExponentPushToken[9QwYAoAcByS592GM6iB_VA]'
  const [text, onChangeText] = useState('');
  const handleSubmit = async () => {
    if (text) {
      try {
        const x = await send_key(key, text);
        console.log("send_key result:", x);
  
        if (x === true) {
          navigation.navigate('Selection');
        } else {
          alert("Invalid key or response from server.");
        }
      } catch (error) {
        console.error("Error sending key:", error);
        alert("Something went wrong.");
      }
    } else {
      alert('Please enter the web server URL');
    }
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Enter WEB Server URL</Text>
          <TextInput
            style={[styles.input, text ? styles.inputFocused : null]}
            onChangeText={onChangeText}
            value={text}
            placeholder="WEB Server URL"
            placeholderTextColor="#B0B0B0"
            keyboardType="url"
          />
          


          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  content: {
    width: '90%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#007BFF',
    borderWidth: 2,
    borderRadius: 12,
    paddingLeft: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    color: '#333',
    marginBottom: 20,
  },
  inputFocused: {
    borderColor: '#0056b3',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});