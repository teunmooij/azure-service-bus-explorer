import { ExtensionContext } from 'vscode';
import { initAddConnectionCommand } from './addConnection';
import { initRemoveConnectionCommand } from './removeConnection';

export const registerCommands = (
  context: ExtensionContext,
  treeDataProvider: { refresh: () => void }
) => {
  context.subscriptions.push(
    initAddConnectionCommand(context, treeDataProvider),
    initRemoveConnectionCommand(context, treeDataProvider)
  );
};
