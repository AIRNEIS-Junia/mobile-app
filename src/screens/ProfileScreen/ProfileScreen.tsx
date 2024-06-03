import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import Header from '../../components/Header/Header.tsx';
import ProfileItem from './components/Item.tsx';
import Margin from '../../components/Margin/Margin.tsx';
import ProfileLogin from './components/Login.tsx';
import {Navigation} from '../../types/navigation.type.ts';

const ProfileScreen = ({navigation}: Navigation) => {
  return (
    <View style={styles.container}>
      <Header title={'Profil'} />
      <ScrollView contentContainerStyle={{paddingTop: 10}}>
        <Margin>
          <ProfileLogin navigation={navigation} />
          <ProfileItem>Mes commandes</ProfileItem>
          <ProfileItem>Mon carnet d'adresse</ProfileItem>
          <ProfileItem>Modifier mon profil</ProfileItem>
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

export default ProfileScreen;
