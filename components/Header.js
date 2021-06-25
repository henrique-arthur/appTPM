import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';

export function Header( {texto} ) {
  const navigation = useNavigation();

  return (
      <View style={styles.header}>
          <TouchableOpacity onPress={ () => navigation.goBack()}>
            <Feather name="arrow-left" size={28} color="#f0f0f5"/>
          </TouchableOpacity>
        <Text style={styles.titulo}>{texto}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,

    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    width: '100%',

    paddingTop: Constants.statusBarHeight + 5,
    paddingLeft: 15,
    paddingBottom: 8

  },
  titulo : {
    color: '#F0F0F5',
    paddingLeft: 15,
    fontSize: 28,
    fontWeight: 'bold',
  }
});