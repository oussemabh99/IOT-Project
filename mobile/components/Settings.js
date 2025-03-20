import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View,TextInput,TouchableOpacity} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const Settings = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [humidity, setHumidity] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [minHumidity, setMinHumidity] = useState('');
  const [maxHumidity, setMaxHumidity] = useState('');
  const [minTemperature, setMinTemperature] = useState('');
  const [maxTemperature, setMaxTemperature] = useState('');
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
          <Text style={styles.configText}>Set Temperature Range</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Min Temp</Text>
            <TextInput
              style={styles.input}
              placeholder="Min Temperature"
              keyboardType="numeric"
              value={minTemperature}
              onChangeText={setMinTemperature}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Max Temp</Text>
            <TextInput
              style={styles.input}
              placeholder="Max Temperature"
              keyboardType="numeric"
              value={maxTemperature}
              onChangeText={setMaxTemperature}
            />
          </View>

          <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(!modalVisible)}>
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