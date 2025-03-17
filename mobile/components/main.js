import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
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

  const fetchData = async () => {
    try {
      const dbRef = ref(database, 'data'); // Reference to your data path in Firebase
      const snapshot = await get(dbRef); // Retrieve data from Firebase

      if (snapshot.exists()) {
        const data = snapshot.val();

        // Extracting the humidity and temperature values from the data
        const humidityData = data.humidité;
        const temperatureData = data.temperature;

        // Display the extracted data
        setHumidity(humidityData.value);  // Assigning humidity value
        setTemperature(temperatureData.value);  // Assigning temperature value
      } else {
        console.log('No data available');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data once when the component is mounted

    const intervalId = setInterval(() => {
      fetchData(); // Fetch data every 10 seconds
    }, 10000); // 10 seconds interval

    return () => clearInterval(intervalId); // Clean up the interval when the component is unmounted
  }, []);

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Sensor Data:</Text>
      {humidity !== null && temperature !== null ? (
        <>
          <Text>Humidity: {humidity} %</Text>
          <Text>Temperature: {temperature} °C</Text>
        </>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
};

export default main;
