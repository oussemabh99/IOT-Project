import React, {useState,useEffect} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,TextInput,TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import { ref, get,update } from 'firebase/database';
import { database } from '../../firebaseTools/firebaseLogin';




const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');
  async function updateFirebase(tempmin, tempmax) {
    if (tempmin > tempmax) {
      console.log("min must be < max");
    } else {
      const dbRef = ref(database, 'config');
  
      try {
        
        await update(dbRef, {
          min: tempmin,
          max: tempmax
        });
  
        console.log("Update successful");
  
        
        setModalVisible(!modalVisible);
      } catch (error) {
        console.log("Error updating database: ", error);
      }
    }
  }
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
    const intervalId =  () => {
      getConfig();
      console.log(minTemperature);
    }
  }, []);
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.configSection}>
          <Text style={styles.configText}>Set Energy Range</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Min Energy</Text>
            <TextInput
              style={styles.input}
              placeholder={minTemperature}
              keyboardType="numeric"
              value={minTemperature}
              onChangeText={setMinTemperature}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Max Energy</Text>
            <TextInput
              style={styles.input}
              placeholder={maxTemperature}
              keyboardType="numeric"
              value={maxTemperature}
              onChangeText={setMaxTemperature}
            />
          </View>

          <TouchableOpacity style={styles.applyButton} onPress={()=>updateFirebase(minTemperature, maxTemperature)}>
            <Text style={styles.applyButtonText}>Apply Limits</Text>
          </TouchableOpacity>
        </View>
        </Modal>
        <Pressable
          style={[styles.navButton, styles.navButton]}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.navButtonText}>Settings</Text>
        </Pressable>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  navButton: {
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#fff', 
    margin: 10,
  },
  navButtonText: {
    fontSize: 16,
    color: '#007BFF', 
    textAlign: 'center',
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

export default Settings;