import { commands, ExtensionContext, window } from 'vscode';
import { commandIds, stateKeys } from '../constants';

export const initRemoveConnectionCommand = (
  context: ExtensionContext,
  treeDataProvider: { refresh: () => void }
) =>
  commands.registerCommand(commandIds.removeConnection, async (item) => {
    const remove = await window.showWarningMessage(
      `Are you sure you want to remove connection ${item.label}?`,
      'Yes',
      'No'
    );
    if (remove === 'Yes') {
      const connections = context.globalState.get<string[]>(
        stateKeys.connections
      )!;
      context.globalState.update(
        stateKeys.connections,
        connections.filter((connection) => connection !== item.label)
      );

      treeDataProvider.refresh();
      window.showInformationMessage(`Connection ${item.label} removed`);
    }
  });
