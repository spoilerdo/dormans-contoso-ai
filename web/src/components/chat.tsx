import { JSX } from 'react';
import { useContosoProviderContext } from '../contoso/contoso-provider';
import ChatMessage from './chat-message';
import ChatLoading from './chat-loading';
import ChatInput from './chat-input';

const Chat = (): JSX.Element => {
  const { messages, isProcessing } = useContosoProviderContext();

  return (
    <>
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <ChatMessage key={idx} message={msg} />
        ))}
        {isProcessing && <ChatLoading />}
      </div>
      <ChatInput />
    </>
  );
};

export default Chat;
