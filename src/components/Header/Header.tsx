import React, {FC} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';

type Props = {
  title: string;
  withBack?: boolean;
};

const Header: FC<Props> = ({title, withBack}) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.header}>
        {withBack && (
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{width: 50}}>
            <Icon name={'chevron-thin-left'} size={24} />
          </TouchableOpacity>
        )}
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            textAlign: 'center',
            flex: 1,
          }}>
          {title}
        </Text>
        {withBack && <View style={{width: 50}} />}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e6e6e6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
});

export default Header;
