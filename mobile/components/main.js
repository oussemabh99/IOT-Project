import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from './firebaseLogin';
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

  const getConfig = async () => {
    try {
      const dbRef = ref(database, 'config');
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        setMinTemperature(data.min);
        setMaxTemperature(data.max);
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getConfig();
    const intervalId = setInterval(() => {
      getConfig();
      console.log(minTemperature);
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

  useEffect(() => {
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, 10000); // Fetch data every 10 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, []);

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

      {/* Image is pushed below the data */}
      <View style={styles.imageContainer}>
        <Image source={require('../assets/icon.png')} style={styles.image} />
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
  content: {
    padding: 20,
    flex: 1,
    marginTop: 20, // Push content to the top with marginTop
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center', // Center the title
  },
  sensorText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
    textAlign: 'center', // Center the sensor text
  },
  loadingText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center', // Center the loading text
  },
  imageContainer: {
    justifyContent: 'center', // Center the image vertically
    alignItems: 'center', // Center the image horizontally
    marginTop: 20, // Add space between the sensor data and the image
  },
  image: {
    width: 150,  // Set the desired width
    height: 150, // Set the desired height
    resizeMode: 'contain', // Ensures the image scales properly
  },
});

export default main;
