import React, {useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import Header from '../../../components/Header/Header.tsx';
import TextField from '../../../components/TextField/TextField.tsx';
import Margin from '../../../components/Margin/Margin.tsx';
import Button from '../../../components/Button/Button.tsx';
import {useMutation} from '@tanstack/react-query';
import {
  OrderCreateDto,
  UserAddressCreateDto,
  UserCreditCardCreateDto,
} from '../../../../generated';
import {useFormik} from 'formik';
import {postOrder} from '../../../requests/order.request.ts';
import {OrderCreateSchema} from '../../../validations/order.validation.ts';
import {useOrderCartProvider} from '../../../contexts/OrderCartContext.tsx';
import {postAddress, postCreditCard} from '../../../requests/user.request.ts';
import {useNavigation} from '@react-navigation/native';

const OrderPaymentScreen = () => {
  const navigation = useNavigation();
  const {carts, setCarts} = useOrderCartProvider();
  const [addressId, setAddressId] = useState('');
  const [cardId, setCardId] = useState('');

  const mutationAddress = useMutation({
    mutationFn: (data: UserAddressCreateDto) => postAddress(data),
    onSuccess: async data => {
      setAddressId(data.id);
      mutationCreditCard.mutate({
        cardNumber: formik.values.number,
        expiryDate: formik.values.expiration,
        cardHolderName: formik.values.cardName,
        cvv: 0,
      });
    },
    onError: () => {
      Alert.alert('Oups...', 'Une erreur est survenue', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    },
  });

  const mutationCreditCard = useMutation({
    mutationFn: (data: UserCreditCardCreateDto) => postCreditCard(data),
    onSuccess: async data => {
      setCardId(data.id);
      mutationOrder.mutate({
        items: carts?.map(e => ({
          quantity: e?.quantity || 0,
          slug: e?.product?.slug || '',
        })),
        creditCardId: data.id,
        addressId: addressId,
      });
    },
    onError: () => {
      Alert.alert('Oups...', 'Une erreur est survenue', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    },
  });

  const mutationOrder = useMutation({
    mutationFn: (data: OrderCreateDto) => postOrder(data),
    onSuccess: async data => {
      Alert.alert('Succès !', 'Votre commande a bien été passée', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      setCarts([]);
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
      phone: '',
      address: '',
      address2: '',
      city: '',
      postCode: '',
      country: '',
      cardName: '',
      number: '',
      expiration: '',
      cvc: '',
    },
    validationSchema: OrderCreateSchema,
    onSubmit: values => {
      mutationAddress.mutate({
        firstName: values.firstName,
        lastName: values.lastName,
        street: values.address,
        additional: values.address2,
        zipCode: values.postCode,
        name: 'Mon adresse',
        city: values.city,
        country: 'France',
        phone: values.phone,
        streetNumber: '',
      });
    },
  });

  return (
    <View style={styles.container}>
      <Header withBack={true} title={'Paiement'} />
      <ScrollView contentContainerStyle={{paddingTop: 15}}>
        <Margin>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 5}}>
            Adresse
          </Text>
        </Margin>
        <Margin>
          <View style={{marginBottom: 10}}>
            <TextField
              placeholder={'Prénom'}
              onChangeText={formik.handleChange('firstName')}
              onBlur={formik.handleBlur('firstName')}
              value={formik.values.firstName}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <View>
                <Text style={{color: '#d12727'}}>
                  {formik.errors.firstName}
                </Text>
              </View>
            )}
          </View>
          <View style={{marginBottom: 10}}>
            <TextField
              placeholder={'Nom de famille'}
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
          <View style={{marginBottom: 10}}>
            <TextField
              placeholder={'Numéro de téléphone'}
              onChangeText={formik.handleChange('phone')}
              onBlur={formik.handleBlur('phone')}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone && (
              <View>
                <Text style={{color: '#d12727'}}>{formik.errors.phone}</Text>
              </View>
            )}
          </View>
          <View style={{marginBottom: 10}}>
            <TextField
              placeholder={'Adresse'}
              onChangeText={formik.handleChange('address')}
              onBlur={formik.handleBlur('address')}
              value={formik.values.address}
            />
            {formik.touched.address && formik.errors.address && (
              <View>
                <Text style={{color: '#d12727'}}>{formik.errors.address}</Text>
              </View>
            )}
          </View>
          <View style={{marginBottom: 5}}>
            <TextField
              placeholder={"Complément d'adresse"}
              onChangeText={formik.handleChange('address2')}
              onBlur={formik.handleBlur('address2')}
              value={formik.values.address2}
            />
            {formik.touched.address2 && formik.errors.address2 && (
              <View>
                <Text style={{color: '#d12727'}}>{formik.errors.address2}</Text>
              </View>
            )}
          </View>
          <View style={{marginBottom: 5}}>
            <TextField
              placeholder={'Ville'}
              onChangeText={formik.handleChange('city')}
              onBlur={formik.handleBlur('city')}
              value={formik.values.city}
            />
            {formik.touched.city && formik.errors.city && (
              <View>
                <Text style={{color: '#d12727'}}>{formik.errors.city}</Text>
              </View>
            )}
          </View>
          <View style={{marginBottom: 5}}>
            <TextField
              placeholder={'Code postal'}
              onChangeText={formik.handleChange('postCode')}
              onBlur={formik.handleBlur('postCode')}
              value={formik.values.postCode}
            />
            {formik.touched.postCode && formik.errors.postCode && (
              <View>
                <Text style={{color: '#d12727'}}>{formik.errors.postCode}</Text>
              </View>
            )}
          </View>
        </Margin>
        <Margin>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 5,
              marginTop: 15,
            }}>
            Information de paiement
          </Text>
        </Margin>
        <Margin>
          <View style={{marginBottom: 5}}>
            <TextField
              placeholder={'Nom complet'}
              onChangeText={formik.handleChange('cardName')}
              onBlur={formik.handleBlur('cardName')}
              value={formik.values.cardName}
            />
            {formik.touched.cardName && formik.errors.cardName && (
              <View>
                <Text style={{color: '#d12727'}}>{formik.errors.cardName}</Text>
              </View>
            )}
          </View>
        </Margin>
        <Margin>
          <View style={{marginBottom: 5}}>
            <TextField
              placeholder={'Numéro de carte'}
              onChangeText={formik.handleChange('number')}
              onBlur={formik.handleBlur('number')}
              value={formik.values.number}
            />
            {formik.touched.number && formik.errors.number && (
              <View>
                <Text style={{color: '#d12727'}}>{formik.errors.number}</Text>
              </View>
            )}
          </View>
        </Margin>
        <Margin>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              marginBottom: 15,
            }}>
            <View style={{flexGrow: 1, flexShrink: 1, width: '50%'}}>
              <TextField
                placeholder={'Expiration'}
                onChangeText={formik.handleChange('expiration')}
                onBlur={formik.handleBlur('expiration')}
                value={formik.values.expiration}
              />
              {formik.touched.expiration && formik.errors.expiration && (
                <View>
                  <Text style={{color: '#d12727'}}>
                    {formik.errors.expiration}
                  </Text>
                </View>
              )}
            </View>
            <View style={{flexGrow: 1, width: '50%'}}>
              <TextField
                placeholder={'CVC'}
                onChangeText={formik.handleChange('cvc')}
                onBlur={formik.handleBlur('cvc')}
                value={formik.values.cvc}
              />
              {formik.touched.cvc && formik.errors.cvc && (
                <View>
                  <Text style={{color: '#d12727'}}>{formik.errors.cvc}</Text>
                </View>
              )}
            </View>
          </View>
        </Margin>
        <Margin>
          <View style={{paddingBottom: 45}}>
            <Button onPress={() => formik.handleSubmit()}>Payer</Button>
          </View>
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

export default OrderPaymentScreen;
