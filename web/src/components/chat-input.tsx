import { JSX, useState } from 'react';
import ConversationDTO from '../contoso/types/conversation-dto';
import useMessages from '../contoso/hooks/messages';
import Send from './icons/send';

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<ConversationDTO[]>>;
  messages: ConversationDTO[];
};

const ChatInput = (props: Props): JSX.Element => {
  const [input, setInput] = useState('');

  const { handleSend } = useMessages(props);

  return (
    <div className="border-t border-gray-700 p-4">
      <div className="flex flex-col items-stretch border-gray-600">
        <textarea
          className="flex-grow p-2 bg-gray-700 focus-visible:none text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend(input);
          }}
        />
        <div className="flex flex-col items-end border-t border-gray-600 bg-gray-700">
          <button
            onClick={() => handleSend(input)}
            className=" focus-visible:none p-2 text-white px-4 py-2 bg-gray-700 flex justify-center items-center hover:bg-gray-600"
          >
            <span className="text-2">
              <Send />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
