import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import TextField from '../../components/TextField/TextField.tsx';
import HomeCategory from './components/Category.tsx';
import Margin from '../../components/Margin/Margin.tsx';
import HomeProduct from './components/Product.tsx';

const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.header}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Airnies</Text>
        </View>
      </SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Margin>
          <View style={styles.searchView}>
            <TextField placeholder={'Rechercher'} />
          </View>
        </Margin>
        <View style={styles.categoryView}>
          <HomeCategory />
        </View>
        <View>
          <HomeProduct navigation={navigation} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  searchView: {
    marginTop: 10,
    marginBottom: 15,
  },
  categoryView: {
    marginBottom: 25,
  },
});

export default HomeScreen;
