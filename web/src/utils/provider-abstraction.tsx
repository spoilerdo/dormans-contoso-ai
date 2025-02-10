import { createContext, JSX, ReactNode, useContext } from 'react';

export type ProviderProp = {
  children: ReactNode;
};

type Props<T> = {
  children: ReactNode;
  value: T;
};

type ProviderResult<T> = {
  Provider: (props: Props<T>) => JSX.Element;
  useProvider: () => T;
};

const createProvider = <T,>(): ProviderResult<T> => {
  const context = createContext<T>({} as T);

  const Provider = ({ children, value }: Props<T>): JSX.Element => <context.Provider value={value}>{children}</context.Provider>;

  const useProvider = (): T => useContext<T>(context);

  return { Provider, useProvider };
};

export default createProvider;
