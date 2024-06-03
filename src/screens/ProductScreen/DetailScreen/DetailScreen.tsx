import React, {useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Margin from '../../../components/Margin/Margin.tsx';
import {Navigation} from '../../../types/navigation.type.ts';
import {getProductById} from '../../../requests/product.request.ts';
import {useQuery} from '@tanstack/react-query';
import ProductDetailImageViewer from './components/ImageViewer.tsx';
import Button from '../../../components/Button/Button.tsx';
import {useOrderCartProvider} from '../../../contexts/OrderCartContext.tsx';
import uuid from 'react-native-uuid';

const ProductDetailScreen = ({navigation, route}: Navigation) => {
  const {carts, setCart, updateCart, changeQuantity} = useOrderCartProvider();

  const {data} = useQuery({
    queryKey: ['Product', route?.params?.id],
    queryFn: () => getProductById(route?.params?.id ?? ''),
  });

  const handleAddProduct = () => {
    const findProductInStore = carts?.find(
      e => e.product?.id === route?.params?.id,
    );

    if (findProductInStore) {
      changeQuantity(
        route?.params?.id ?? '',
        (findProductInStore.quantity || 0) + 1,
      );
    } else {
      setCart({
        id: uuid.v4() as string,
        product: data,
        quantity: 1,
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView>
        <Margin>
          <View style={styles.headerView}>
            <View style={{width: 50}}>
              <TouchableOpacity
                onPress={() => {
                  navigation?.goBack();
                }}>
                <Icon name={'chevron-thin-left'} size={24} />
              </TouchableOpacity>
            </View>
            <View style={{flexShrink: 1, alignItems: 'center'}}>
              <Text numberOfLines={1} style={styles.headerTitle}>
                {data?.name}
              </Text>
            </View>
            <View style={{width: 50}} />
          </View>
        </Margin>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{paddingTop: 10}}>
        <View style={{marginBottom: 15}}>
          <ProductDetailImageViewer images={data?.images || []} />
        </View>
        <Margin>
          <Text style={styles.titleText}>{data?.name}</Text>
          <Text>
            {(data?.quantity || 0) > 0 ? 'En stock' : 'Rupture de stock'}
          </Text>
        </Margin>
        <Margin>
          <View style={{marginTop: 15}}>
            <Text style={styles.descriptionText}>Description</Text>
          </View>
          <Text>{data?.description}</Text>
        </Margin>
      </ScrollView>
      <SafeAreaView>
        <Margin>
          <View style={{marginBottom: 10, marginTop: 10}}>
            <Button onPress={handleAddProduct}>
              Ajouter au panier (
              {carts?.find(e => e.product?.id === route?.params?.id)
                ?.quantity || 0}
              )
            </Button>
          </View>
        </Margin>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ProductDetailScreen;
