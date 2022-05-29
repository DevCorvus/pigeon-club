import React from 'react';

export default function TypingList({ typing }) {
  const span = (msg) => (
    <span className="text-gray-400 animate-pulse">{msg}</span>
  );

  if (typing.length === 0) {
    return <></>;
  } else if (typing.length === 1) {
    return span(`${typing[0].nickname} is typing...`);
  } else if (typing.length === 2) {
    return span(
      `${typing[0].nickname} and ${typing[1].nickname} are typing...`
    );
  } else {
    return span('Several people are typing...');
  }
}
