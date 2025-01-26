import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function startTyping(context: vscode.ExtensionContext): void {
  const extensionPath = context.extensionPath;
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    createPanelUsingReact(extensionPath, editor);
  } else {
    vscode.window.showErrorMessage("No active window detected");
  }
}

function createPanelUsingReact(
  extensionPath: string,
  editor: vscode.TextEditor
): void {
  // create WebViewPanel with resource permission
  const htmlAssetPath = path.join(extensionPath, "src", "out", "assets");
  const panel = vscode.window.createWebviewPanel(
    "ChangedToTypingMode",
    `Typing Mode - ${path.basename(editor.document.fileName)}`,
    vscode.ViewColumn.One,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
      localResourceRoots: [vscode.Uri.file(htmlAssetPath)],
    }
  );

  panel.webview.html = getHtmlForPanel(extensionPath, htmlAssetPath, panel);
  const text = editor.document.getText();
  panel.webview.postMessage({
    type: "VSCodeText",
    data: text,
  });
}

function getHtmlForPanel(
  extensionPath: string,
  htmlAssetPath: string,
  panel: vscode.WebviewPanel
): string {
  // load react html, js and css to panel webview
  let htmlContent = fs.readFileSync(
    path.join(extensionPath, "src", "out", "index.html"),
    "utf-8"
  );
  const assetPaths = getJsAndCssFilesSync(htmlAssetPath);
  assetPaths.forEach((pt) => {
    const ptWebViewUri = panel.webview.asWebviewUri(vscode.Uri.file(pt));
    htmlContent = htmlContent.replaceAll(
      `/assets/${path.basename(pt)}`,
      String(ptWebViewUri)
    );
  });

  return htmlContent;
}

function getJsAndCssFilesSync(directoryPath: string): string[] {
  try {
    const files = fs.readdirSync(directoryPath);
    return files
      .filter((file) => file.endsWith(".js") || file.endsWith(".css"))
      .map((file) => path.join(directoryPath, file));
  } catch (error) {
    console.error(`Error reading directory: ${error}`);
    return [];
  }
}
