import { JSX } from 'react';

import { ContosoProvider } from './contoso/contoso-provider';
import Chat from './components/chat';

const App = (): JSX.Element => {
  return (
    <div className="flex flex-col w-full h-full bg-gray-800 shadow-lg overflow-hidden">
      <ContosoProvider>
        <Chat />
      </ContosoProvider>
    </div>
  );
};

export default App;
