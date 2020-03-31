/* MODULES */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

/* REDUX */
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

/* COMPONENTS */
import AvatarInput from './AvatarInput';

/* STYLES */
import { Container } from './styles';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  /* FUNCTIONS */
  function handleSubmit(data) {
    dispatch(updateProfileRequest(data));
  }

  function handleSignOut() {
    dispatch(signOut());
  }
  return (
    <Container>
      <Form initialData={profile} onSubmit={handleSubmit}>
        <AvatarInput name="avatar_id" />
        <Input name="name" placeholder="Nome completo" />
        <Input type="email" name="email" placeholder="Seu e-mail" />
        <hr />
        <Input
          type="password"
          name="oldPassword"
          placeholder="Sua senha atual"
        />
        <Input type="password" name="password" placeholder="Nova senha" />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirme sua nova senha"
        />
        <button type="submit">Atualizar perfil</button>
      </Form>
      <button type="button" onClick={handleSignOut}>
        Sair
      </button>
    </Container>
  );
}
