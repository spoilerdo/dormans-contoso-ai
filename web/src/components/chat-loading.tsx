import { JSX } from 'react';

const ChatLoading = (): JSX.Element => (
  <div className="mb-4 flex justify-start items-center space-x-2">
    <div className="flex space-x-1 p-2 rounded-md bg-gray-700 text-gray-300 h-10 pt-4">
      <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></div>
      <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
      <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
    </div>
  </div>
);

export default ChatLoading;
