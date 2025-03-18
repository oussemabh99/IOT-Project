import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBUuf2vYC6RJRBYZVXjqCEAgXG7t2oR7go",
  authDomain: "testapp-f4189.firebaseapp.com",
  databaseURL: "https://testapp-f4189-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "testapp-f4189",
  storageBucket: "testapp-f4189.firebasestorage.app",
  messagingSenderId: "213631782298",
  appId: "1:213631782298:web:83a6d6c4bcd5c059a8fe23",
  measurementId: "G-559CBLQ75C",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const main = () => {
  const [humidity, setHumidity] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [minHumidity, setMinHumidity] = useState('');
  const [maxHumidity, setMaxHumidity] = useState('');
  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');

  const fetchData = async () => {
    try {
      const dbRef = ref(database, 'data');
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
        const data = snapshot.val();

        const humidityData = data.humidité;
        const temperatureData = data.temperature;

        setHumidity(humidityData.value);
        setTemperature(temperatureData.value);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(() => {
      fetchData();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  const applyLimits = () => {
    Alert.alert("Limits Applied", `Humidity: ${minHumidity} - ${maxHumidity} %\nTemperature: ${minTemperature} - ${maxTemperature} °C`);
  };

  return (
    <View style={styles.container}>
      {/* Config Navigation Bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => Alert.alert("Settings", "Open settings")} style={styles.navButton}>
          <Text style={styles.navButtonText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.title}>Sensor Data</Text>
        {humidity !== null && temperature !== null ? (
          <>
            <Text style={styles.sensorText}>Humidity: {humidity} %</Text>
            <Text style={styles.sensorText}>Temperature: {temperature} °C</Text>
          </>
        ) : (
          <Text style={styles.loadingText}>Loading data...</Text>
        )}

        {/* Configuration Inputs */}
        <View style={styles.configSection}>
          <Text style={styles.configText}>Set Limits</Text>
          <Text style={styles.inputLabel}>Energy Range:</Text>
          <TextInput
            style={styles.input}
            placeholder="Min Energy"
            keyboardType="numeric"
            value={minTemperature}
            onChangeText={setMinTemperature}
          />
          <TextInput
            style={styles.input}
            placeholder="Max Energy"
            keyboardType="numeric"
            value={maxTemperature}
            onChangeText={setMaxTemperature}
          />

          <Button title="Apply Limits" onPress={applyLimits} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  navBar: {
    backgroundColor: '#007BFF',
    padding: 15,
    alignItems: 'center',
  },
  navButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  navButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  content: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sensorText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
  },
  configSection: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  configText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,
    marginVertical: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});

export default main;
