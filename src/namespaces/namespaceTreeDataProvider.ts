import { ExtensionContext, TreeItem, TreeDataProvider, EventEmitter, Event } from 'vscode';

class NamespaceTreeDataProvider implements TreeDataProvider<TreeItem> {
  private onDidChangeTreeDataEmitter = new EventEmitter<TreeItem | undefined | null | void>();

  readonly onDidChangeTreeData: Event<void | TreeItem | TreeItem[] | null | undefined> = this.onDidChangeTreeDataEmitter.event;
  
  constructor(private context: ExtensionContext) {
  }
  
  getTreeItem(element: TreeItem) {
    return element;
  }
  getChildren() {
    const children = this.context.globalState.get<string[]>('connections') || [];
    return children.map(child => new TreeItem(child));
  }

  refresh() {
    this.onDidChangeTreeDataEmitter.fire();
  }
}

export const getNamespacesTreeDataProvider = (context: ExtensionContext) => new NamespaceTreeDataProvider(context);
