import * as vscode from 'vscode';
import * as cp from 'child_process';

let serverProcess: cp.ChildProcess;

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Add new services in the future
  const serverPath = vscode.Uri.joinPath(context.extensionUri, 'dist', 'contoso-service.js').path;
  serverProcess = cp.spawn('node', [serverPath], {
    detached: true,
    stdio: 'inherit',
  });
  serverProcess.unref();

  let disposable = vscode.commands.registerCommand('contoso.open', () => {
    const panel = vscode.window.createWebviewPanel('chatbot', 'VSCode AI Chatbot eco-system', vscode.ViewColumn.One, {
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

// This method is called when your extension is deactivated
export function deactivate() {
  if (serverProcess) {
    serverProcess.kill();
  }
}
