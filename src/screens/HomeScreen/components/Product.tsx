import React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Margin from '../../../components/Margin/Margin.tsx';
import {APP_COLOR} from '../../../constants/color.ts';
import {useQuery} from '@tanstack/react-query';
import {getProducts} from '../../../requests/product.request.ts';
import {ProductResponse} from '../../../../generated';

const HomeProduct = ({navigation}: {navigation: any}) => {
  const {data} = useQuery({
    queryKey: ['Products'],
    queryFn: () => getProducts(),
  });

  const renderItem = ({item}: {item: ProductResponse; index: number}) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation?.push('ProductDetail', {
            id: item?.id,
          });
        }}>
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

  return (
    <View style={{paddingBottom: 20}}>
      <Margin>
        <View style={styles.titleView}>
          <Text style={styles.title}>Nos produits</Text>
        </View>
      </Margin>

      <FlatList
        data={data?.results}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
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
    width: Dimensions.get('window').width / 2,
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

export default HomeProduct;
