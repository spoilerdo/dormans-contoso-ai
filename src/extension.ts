// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as ReactDOM from 'react-dom';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand("contoso.openChat", () => {
    const panel = vscode.window.createWebviewPanel(
      "chatbot",
      "AI Chatbot",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    ReactDOM

    panel.webview.onDidReceiveMessage(async (message) => {
      switch (message.command) {
        case "selectFiles":
          const options: vscode.OpenDialogOptions = {
            canSelectMany: true,
            openLabel: "Select Files",
          };

          const fileUris = await vscode.window.showOpenDialog(options);
          if (fileUris && fileUris.length > 0) {
            const fileContents = await Promise.all(
              fileUris.map((uri) => readFile(uri.fsPath))
            );
            const responses = await Promise.all(
              fileContents.map((content) => processFileContent(content))
            );
            const resultContent = responses.join("\n\n");

            panel.webview.postMessage({
              command: "displayResult",
              result: resultContent,
            });
          }
          break;
      }
    });
  });

  context.subscriptions.push(disposable);
}

function getWebviewContent() {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>AI Chatbot</title>
        </head>
        <body>
            <h1>Chat with AI</h1>
            <div id="chatContainer"></div>
            <input id="userInput" type="text" />
            <button onclick="sendMessage()">Send</button>

            <script>
                const vscode = acquireVsCodeApi();

                function sendMessage() {
                    const userInput = document.getElementById('userInput').value;
                    fetch('https://chat.whyellow.app/conversation', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ message: userInput })
                    })
                    .then(response => response.json())
                    .then(data => {
                        const chatContainer = document.getElementById('chatContainer');
                        chatContainer.innerHTML += '<p>You: ' + userInput + '</p>';
                        chatContainer.innerHTML += '<p>Bot: ' + data.response + '</p>';
                    });
                }

                document.getElementById('selectFilesButton').addEventListener('click', () => {
                    vscode.postMessage({ command: 'selectFiles' });
                });
            </script>
        </body>
        </html>
    `;
}

// async function processFileContent(content: string): Promise<string> {
//   const response = await fetch("https://chat.whyellow.app/conversation", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ content }),
//   });
//   const data = await response.json();
//   return data.convertedContent; // Adjust according to your API response structure
// }

function sendMessage() {
  const response = fetch("https://chat.whyellow.app/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: options.messages,
    }),
    signal: abortSignal,
  }).then(response => {
	if (response?.body) {
        const reader = response.body.getReader()

        let runningText = ''
        while (true) {
          setProcessMessages(messageStatus.Processing)
          const { done, value } = await reader.read()
          if (done) break

          var text = new TextDecoder('utf-8').decode(value)
          const objects = text.split('\n')
          objects.forEach(obj => {
            try {
              if (obj !== '' && obj !== '{}') {
                runningText += obj
                result = JSON.parse(runningText)
                if (result.choices?.length > 0) {
                  result.choices[0].messages.forEach(msg => {
                    msg.id = result.id
                    msg.date = new Date().toISOString()
                  })
                  if (result.choices[0].messages?.some(m => m.role === ASSISTANT)) {
                    setShowLoadingMessage(false)
                  }
                  result.choices[0].messages.forEach(resultObj => {
                    processResultMessage(resultObj, userMessage, conversationId)
                  })
                } else if (result.error) {
                  throw Error(result.error)
                }
                runningText = ''
              }
            } catch (e) {
              if (!(e instanceof SyntaxError)) {
                console.error(e)
                throw e
              } else {
                console.log('Incomplete message. Continuing...')
              }
            }
          })
        }
  });

  return response;
}

// This method is called when your extension is deactivated
export function deactivate() {}
