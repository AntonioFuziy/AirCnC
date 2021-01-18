import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View, Image, SafeAreaView, ScrollView, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import socketio from 'socket.io-client';

import Logo from '../assets/logo.png';
import SpotList from '../components/SpotList';

export default function List(){
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("user").then(user_id => {
      const socket = socketio("http://192.168.100.5:3333", {
        query: { user_id }
      });

      socket.on("booking_response", booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'Aprovada' : 'Rejeitada'}`);
      });
    });
  }, [])

  useEffect(() => {
    AsyncStorage.getItem("techs").then(storageTechs => {
      const techsArray = storageTechs.split(",").map(tech => tech.trim());

      setTechs(techsArray);
    });
  }, [])
  
  return (
    <SafeAreaView style={styles.container}>
      <Image source={Logo} style={styles.logo}/>
      <ScrollView style={styles.ScrollView}>
        {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
      </ScrollView>
    </SafeAreaView>  
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  scrollView: {
    marginTop: 20
  },

  logo: {
    width: 150,
    height: 48
  }
})