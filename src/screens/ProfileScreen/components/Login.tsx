import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {APP_COLOR} from '../../../constants/color.ts';
import {Navigation} from '../../../types/navigation.type.ts';
import {useUserProvider} from '../../../contexts/UserContext.tsx';

const ProfileLogin = ({navigation}: Navigation) => {
  const {user} = useUserProvider();

  if (user?.firstName != null) {
    return (
      <View
        style={{
          marginBottom: 15,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 16}}>
          Bonjour <Text style={{fontWeight: 'bold'}}>{user?.firstName}</Text>
        </Text>
      </View>
    );
  }

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
