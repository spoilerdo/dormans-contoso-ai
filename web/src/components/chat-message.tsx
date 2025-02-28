import { JSX } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import supersub from 'remark-supersub';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nord } from 'react-syntax-highlighter/dist/esm/styles/prism';
import ConversationDTO from '../contoso/types/conversation-dto';
import Roles from '../contoso/enums/roles';

type Props = {
  message: ConversationDTO;
};

const ChatMessage = ({ message }: Props): JSX.Element => {
  const isUser = message.role === Roles.User;

  const components = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    code({ node, ...props }: { node: any; [key: string]: any }) {
      let language;
      if (props.className) {
        const match = props.className.match(/language-(\w+)/);
        language = match ? match[1] : undefined;
      }
      const codeString = node.children[0].value ?? '';
      return (
        <SyntaxHighlighter style={nord} language={language} PreTag="div" {...props}>
          {codeString}
        </SyntaxHighlighter>
      );
    },
  };

  return message.content !== '' ? (
    <div className={`mb-4 flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`p-2 rounded-md ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'}`}>
        <Markdown remarkPlugins={[remarkGfm, supersub]} children={message.content} components={components as never} />
      </div>
    </div>
  ) : (
    <></>
  );
};

export default ChatMessage;
