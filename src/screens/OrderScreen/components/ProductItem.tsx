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
        <View style={styles.imageView}>
          <Image
            source={{
              uri: 'https://www.miliboo.com/canape-scandinave-3-places-en-tissu-velours-bleu-canard-et-bois-clair-ektor-46518-6483209992565_1200_675_.jpg',
            }}
            width={65}
            height={65}
          />
        </View>
        <View>
          <Text style={{fontSize: 16}}>{data?.product?.name}</Text>
        </View>
      </View>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{marginRight: 10}}>
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
  },
  imageView: {
    marginRight: 10,
  },
  detailView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default OrderProductItem;
