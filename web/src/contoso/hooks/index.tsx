import { useState } from 'react';
import useMessages, { Messages } from './messages';

export type Contoso = Messages & {
  cookie: string;
  setCookie: React.Dispatch<React.SetStateAction<string>>;
};

const useContoso = (): Contoso => {
  const [cookie, setCookie] = useState('');

  return {
    ...useMessages({ cookie }),
    cookie,
    setCookie,
  };
};

export default useContoso;
