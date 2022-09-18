// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { getNamespacesTreeDataProvider } from './namespacesView';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "azure-service-bus-explorer" is now active!');

	const treeDataProvider = getNamespacesTreeDataProvider(context);
	vscode.window.registerTreeDataProvider('namespaces', treeDataProvider);

	const addConnectionCommand = vscode.commands.registerCommand('azure-service-bus-explorer.addConnection', async () => {
		const connectionString = await vscode.window.showInputBox({ title: "Please provide connection string" });
		if (!connectionString) {
			vscode.window.showErrorMessage('Connection string was not provided');
			return;
		};

		const name = await vscode.window.showInputBox({ title: "Provide name to store the connection (optional)" });

		if (name) {
			const currentConnections = context.globalState.get<string[]>('connections') || [];
			if (!currentConnections.includes(name)) {
				context.globalState.update('connections', [...currentConnections, name]);
			}
			treeDataProvider.refresh();
		}

		vscode.window.showInformationMessage(`Connection ${name} added`);
	});

	const removeConnectionCommand = vscode.commands.registerCommand('azure-service-bus-explorer.removeConnection', async (item) => {
		const remove = await vscode.window.showWarningMessage(`Are you sure you want to remove connection ${item.label}?`, 'Yes', 'No');
		if (remove === 'Yes') {
			const connections = context.globalState.get<string[]>('connections')!;
			context.globalState.update('connections', connections.filter(connection => connection !== item.label));

			treeDataProvider.refresh();
			vscode.window.showInformationMessage(`Connection ${item.label} removed`);
		}
	});


	context.subscriptions.push(addConnectionCommand);
	context.subscriptions.push(removeConnectionCommand);
}

// this method is called when your extension is deactivated
export function deactivate() { }
