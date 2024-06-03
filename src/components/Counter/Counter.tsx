import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {APP_COLOR} from '../../constants/color.ts';

type Props = {
  value: number;
  onChange?: (value: number) => void;
};

const Counter: FC<Props> = ({value, onChange}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionView}
        onPress={() => {
          onChange?.(value - 1);
        }}>
        <Icon name="minus" size={15} color={'#fff'} />
      </TouchableOpacity>
      <Text style={{paddingHorizontal: 10}}>{value || 0}</Text>
      <TouchableOpacity
        style={styles.actionView}
        onPress={() => {
          onChange?.(value + 1);
        }}>
        <Icon name="plus" size={15} color={'#fff'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionView: {
    backgroundColor: APP_COLOR.primary,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
});

export default Counter;
