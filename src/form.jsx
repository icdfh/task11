import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from './graphql/mutation';

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match")
}).required();

const RegistrationForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);


  const onSubmit = async (formData) => {
    try {
      const { data } = await registerUser({ variables: formData });
      console.log('Registration successful:', data);
    } catch (e) {
      console.error('Registration error:', e);
    }
  };

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      <p>{errors.name?.message}</p>

      <input {...register('email')} placeholder="Email" />
      <p>{errors.email?.message}</p>

      <input {...register('password')} type="password" placeholder="Password" />
      <p>{errors.password?.message}</p>

      <input {...register('confirmPassword')} type="password" placeholder="Confirm Password" />
      <p>{errors.confirmPassword?.message}</p>

      <button type="submit" disabled={loading}>
        Register
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
};

export default RegistrationForm;
