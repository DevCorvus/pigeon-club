import React from 'react';

export default function Input({
  hook: { register, errors },
  name,
  type = 'text',
  label = '',
  children,
}) {
  const capitalize = (text) => {
    const textArray = text.split('');
    textArray[0] = textArray[0].toUpperCase();
    return textArray.join('');
  };
  return (
    <div className="flex flex-col">
      <label htmlFor={name}>{capitalize(label || name)}</label>
      <input
        className="p-2 border hover:border-indigo-400 focus:border-indigo-400 outline-none rounded-md"
        type={type}
        {...register(name)}
        id={name}
        placeholder={children}
      />
      {errors && (
        <p className="text-red-400 text-sm">
          {errors[name]?.message && name === 'passwordConfirmation'
            ? 'Passwords does not match'
            : errors[name]?.message}
        </p>
      )}
    </div>
  );
}
