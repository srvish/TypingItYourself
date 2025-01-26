// https://github.com/microsoft/vscode-extension-samples/blob/main/helloworld-minimal-sample/extension.js
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { startTyping } from "./typing";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "typingityourself.typeItYourself",
    () => {
      startTyping(context);
      vscode.window.showInformationMessage("Typing mode started");
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
