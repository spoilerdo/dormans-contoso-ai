import uuid from 'react-uuid';
import Roles from '../enums/roles';
import ConversationDTO from '../types/conversation-dto';
import { useContosoProviderContext } from '../contoso-provider';

type Messages = {
  handleSend: (input: string) => Promise<void>;
};

type Props = {
  setMessages: React.Dispatch<React.SetStateAction<ConversationDTO[]>>;
  messages: ConversationDTO[];
};

const useMessages = ({ messages, setMessages }: Props): Messages => {
  const { cookie } = useContosoProviderContext();
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

  return {
    handleSend: async (input: string) => {
      if (input === null || typeof input !== 'string') return;
      const conversation = buildDto(input.trim());

      console.log(conversation);
      console.log(cookie);
      // let result = {};
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
    },
  };
};

export default useMessages;
