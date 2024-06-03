import React, {FC} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

type Props = {
  label?: string;
} & TextInputProps;

const TextField: FC<Props> = ({label, ...rest}) => {
  return (
    <View>
      {label && (
        <View style={{marginBottom: 5}}>
          <Text style={{fontSize: 16}}>{label}</Text>
        </View>
      )}
      <TextInput style={styles.input} {...rest} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    padding: 10,
    backgroundColor: '#F5F4F3',
    borderRadius: 10,
  },
});

export default TextField;
