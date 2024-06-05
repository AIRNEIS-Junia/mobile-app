import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/Header/Header';
import {useQuery} from '@tanstack/react-query';
import {getOrders} from '../../../requests/order.request.ts';
import Margin from '../../../components/Margin/Margin.tsx';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from '../../../types/navigation.type.ts';
import {getProductsByCategoryId} from '../../../requests/product.request.ts';
import ProductItem from '../components/ProductItem.tsx';

const ProductCategoryScreen = ({navigation, route}: Navigation) => {
  const {data} = useQuery({
    queryKey: ['OrderList'],
    queryFn: () => getProductsByCategoryId(route?.params?.id),
  });

  useEffect(() => {
    console.log(route);
  }, [route]);

  return (
    <View style={styles.container}>
      <Header withBack={true} title={'Les produits'} />
      <ScrollView contentContainerStyle={{marginTop: 15}}>
        <Margin>
          {data?.map(order => (
            <ProductItem item={order} />
          ))}
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

export default ProductCategoryScreen;
