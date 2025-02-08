import { JSX, useState } from 'react';
import uuid from 'react-uuid';
import ConversationDTO from '../contoso/types/conversation-dto';
import Roles from '../contoso/enums/roles';

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<ConversationDTO[]>>;
  messages: ConversationDTO[];
};

const ChatInput = ({ setMessages, messages }: Props): JSX.Element => {
  const [input, setInput] = useState('');

  // const [isProcessing, setIsProcessing] = useState(false);

  const buildDto = (newInput: string): ConversationDTO[] => {
    return [
      // ...messages,
      {
        id: uuid(),
        date: new Date().toISOString(),
        content: newInput,
        role: Roles.User,
      },
    ];
  };

  const processOutput = (objects: string[]): void => {
    for (const obj of objects) {
      try {
        if (obj !== '' && obj !== '{}') {
          const newChat = messages[0];
          newChat.content += JSON.parse(obj);
          setMessages([newChat]);
        }
      } catch (e) {
        if (!(e instanceof SyntaxError)) {
          console.error(e);
          throw e;
        } else {
          console.log('Incomplete message. Continuing...');
        }
      }
    }
  };

  const handleSend = async () => {
    if (input === null || typeof input !== 'string') return;
    const converstion = buildDto(input.trim());

    // let result = {};
    const response = await fetch('http://localhost:5000/proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: converstion,
      }),
    });
    if (response.ok && response.body) {
      const reader = response.body.getReader();
      while (true) {
        //stream the response
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder('utf-8').decode(value);
        processOutput(text.split('\n'));
        // for (const obj of text.split('\n')) {
        //   try {
        //     if (obj !== '' && obj !== '{}') {
        //       runningText += obj;
        //       result = JSON.parse(runningText);
        //     }
        //   } catch (e) {
        //     if (!(e instanceof SyntaxError)) {
        //       console.error(e);
        //       throw e;
        //     } else {
        //       console.log('Incomplete message. Continuing...');
        //     }
        //   }
        // }
      }
    } else {
      console.log(response);
    }
  };

  return (
    <div className="border-t border-gray-700 p-4">
      <div className="flex flex-col items-stretch border-gray-600">
        <textarea
          className="flex-grow p-2 bg-gray-700 focus-visible:none text-white"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <div className="flex flex-col items-end border-t border-gray-600 bg-gray-700">
          <button
            onClick={handleSend}
            className=" focus-visible:none p-2 text-white px-4 py-2 bg-gray-700 flex justify-center items-center hover:bg-gray-600"
          >
            <span className="text-2 material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
