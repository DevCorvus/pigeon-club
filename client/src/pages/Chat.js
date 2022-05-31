import React from 'react';

import CreateMessageForm from '../components/CreateMessageForm';
import MessageList from '../components/MessageList';
import TypingList from '../components/TypingList';

import useSocketMessages from '../hooks/useSocketMessages';
import useWindowResize from '../hooks/useWindowResize';

export default function Chat() {
  const { messages, typing, hasMore, scrollDown, setScrollDown } =
    useSocketMessages();
  const size = useWindowResize();

  const styles = {
    minHeight: size.height - 50,
    maxHeight: size.height - 50,
  };

  return (
    <div
      style={styles}
      className="flex flex-col justify-between p-6 mx-auto max-w-3xl w-full h-full"
    >
      <MessageList
        messages={messages}
        hasMore={hasMore}
        scrollDown={scrollDown}
      />
      <div>
        <TypingList typing={typing} />
        <CreateMessageForm setScrollDown={setScrollDown} />
      </div>
    </div>
  );
}
