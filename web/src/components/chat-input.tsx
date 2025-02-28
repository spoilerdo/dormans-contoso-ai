import { JSX, useState } from 'react';
import Send from './icons/send';
import { useContosoProviderContext } from '../contoso/contoso-provider';

const ChatInput = (): JSX.Element => {
  const [input, setInput] = useState('');
  const { handleSend } = useContosoProviderContext();

  const sendInput = (): void => {
    handleSend(input);
    setInput('');
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
            if (e.key === 'Enter') {
              e.preventDefault();
              sendInput();
            }
          }}
        />
        <div className="flex flex-col items-end border-t border-gray-600 bg-gray-700">
          <button
            onClick={sendInput}
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
