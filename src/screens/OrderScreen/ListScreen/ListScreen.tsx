import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/Header/Header';
import {useQuery} from '@tanstack/react-query';
import {getOrders} from '../../../requests/order.request.ts';
import Margin from '../../../components/Margin/Margin.tsx';

const OrderListScreen = () => {
  const {data} = useQuery({
    queryKey: ['OrderList'],
    queryFn: () => getOrders(),
  });

  return (
    <View style={styles.container}>
      <Header withBack={true} title={'Mes commandes'} />
      <ScrollView contentContainerStyle={{marginTop: 15}}>
        <Margin>
          {data?.map(order => (
            <View
              key={order.id}
              style={{
                backgroundColor: '#ececec',
                marginBottom: 10,
                padding: 10,
                borderRadius: 10,
              }}>
              <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 5}}>
                Commande #{order.orderSecondaryId} -{' '}
                {order?.orderItems?.reduce(
                  (total, currentItem) =>
                    total +
                    (currentItem.product?.price *
                      (parseInt(currentItem.quantity, 10) || 0) || 0),
                  0,
                )}
                €
              </Text>
              {order.orderItems?.map(o => (
                <View key={o.id}>
                  <Text>
                    {o.product?.name} - {o?.product?.price}€ x {o?.quantity}
                  </Text>
                </View>
              ))}
            </View>
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

export default OrderListScreen;
