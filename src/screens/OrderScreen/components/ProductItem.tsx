import React, {FC} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Counter from '../../../components/Counter/Counter.tsx';
import {OrderCart} from '../../../types/order.type.ts';

type Props = {
  data: Partial<OrderCart>;
  onChangeQuantity?: (value: number) => void;
};

const OrderProductItem: FC<Props> = ({data, onChangeQuantity}) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailView}>
        <Image
          source={{
            uri: 'https://www.miliboo.com/canape-scandinave-3-places-en-tissu-velours-bleu-canard-et-bois-clair-ektor-46518-6483209992565_1200_675_.jpg',
          }}
          style={styles.image}
        />
        <View style={styles.textView}>
          <Text style={styles.productName}>{data?.product?.name}</Text>
        </View>
      </View>
      <View style={styles.priceCounterView}>
        <Text style={styles.price}>
          {(data?.product?.price || 0) * (data?.quantity || 0)}€
        </Text>
        <Counter
          value={data?.quantity || 0}
          onChange={value => onChangeQuantity?.(value)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 65,
    height: 65,
    marginRight: 10,
  },
  textView: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  priceCounterView: {
    marginLeft: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    marginRight: 10,
  },
});

export default OrderProductItem;
