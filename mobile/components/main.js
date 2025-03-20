import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, SafeAreaView } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from "./firebaseLogin" 
import Settings from './Settings';

const main = () => {
  const [temperature, setTemperature] = useState(null);
  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');

  const fetchData = async () => {
    try {
      const dbRef = ref(database, 'data');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const temperatureData = data.temperature;
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
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  const applyLimits = () => {
    if (minTemperature && maxTemperature) {
      Alert.alert("Limits Applied", `Temperature: ${minTemperature} °C - ${maxTemperature} °C`);
    } else {
      Alert.alert("Please enter both temperature values.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.navBar}>
        <Settings />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Sensor Data</Text>

        {temperature !== null ? (
          <Text style={styles.sensorText}>Temperature: {temperature} °C</Text>
        ) : (
          <Text style={styles.loadingText}>Loading data...</Text>
        )}

        
      </View>
    </SafeAreaView>
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
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
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
  applyButton: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default main;
