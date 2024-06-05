import * as Yup from 'yup';

export const OrderCreateSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string().required(),
  address: Yup.string().required(),
  address2: Yup.string(),
  city: Yup.string().required(),
  postCode: Yup.string().required(),
  cardName: Yup.string().required(),
  number: Yup.string().required('Required'),
  expiration: Yup.string().required('Required'),
  cvc: Yup.string().min(3).max(3).required('Required'),
});
