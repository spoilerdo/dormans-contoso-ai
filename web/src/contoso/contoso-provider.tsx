import { JSX } from 'react';
import createProvider, { ProviderProp } from '../utils/provider-abstraction';
import useContoso, { Contoso } from './hooks';
import ContosoInput from './contoso-input';

const { Provider: ContosoContext, useProvider: useContosoProviderContext } = createProvider<Contoso>();

const ContosoProvider = ({ children }: ProviderProp): JSX.Element => (
  <ContosoContext value={useContoso()}>
    <ContosoInput />
    {children}
  </ContosoContext>
);

export { ContosoProvider, useContosoProviderContext };
