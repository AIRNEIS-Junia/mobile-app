import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {APP_COLOR} from '../../../constants/color.ts';
import {ProductResponse} from '../../../../generated';

const ProductItem = ({item}: {item: ProductResponse}) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation?.push('ProductDetail', {
          id: item?.id,
        });
      }}
      style={{marginBottom: 25}}>
      <View style={styles.listContainer}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.images?.[0]}} style={styles.image} />
        </View>
        <Text style={styles.nameText}>{item?.name}</Text>
        <Text style={styles.priceText}>{item?.price}€</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            navigation?.push('ProductDetail', {
              id: item?.id,
            });
          }}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Détail</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  titleView: {
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F9FD',
  },
  listContainer: {
    backgroundColor: 'white',
    margin: 0,
    borderRadius: 20,
  },
  imageContainer: {
    marginHorizontal: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {width: '100%', height: 150, objectFit: 'cover'},
  nameText: {
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  priceText: {
    color: APP_COLOR.primary,
    fontWeight: 'bold',
    marginLeft: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: APP_COLOR.primary,
    padding: 10,
    margin: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ProductItem;
