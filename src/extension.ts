// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('contoso.openChat', () => {
    const panel = vscode.window.createWebviewPanel('chatbot', 'AI Chatbot', vscode.ViewColumn.One, {
      enableScripts: true,
    });

    // let cssSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'web', 'dist', 'index.css'));
    let scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(context.extensionUri, 'web', 'dist', 'index.js'));

    // <link rel="stylesheet" href="${cssSrc}" />
    panel.webview.html = `
      <!DOCTYPE html>
        <html lang="en">
          <head>
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
            <script src="${scriptSrc}"></script>
          </body>
        </html>
        `;
  });

  context.subscriptions.push(disposable);
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

// This method is called when your extension is deactivated
export function deactivate() {}
