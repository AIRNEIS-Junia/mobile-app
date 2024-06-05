import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import Header from '../../../components/Header/Header';
import OrderProductItem from '../components/ProductItem.tsx';
import {useOrderCartProvider} from '../../../contexts/OrderCartContext.tsx';
import {OrderCart} from '../../../types/order.type.ts';
import Button from '../../../components/Button/Button.tsx';
import Margin from '../../../components/Margin/Margin.tsx';
import {useNavigation} from '@react-navigation/native';
import {useUserProvider} from '../../../contexts/UserContext.tsx';

const OrderCartScreen = () => {
  const navigation = useNavigation<{navigate: (data: string) => void}>();
  const {carts, changeQuantity} = useOrderCartProvider();
  const {user} = useUserProvider();
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
      {carts && carts?.length > 0 && (
        <SafeAreaView>
          <Margin>
            <View style={{paddingBottom: 10}}>
              {user?.firstName ? (
                <Button
                  onPress={() => {
                    navigation.navigate('OrderPayment');
                  }}>
                  Valider mon panier
                </Button>
              ) : (
                <Button
                  onPress={() => {
                    navigation.navigate('Login');
                  }}>
                  Se connecter
                </Button>
              )}
            </View>
          </Margin>
        </SafeAreaView>
      )}
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
