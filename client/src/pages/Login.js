import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import Box from '../components/Box';
import Input from '../components/Input';

import useOnSubmit from '../hooks/useOnSubmit';

export default function Login() {
  const { handleSubmit, register } = useForm();
  const onSubmit = useOnSubmit({ route: 'login' });

  return (
    <Box>
      <header className="text-3xl mb-4">
        <h1>Sign In</h1>
      </header>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input hook={{ register }} name="username">
          Username
        </Input>
        <Input hook={{ register }} name="password" type="password">
          Password
        </Input>
        <button className="btn-primary mt-2" type="submit">
          Login
        </button>
      </form>
      <p className="mt-2">
        You do not have an account?{' '}
        <Link
          to="/register"
          className="text-indigo-400 hover:text-indigo-500 focus:text-indigo-500"
        >
          Sign Up
        </Link>
      </p>
    </Box>
  );
}
