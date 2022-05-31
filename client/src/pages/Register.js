import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { userSchema } from '../schemas/user';

import Box from '../components/Box';
import Input from '../components/Input';

import useOnSubmit from '../hooks/useOnSubmit';

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: joiResolver(userSchema),
    mode: 'onChange',
  });

  const onSubmit = useOnSubmit({ route: 'register' });

  return (
    <Box>
      <header className="text-3xl mb-4">
        <h1>Sign Up</h1>
      </header>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input hook={{ register, errors }} name="nickname">
          Nickname
        </Input>
        <Input hook={{ register, errors }} name="username">
          Username
        </Input>
        <Input hook={{ register, errors }} name="password" type="password">
          Password
        </Input>
        <Input
          hook={{ register, errors }}
          name="passwordConfirmation"
          label="Repeat password"
          type="password"
        >
          Repeat your password
        </Input>
        <button className="btn-primary mt-2" type="submit">
          Register
        </button>
      </form>
      <p className="mt-2">
        Do you already have an account?{' '}
        <Link
          to="/login"
          className="text-indigo-400 hover:text-indigo-500 focus:text-indigo-500"
        >
          Sign In
        </Link>
      </p>
    </Box>
  );
}
