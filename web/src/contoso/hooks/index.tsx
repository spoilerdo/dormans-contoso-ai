import { useState } from 'react';

export type Contoso = {
  cookie: string;
  setCookie: React.Dispatch<React.SetStateAction<string>>;
};

const useContoso = (): Contoso => {
  const [cookie, setCookie] = useState('');

  return {
    cookie,
    setCookie,
  };
};

export default useContoso;
