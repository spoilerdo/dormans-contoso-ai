import { JSX, useState } from 'react';
import uuid from 'react-uuid';

enum Roles {
  User = 'user',
  Assistant = 'assistant',
}

type ConversationDTO = {
  content: string;
  date: string;
  id: string;
  role: Roles;
};

const Input = (): JSX.Element => {
  const [chats, setChats] = useState<ConversationDTO[]>([
    {
      id: uuid(),
      date: new Date().toISOString(),
      content: '',
      role: Roles.User,
    },
  ]);
  // const [isProcessing, setIsProcessing] = useState(false);

  const buildDto = (newInput: string): ConversationDTO[] => {
    return [
      // ...chats,
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
          const newChat = chats[0];
          newChat.content += JSON.parse(obj);
          setChats([newChat]);
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

  const submitInput = async (formData: FormData) => {
    const newInput = formData.get('newInput');
    if (newInput === null || typeof newInput !== 'string') return;

    // let result = {};
    const response = await fetch('https://chat.whyellow.app/conversation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie:
          'ARRAffinity=6aa9de1849984fc20ab00fee1f8a1ffc08885c40b0a9f32af11d32027b98a51e; ARRAffinitySameSite=6aa9de1849984fc20ab00fee1f8a1ffc08885c40b0a9f32af11d32027b98a51e; AppServiceAuthSession=xdNDGQJBMMdSCwuL0RVKiakal3qtewD8g/4NouAr77i8YIb81scR1018F1EHRXJQ1Zlkd63VJfpqu8lKBYKcVl/YTDplRyyWfXIioT4CK5ePlwGtYShi9KMn7GsZQWaPod8PkVXx6tCIiZwAhCChqBlENbjYJs2BPeLTpS6gjknOv0ZCHM+aLz4CJFAx3RLIlnsnFmGtgXW5liHsNzq3HkGlrDnYqtGYmTMZHXl0ZsB1B2+WkOp7YcCIxWGrmSqp5J4rXtgD6GL/l1+/A8Eo/mlTOpxYucVirUfC1NY/SES01fbMrsPxeikx4uu9FRq9BRgsdIjJ0obM9sjv3Z9C4b+fhld7jP5CcIeyuk4QHNt6WTWpPLjFz3ik+SftdNFqhDpX5DSVjZ/MsQ2WyN4xDJUlgq7vkalpJuW+3XDuijHh2khzopTkxGda+j/hYBc0igQhqkKhRapjhzdFWzqg4L6bAhlnVypdllB8hYAIlCguu99lAAGB2VJDYO1EabcIYCiNtBV5PCVBt7YkY0HJwa/Vh86tPRjYpkxlZtvkqIdM6A+Jp2qg/wlZcbgTOVRQ5xm8BHyyqKFHHL0aQUUHvTqqRVaRDS2pfgdlLPm1676QhApn3yfiB3QOK/nuCZmH91XL8e1Qcck1ukdOr3phYnZHVHxhb9dTW8W/LNJuPTTLr9Q52D+tIwG/LDTTgG+67R6wmh4dzmSnEJcP6lQ1OAKL9Gt/1gI+VNqi3j7x5xWbUl2RM4BHmklVXZ7AtRnR8C62Vsuy+x0RMk7fMhAs68ft+VWVYimnUi+3mEaOrmZnBNyraBZxbubSZG8hV22zzi2ZVqaB0CJexZC7lsSPUkigdyhtP+EhGq3sSZfeeBTynfrMJGbqDGcwld7F2v35D+6a4UmcHXJkI/ME8ZHzDx4C+KH2QfucZNpHa7Q7AMABLnqD+GyGsttmz2DllbzlLD4VjfQ0G37gi8cWspQLcY6m/JwGAIL8wum8kJMJed73skrFpKCfJzPnn60U7BNbNKcn88aZDphbUUG8aq5fA9tJJbBsHY3Mj73/Bt0zRujPIuH/seQ+uxiwJOPCxQID',
      },
      body: JSON.stringify({
        messages: buildDto(newInput),
      }),
    });
    if (response.ok && response.body) {
      console.log('response was OK');
      const reader = response.body.getReader();
      while (true) {
        //stream the response
        const { done, value } = await reader.read();
        if (done) break;

        const text = new TextDecoder('utf-8').decode(value);
        console.log(text);
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
    <>
      <h1>Chat with AI</h1>
      <div id="chatContainer"></div>
      <form action={submitInput}>
        <input name="newInput" type="text" />
        <button type="submit">Send</button>
      </form>
      <p>{chats.length > 0 ? chats[0].content : ''}</p>
    </>
  );
};

export default Input;
