import React, {FC} from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

type Props = {
  children: React.ReactNode;
} & ViewProps;

const Margin: FC<Props> = ({children, ...rest}) => {
  return (
    <View style={styles.container} {...rest}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

export default Margin;
