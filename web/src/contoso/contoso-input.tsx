import { JSX } from 'react';
import { useContosoProviderContext } from './contoso-provider';
import CheckCircle from '../components/icons/check-circle';

const ContosoInput = (): JSX.Element => {
  const { cookie, setCookie } = useContosoProviderContext();

  return (
    <div className="my-4 flex justify-end">
      <input
        className="p-2 border border-gray-600 rounded-md focus:outline-none bg-gray-700 text-white"
        placeholder="Fill in your cookie..."
        value={cookie}
        onChange={(e) => setCookie(e.target.value)}
      />
      {cookie !== '' && (
        <span className="mr-4 ml-2">
          <CheckCircle />
        </span>
      )}
    </div>
  );
};

export default ContosoInput;
