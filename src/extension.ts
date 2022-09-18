import { ExtensionContext } from 'vscode';
import { initNamespaces } from './namespaces';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  initNamespaces(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
