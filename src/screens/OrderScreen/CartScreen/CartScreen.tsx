import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import Header from '../../../components/Header/Header';
import OrderProductItem from '../components/ProductItem.tsx';
import {useOrderCartProvider} from '../../../contexts/OrderCartContext.tsx';
import {OrderCart} from '../../../types/order.type.ts';

const OrderCartScreen = () => {
  const {carts, changeQuantity} = useOrderCartProvider();
  const renderItem = ({
    item,
    index,
  }: {
    item: Partial<OrderCart>;
    index: number;
  }) => {
    return (
      <OrderProductItem
        data={item}
        key={item.id}
        onChangeQuantity={value => changeQuantity(item.id || '', value)}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Panier'} />

      <FlatList
        renderItem={renderItem}
        contentContainerStyle={{paddingHorizontal: 10}}
        data={carts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
});

export default OrderCartScreen;
