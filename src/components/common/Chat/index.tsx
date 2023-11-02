import React from 'react';

interface ChatProps {
  commet: string;
}

const Chat = ({ commet }: ChatProps) => {
  return (
    <div className="chat chat-start w-full">
      <div className="chat-bubble">{commet}</div>
    </div>
  );
};

export default Chat;
