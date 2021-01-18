import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, TouchableOpacity, Platform, StyleSheet, Text, Image, TextInput } from 'react-native';

import Logo from '../assets/logo.png';

import api from '../services/api';

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  // useEffect(() => {
  //   AsyncStorage.getItem("user").then(user => {
  //     if(user){
  //       navigation.navigate("List");
  //     }
  //   })
  // }, []);

  async function handleSubmit() {
    const response = await api.post("/sessions", {
      email
    })
    
    const { _id } = response.data;

    await AsyncStorage.setItem("user", _id);
    await AsyncStorage.setItem("techs", techs);

    navigation.navigate("List");
  }

  return (
    <KeyboardAvoidingView enabled={Platform.OS === 'ios' || Platform.OS === 'android'}
    behavior="padding" style={styles.container}>
      <Image source={Logo} style={styles.logo}/>

      <View style={styles.form}>
        <Text style={styles.text}>Your E-MAIL</Text>
        <TextInput 
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.text}>Tecnologias</Text>
        <TextInput 
          style={styles.input}
          placeholder="Tecnologies that you are interested"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
          
        />
        
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  logo:{
    width: 150,
    height: 48
  },

  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },

  text: {
    marginBottom: 20,
    fontWeight: 'bold',
    color: "#444",
    marginBottom: 8
  },

  button: {
    marginTop: 30,
    height: 42,
    borderRadius: 2,
    backgroundColor: "#f05a5b",
    alignItems: "center",
    justifyContent: "center"
  },

  buttonText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 16
  },

  input: {
    height: 44,
    color: "#444",
    marginBottom: 20,
    paddingHorizontal: 20,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 2
  }
})