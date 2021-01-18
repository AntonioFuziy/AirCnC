import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';

import api from '../services/api';

import Team from '../assets/team.jpeg';

function SpotList({ tech, navigation }) {
  const [spots, setSpots] = useState([]);

  useEffect(() => {
    async function loadSpots() {
      const response = await api.get("/spots", {
        params: { tech }
      })
      setSpots(response.data);
    }
    loadSpots()
  }, [])

  function handleNavigate(id){
    navigation.navigate("Book", { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Empresas que utilizam<Text style={styles.tecnology}> {tech}</Text></Text>
      <FlatList
      style={styles.list}
      data={spots}
      keyExtractor={spot => spot._id}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url }}/>
          <Text style={styles.title}>{item.company}</Text>
          <Text style={styles.price}>{item.price ? `R$${item.price}/dia` : 'Gratuito'}</Text>
          <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
            <Text style={styles.buttonText}>Book</Text>
          </TouchableOpacity>
        </View>
      )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30
  },
  
  list: {
    paddingHorizontal: 20
  },

  listItem: {
    flex: 1,
    marginTop: 30,
    marginRight: 15
  },

  thumbnail: {
    width: 200,
    height: 120,
    resizeMode: 'cover',
    borderRadius: 2,
  },

  tecnology: {
    fontSize: 20,
    fontWeight: 'bold'
  },

  text: {
    fontSize: 20,
    color: '#444',
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  title: {
    color: '#444',
    marginTop: 10,
    fontWeight: 'bold'
  },

  company: {
    marginTop: 3,
    fontSize: 16,
    color: "#212121"
  },

  price: {
    marginTop: 10,
    fontSize: 15,
    color: "#444"
  },

  button: {
    height: 32,
    backgroundColor: "#f05a5b",
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    marginTop: 10
  },

  buttonText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default withNavigation(SpotList);