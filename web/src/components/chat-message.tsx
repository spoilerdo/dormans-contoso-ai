import { JSX } from 'react';
import ConversationDTO from '../contoso/types/conversation-dto';
import Roles from '../contoso/enums/roles';

type Props = {
  message: ConversationDTO;
};

const ChatMessage = ({ message }: Props): JSX.Element => {
  const isUser = message.role === Roles.User;

  return message.content !== '' ? (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-2 rounded-md ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
        <p>{message.content}</p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ChatMessage;
