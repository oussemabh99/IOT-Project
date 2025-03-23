import React, { useState, useEffect } from "react";
import { database } from "./firebaseLogin";
import { ref, get } from "firebase/database";

const useDisplayConfig = () => {
  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');
  const [refresh, setRefresh] = useState('');

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const dbRef = ref(database, 'config');
        const snapshot = await get(dbRef);

        if (snapshot.exists()) {
          console.log("startAfter...data.");
          const data = snapshot.val();
          setMinTemperature(data.min);
          setMaxTemperature(data.max);
          setRefresh(data.refresh);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchConfig();
  }, []); 

  const conf = data;
  console.log(data);
  return conf;
};

export default useDisplayConfig;
