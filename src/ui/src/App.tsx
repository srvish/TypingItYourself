import "./App.css";
import "./components/Typing";
import Typing from "./components/Typing";
import Stats from "./components/Stats";
import { useEffect, useState } from "react";

function App() {
  const [textContent, setTextContent] = useState<string>();

  // listen for vs event for text
  useEffect(() => {
    const handleVSCodeText = (message: MessageEvent) => {
      if (message.data.type === "VSCodeText") {
        setTextContent(message.data.data);
      }
    };
    window.addEventListener("message", handleVSCodeText);

    // return () => {
    //   window.removeEventListener("message", handleVSCodeText);
    // };
  });

  return (
    <>
      <div className="head">
        <Stats text={"Timer"} value={0} />
        <Stats text={"Speed"} value={0} />
        <Stats text={"Accurancy"} value={0} />
        <Stats text={"Mistakes"} value={0} />
      </div>
      <Typing
        TypingText={
          textContent ??
          "Hello, try typing the sample text.\nYou are able to see this line because original text not detected for typing.\nPlease try new selection."
        }
      />
    </>
  );
}

export default App;
