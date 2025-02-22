import Roles from '../enums/roles';

type ChatResponseMessageDTO = {
  role: Roles;
  content: string;
};

type ChatResponseChoiceDTO = {
  messages: ChatResponseMessageDTO[];
};

type ChatResponseDTO = {
  choices: ChatResponseChoiceDTO[];
};

export default ChatResponseDTO;
