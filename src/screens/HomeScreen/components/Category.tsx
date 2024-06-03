import React from 'react';
import {
  FlatList,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Margin from '../../../components/Margin/Margin.tsx';
import {useQuery} from '@tanstack/react-query';
import {getProductCategories} from '../../../requests/product.request.ts';
import {ProductCategoryResponse} from '../../../../generated';

const HomeCategory = () => {
  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ['ProductCategories'],
    queryFn: () => getProductCategories(),
  });

  const renderItem = ({
    item,
    index,
  }: {
    item: ProductCategoryResponse;
    index: number;
  }) => {
    return (
      <ImageBackground
        imageStyle={{borderRadius: 10}}
        source={{uri: item.image}}
        style={styles.itemView}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.50)',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
          }}>
          <Text style={styles.itemText}>{item.name}</Text>
        </View>
      </ImageBackground>
    );
  };

  return (
    <View>
      <Margin>
        <View style={styles.titleView}>
          <Text style={styles.title}>Catégories</Text>
        </View>
      </Margin>
      <FlatList
        contentContainerStyle={styles.scrollView}
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
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
  scrollView: {
    paddingLeft: 10,
    paddingRight: 7,
  },
  itemView: {
    marginRight: 3,
    width: 200,
    height: 100,
    backgroundColor: '#25538f',

    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
  },
  itemText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeCategory;
