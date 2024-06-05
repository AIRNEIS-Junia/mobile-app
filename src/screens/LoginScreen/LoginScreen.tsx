import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header/Header';
import TextField from '../../components/TextField/TextField.tsx';
import Margin from '../../components/Margin/Margin.tsx';
import Button from '../../components/Button/Button.tsx';
import {useMutation} from '@tanstack/react-query';
import {postAuthLogin} from '../../requests/auth.request.ts';
import {AuthLoginDto} from '../../../generated';
import {useFormik} from 'formik';
import {AuthLoginSchema} from '../../validations/auth.validation.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {jwtDecode} from 'jwt-decode';
import {User} from '../../types/user.type.ts';
import {useUserProvider} from '../../contexts/UserContext.tsx';

const LoginScreen = () => {
  const navigation = useNavigation<any>();
  const {setUser} = useUserProvider();

  const mutationLogin = useMutation({
    mutationFn: (data: AuthLoginDto) => postAuthLogin(data),
    onSuccess: async data => {
      await AsyncStorage.setItem('accessToken', data.accessToken);
      await AsyncStorage.setItem('refreshToken', data.refreshToken);
      const decoded = jwtDecode<User>(data.accessToken);
      setUser({
        firstName: decoded.firstName,
        lastName: decoded.lastName,
        email: decoded.email,
      });
      navigation.goBack();
    },
    onError: () => {
      Alert.alert('Oups...', 'Une erreur est survenue', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: AuthLoginSchema,
    onSubmit: values => {
      mutationLogin.mutate({
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <View style={styles.container}>
      <Header withBack={true} title={'Connexion'} />
      <ScrollView contentContainerStyle={{paddingTop: 15}}>
        <View style={{marginBottom: 10, marginRight: 10, marginLeft: 10}}>
          <TextField
            label={'E-mail'}
            onChangeText={formik.handleChange('email')}
            onBlur={formik.handleBlur('email')}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <View>
              <Text style={{color: '#d12727'}}>{formik.errors.email}</Text>
            </View>
          )}
        </View>
        <Margin style={{marginBottom: 10, marginRight: 10, marginLeft: 10}}>
          <TextField
            label={'Mot de passe'}
            onChangeText={formik.handleChange('password')}
            onBlur={formik.handleBlur('password')}
            value={formik.values.password}
            secureTextEntry={true}
          />
          {formik.touched.email && formik.errors.email && (
            <View>
              <Text style={{color: '#d12727'}}>{formik.errors.email}</Text>
            </View>
          )}
        </Margin>
        <Margin>
          <Button onPress={() => formik.handleSubmit()}>Se connecter</Button>
        </Margin>
        <Margin>
          <TouchableOpacity
            style={{marginTop: 10, alignItems: 'center'}}
            onPress={() => {
              navigation.navigate('Register');
            }}>
            <Text>Je n'ai pas encore de compte</Text>
          </TouchableOpacity>
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

export default LoginScreen;
