import { ExtensionContext, window } from 'vscode';
import { registerCommands } from './commands';
import { getNamespacesTreeDataProvider } from './namespaceTreeDataProvider';

export const initNamespaces = (context: ExtensionContext) => {
  const treeDataProvider = getNamespacesTreeDataProvider(context);
  registerCommands(context, treeDataProvider);
  window.registerTreeDataProvider('namespaces', treeDataProvider);
};
