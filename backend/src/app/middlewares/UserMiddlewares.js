import * as Yup from 'yup';

export const createUser = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string().required('Nome é um campo obrigatório'),
    email: Yup.string()
      .email()
      .required('E-mail é um campo obrigatório'),
    password: Yup.string()
      .required('Senha é um campo obrigatório')
      .min(6, 'A senha deve ter 6-10 characters')
      .max(10, 'A senha deve ter 6-10 characters'),
  });

  try {
    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res, next) => {
  const schema = Yup.object().shape({
    name: Yup.string(),
    email: Yup.string()
      .email('E-mail inválido')
      .required('E-mail é um campo obrigatório'),
    oldPassword: Yup.string()
      .min(6, 'A senha deve ter 6-10 characters')
      .max(10, 'A senha deve ter 6-10 characters'),
    password: Yup.string()
      .min(6, 'A senha deve ter 6-10 characters')
      .max(10, 'A senha deve ter 6-10 characters')
      .when('Senha Antiga', (oldPassword, field) =>
        oldPassword ? field.required('Você deve enviar a senha') : field
      ),
    confirmPassword: Yup.string().when('password', (password, field) =>
      password
        ? field
          .required('Você deve confirmar a senha')
          .oneOf([Yup.ref('password')])
        : field
    ),
  });

  try {
    /* it's necessary to send the body */
    // eslint-disable-next-line no-throw-literal
    if (Object.keys(req.body).length === 0) throw 'Body not sended';

    await schema.validate(req.body, { abortEarly: true });
    return next();
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
