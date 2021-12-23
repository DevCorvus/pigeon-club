import React from 'react';

export default function Box({ children }) {
  return (
    <div className="absolute top-0 left-0 w-screen h-screen">
      <div className="w-full max-w-md px-6 md:px-0 mx-auto absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        {children}
      </div>
    </div>
  );
}
