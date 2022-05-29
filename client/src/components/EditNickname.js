import React from 'react';
import { useForm } from 'react-hook-form';
import { getSocket } from '../socketState';
import { joiResolver } from '@hookform/resolvers/joi';
import { nicknameSchema } from '../schemas/user';
import { toast } from 'react-hot-toast';
import Input from './Input';

export default function EditNickname({ toast: t }) {
  const socket = getSocket();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: joiResolver(nicknameSchema),
    mode: 'onChange',
  });

  const onSubmit = async ({ nickname }) => {
    socket.emit('nickname', nickname);
    reset();
    toast.dismiss(t.id);
  };

  return (
    <form className="w-72" onSubmit={handleSubmit(onSubmit)}>
      <Input hook={{ register, errors }} label="New Nickname" name="nickname">
        Enter your new nickname...
      </Input>
      <div className="flex gap-4 mt-2">
        <button
          className="w-full py-1 border text-indigo-400 border-indigo-400 rounded-md hover:bg-indigo-400 hover:text-white"
          type="submit"
        >
          SAVE
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full py-1 border text-indigo-400 border-indigo-400 rounded-md hover:bg-indigo-400 hover:text-white"
          type="button"
        >
          CANCEL
        </button>
      </div>
    </form>
  );
}
