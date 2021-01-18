import React, { useState } from 'react';

import { SafeAreaView, StyleSheet, TouchableOpacity, TextInput, Text, View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '../assets/logo.png';
import api from '../services/api';

export default function Book({ navigation }){
  const [date, setDate] = useState("");
  const id = navigation.getParam("id");

  async function handleSubmit(){
    const user_id = await AsyncStorage.getItem("user");

    await api.post(`/spots/${id}/bookings`,{
      date
    }, {
      headers: { user_id }
    });

    Alert.alert("Solicitação de reserva enviada.");

    navigation.navigate("List");
  }

  function handleCancel(){
    navigation.navigate("List");
  }

  return(
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.logo}/>
      <View style={styles.form}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="What day is better for you?"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={date}
          onChangeText={setDate}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.buttonBook}>
          <Text style={styles.buttonText}>Book</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel} style={styles.buttonCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30
  },

  label: {
    fontWeight: 'bold',
    fontSize: 18
  },

  logo:{
    marginBottom: 40,
    width: 150,
    height: 48
  },

  input: {
    marginTop: 20,
    height: 44,
    color: "#444",
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2
  },

  buttonBook: {
    marginTop: 30,
    height: 42,
    borderRadius: 2,
    backgroundColor: "#f05a5b",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonCancel: {
    marginTop: 30,
    height: 42,
    borderRadius: 2,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    fontWeight: "bold",
    color: "#fff"
  },

  cancelText: {
    fontWeight: "bold",
    color: "#000"
  }
})