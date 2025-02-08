import { JSX, useState } from 'react';

const ContosoInput = (): JSX.Element => {
  const [cookie, setCookie] = useState('');

  return (
    <>
      <input
        className="flex-grow p-2 border border-gray-600 rounded-l-md focus:outline-none focus:ring focus:border-blue-300 bg-gray-700 text-white"
        placeholder="Fill in your cookie..."
        value={cookie}
        onChange={(e) => setCookie(e.target.value)}
      />
      {cookie !== '' && <span className="material-symbols-outlined">check_circle</span>}
    </>
  );
};

export default ContosoInput;
