import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  children: React.ReactNode;
};

const ProfileItem: FC<Props> = ({children}) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#efefef',
    padding: 15,
    marginBottom: 5,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default ProfileItem;
