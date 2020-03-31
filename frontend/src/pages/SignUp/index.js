/* MODULES */
import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import logo from '~/assets/logo.svg';

/* REDUX */
import { signUpRequest } from '~/store/modules/auth/actions';

/* VALIDATIONS */
const schema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('E-mail invalid')
    .required('E-mail is required'),
  password: Yup.string()
    .min(6)
    .max(15)
    .required('Password is required'),
});
export default function SignUp() {
  const dispatch = useDispatch();

  /* FUNCTIONS */
  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }
  return (
    <>
      <img src={logo} alt="Logo" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input
          name="password"
          type="password"
          placeholder="Sua senha"
        />
        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
}
