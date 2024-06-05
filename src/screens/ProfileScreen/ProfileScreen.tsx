import React, {Fragment} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import Header from '../../components/Header/Header.tsx';
import ProfileItem from './components/Item.tsx';
import Margin from '../../components/Margin/Margin.tsx';
import ProfileLogin from './components/Login.tsx';
import {Navigation} from '../../types/navigation.type.ts';
import {useUserProvider} from '../../contexts/UserContext.tsx';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}: Navigation) => {
  const {user, setUser} = useUserProvider();

  return (
    <View style={styles.container}>
      <Header title={'Profil'} />
      <ScrollView contentContainerStyle={{paddingTop: 10}}>
        <Margin>
          <ProfileLogin navigation={navigation} />
          {user?.firstName && (
            <Fragment>
              <TouchableOpacity
                onPress={() => navigation.navigate('OrderList')}>
                <ProfileItem>Mes commandes</ProfileItem>
              </TouchableOpacity>
              <ProfileItem>Mon carnet d'adresse</ProfileItem>
              <ProfileItem>Modifier mon profil</ProfileItem>
              <TouchableOpacity
                onPress={async () => {
                  await AsyncStorage.clear();
                  setUser({});
                }}>
                <ProfileItem>Déconnexion</ProfileItem>
              </TouchableOpacity>
            </Fragment>
          )}
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
