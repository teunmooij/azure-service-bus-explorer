import { commands, ExtensionContext, window } from 'vscode';
import { commandIds, stateKeys } from '../constants';

export const initAddConnectionCommand = (
  context: ExtensionContext,
  treeDataProvider: { refresh: () => void }
) =>
  commands.registerCommand(commandIds.addConnection, async () => {
    const connectionString = await window.showInputBox({
      title: 'Please provide connection string',
    });
    if (!connectionString) {
      window.showErrorMessage('Connection string was not provided');
      return;
    }

    const name = await window.showInputBox({
      title: 'Provide name to store the connection (optional)',
    });

    if (name) {
      const currentConnections =
        context.globalState.get<string[]>(stateKeys.connections) || [];
      if (!currentConnections.includes(name)) {
        context.globalState.update(stateKeys.connections, [
          ...currentConnections,
          name,
        ]);
      }
      treeDataProvider.refresh();
    }

    window.showInformationMessage(`Connection ${name} added`);
  });
