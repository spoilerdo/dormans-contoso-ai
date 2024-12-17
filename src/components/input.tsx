import React, { JSX } from 'react';

const Input = (): JSX.Element => {
  const submitMessage = () => {};

  return (
    <>
      <h1>Chat with AI</h1>
      <div id="chatContainer"></div>
      <input id="userInput" type="text" />
      <button onclick={submitMessage}>Send</button>
    </>
  );
};

export default Input;
