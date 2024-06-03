import React from 'react';
import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../components/Header/Header';
import TextField from '../../components/TextField/TextField.tsx';
import Margin from '../../components/Margin/Margin.tsx';
import Button from '../../components/Button/Button.tsx';

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Header withBack={true} title={'Inscription'} />
      <ScrollView contentContainerStyle={{paddingTop: 15}}>
        <View style={{marginBottom: 10, marginRight: 10, marginLeft: 10}}>
          <TextField label={'Prénom'} />
        </View>
        <View style={{marginBottom: 10, marginRight: 10, marginLeft: 10}}>
          <TextField label={'Nom'} />
        </View>
        <View style={{marginBottom: 10, marginRight: 10, marginLeft: 10}}>
          <TextField label={'E-mail'} />
        </View>
        <Margin style={{marginBottom: 10, marginRight: 10, marginLeft: 10}}>
          <TextField label={'Mot de passe'} />
        </Margin>
        <Margin>
          <Button>S'inscrire</Button>
        </Margin>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default RegisterScreen;
