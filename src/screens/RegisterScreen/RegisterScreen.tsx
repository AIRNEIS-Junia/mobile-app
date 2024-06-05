import React from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../components/Header/Header';
import TextField from '../../components/TextField/TextField.tsx';
import Margin from '../../components/Margin/Margin.tsx';
import Button from '../../components/Button/Button.tsx';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {AuthRegisterDto} from '../../../generated';
import {postAuthRegister} from '../../requests/auth.request.ts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFormik} from 'formik';
import {AuthLoginSchema} from '../../validations/auth.validation.ts';
import {useUserProvider} from '../../contexts/UserContext.tsx';
import {jwtDecode} from 'jwt-decode';
import {User} from '../../types/user.type.ts';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const {setUser} = useUserProvider();

  const mutationRegister = useMutation({
    mutationFn: (data: AuthRegisterDto) => postAuthRegister(data),
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    validationSchema: AuthLoginSchema,
    onSubmit: values => {
      mutationRegister.mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      });
    },
  });

  return (
    <View style={styles.container}>
      <Header withBack={true} title={'Inscription'} />
      <ScrollView contentContainerStyle={{paddingTop: 15}}>
        <View style={{marginBottom: 10, marginRight: 10, marginLeft: 10}}>
          <TextField
            label={'Prénom'}
            onChangeText={formik.handleChange('firstName')}
            onBlur={formik.handleBlur('firstName')}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <View>
              <Text style={{color: '#d12727'}}>{formik.errors.firstName}</Text>
            </View>
          )}
        </View>
        <View style={{marginBottom: 10, marginRight: 10, marginLeft: 10}}>
          <TextField
            label={'Nom'}
            onChangeText={formik.handleChange('lastName')}
            onBlur={formik.handleBlur('lastName')}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <View>
              <Text style={{color: '#d12727'}}>{formik.errors.lastName}</Text>
            </View>
          )}
        </View>
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
          {formik.touched.password && formik.errors.password && (
            <View>
              <Text style={{color: '#d12727'}}>{formik.errors.password}</Text>
            </View>
          )}
        </Margin>
        <Margin>
          <Button onPress={() => formik.handleSubmit()}>S'inscrire</Button>
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

export default RegisterScreen;
