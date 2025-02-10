import { JSX, useState } from 'react';
import ChatInput from './components/chat-input';
import ChatMessage from './components/chat-message';
import ConversationDTO from './contoso/types/conversation-dto';
import uuid from 'react-uuid';
import Roles from './contoso/enums/roles';
import { ContosoProvider } from './contoso/contoso-provider';

const App = (): JSX.Element => {
  const [messages, setMessages] = useState<ConversationDTO[]>([
    {
      id: uuid(),
      date: new Date().toISOString(),
      content: '',
      role: Roles.User,
    },
  ]);

  return (
    <div className="flex flex-col w-full h-full bg-gray-800 shadow-lg rounded-lg overflow-hidden">
      <ContosoProvider>
        <div className="flex flex-col flex-grow p-4 overflow-y-auto">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg} />
          ))}
        </div>
        <ChatInput setMessages={setMessages} messages={messages} />
      </ContosoProvider>
    </div>
  );
};

export default App;
