import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {APP_COLOR} from '../../../constants/color.ts';
import {Navigation} from '../../../types/navigation.type.ts';

const ProfileLogin = ({navigation}: Navigation) => {
  return (
    <View style={styles.view}>
      <Text style={{marginBottom: 5, fontSize: 15}}>
        Pour utiliser toutes les fonctions :
      </Text>
      <View style={styles.optionView}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Login');
          }}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>
        <View style={{marginHorizontal: 5}}>
          <Text>/</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Register');
          }}>
          <Text style={styles.buttonText}>Inscription</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    color: APP_COLOR.primary,
    fontWeight: 'bold',
  },
});

export default ProfileLogin;
