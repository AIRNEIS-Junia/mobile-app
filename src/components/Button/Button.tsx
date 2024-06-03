import React, {FC} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {APP_COLOR} from '../../constants/color.ts';

type Props = {
  children: React.ReactNode;
} & TouchableOpacityProps;

const Button: FC<Props> = ({children, ...rest}) => {
  return (
    <TouchableOpacity {...rest} style={styles.buttonView}>
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: APP_COLOR.primary,
    paddingVertical: 14,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
});

export default Button;
