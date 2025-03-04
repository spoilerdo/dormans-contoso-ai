import { useState } from 'react';
import uuid from 'react-uuid';

import Roles from '../enums/roles';
import ConversationDTO from '../types/conversation-dto';
import ChatResponseDTO from '../types/chat-response-dto';

export type Messages = {
  isProcessing: boolean;
  messages: ConversationDTO[];
  handleSend: (input: string) => Promise<void>;
};

type Props = {
  cookie: string;
};

const useMessages = ({ cookie }: Props): Messages => {
  const [messages, setMessages] = useState<ConversationDTO[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const buildDto = (newInput: string): ConversationDTO[] => {
    return [
      ...messages,
      {
        id: uuid(),
        date: new Date().toISOString(),
        content: newInput,
        role: Roles.User,
      },
    ];
  };

  const addNewMessage = (message: ConversationDTO): void => {
    const newMessages = messages;
    newMessages.push(message);
    setMessages([...newMessages]);
  };

  const addEmptyAIMessage = (): void => {
    const newMessages = messages;
    newMessages.push({
      id: uuid(),
      date: new Date().toISOString(),
      content: '',
      role: Roles.Assistant,
    });
  };

  const filterOutFaultyObjects = (obj: string): boolean => obj !== '' && obj !== '{}';

  const getMessageData = (obj: string): string | null => {
    const chatResponse = JSON.parse(obj) as ChatResponseDTO;
    if (chatResponse.choices) {
      return chatResponse.choices.flatMap((x) => x.messages.map((x) => x.content)).join(' ');
    } else {
      return null;
    }
  };

  const updateLatestMessage = (message: string): void => {
    const newMessages = messages;
    newMessages[newMessages.length - 1].content += message;
    setMessages([...newMessages]);
  };

  const processOutput = (objects: string[]): void => {
    for (const obj of objects) {
      try {
        if (filterOutFaultyObjects(obj)) {
          const text = JSON.parse(JSON.stringify(obj));
          const messageData = getMessageData(text);
          if (messageData) updateLatestMessage(messageData);
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

  return {
    isProcessing,
    messages,
    handleSend: async (input: string) => {
      if (input === null || typeof input !== 'string') return;
      const conversation = buildDto(input.trim());
      addNewMessage(conversation[conversation.length - 1]);

      setIsProcessing(true);
      const response = await fetch('http://localhost:5000/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: conversation,
          cookie,
        }),
      });
      if (response.ok && response.body) {
        addEmptyAIMessage();

        const reader = response.body.getReader();
        while (true) {
          //stream the response
          const { done, value } = await reader.read();
          if (done) break;

          const text = new TextDecoder().decode(value);
          const formattedText = text.replace(/\\"/g, '"').replace(/\\\\/g, '\\').split('\\n');
          processOutput(formattedText);
        }
        setIsProcessing(false);
      } else {
        setIsProcessing(false);
      }
    },
  };
};

export default useMessages;
