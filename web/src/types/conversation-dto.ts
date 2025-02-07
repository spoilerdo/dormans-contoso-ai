import Roles from '../enums/roles';

type ConversationDTO = {
  content: string;
  date: string;
  id: string;
  role: Roles;
};

export default ConversationDTO;
