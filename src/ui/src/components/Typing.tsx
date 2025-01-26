import React, {
  useRef,
  // useEffect,
  useState,
} from "react";
// import { Stopwatch } from "../utils/Stopwatch";
import { processText, TextProps } from "../utils/sourceTextProcessor";
import "./Typing.css";

interface TypingProps {
  TypingText: string;
}

const Typing = ({ TypingText }: TypingProps) => {
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const [keyCount, setKeyCount] = useState<number>(0);
  const [textArray, setTextArray] = useState<TextProps[][]>([]);
  const [searchTextArray, setSearchTextArray] = useState<TextProps[]>([]);
  const typingDiv = useRef<HTMLDivElement | null>(null);
  //   const [stopwatch, setStopwatch] = useState<Stopwatch | null>(null);
  //   const [elapsedTime, setElapsedTime] = useState<number>(0);

  //   useEffect(() => {
  //     const stopwatchObj = new Stopwatch(setElapsedTime);
  //     setStopwatch(stopwatchObj);

  //     return () => {
  //       stopwatchObj.stop();
  //     };
  //   }, []);

  const handleTypingFocus = () => {
    if (textArray.length == 0) {
      const text = processText(TypingText);
      const flatText = text.map((txt, index) => {
        return [...txt, new TextProps((index + 1) * TypingText.length, "\n")];
      });
      setTextArray(flatText);
      setSearchTextArray(flatText.flat());
    }
    setIsEnabled(true);
    if (typingDiv.current) {
      typingDiv.current.focus();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    event.preventDefault();
    const key = event.key;
    if (event.key === "Backspace") {
      if (keyCount) {
        setKeyCount(keyCount - 1);
        searchTextArray[keyCount - 1].IsVisible = false;
      }
    }

    if (
      key !== "Enter" &&
      (key.length != 1 ||
        keyCount >= searchTextArray.length ||
        (key === " " && searchTextArray[keyCount].Char === "\n"))
    ) {
      return;
    }

    searchTextArray[keyCount].IsVisible = true;
    searchTextArray[keyCount].IsValid =
      event.key == searchTextArray[keyCount].Char;
    setKeyCount(keyCount + 1);
  };
  const getValidCharacterClass = (ch: TextProps): string => {
    const classes: string[] = [];
    if (!ch.IsVisible) classes.push("typing-char-hide");
    if (!ch.IsValid) classes.push("typing-char-invalid");

    return classes.join(" ");
  };

  return (
    <>
      <div className="typing">
        <div
          className={
            isEnabled ? "typing-shadow-text" : "typing-shadow-text typing-blur"
          }
          onClick={handleTypingFocus}
          onBlur={() => {
            setIsEnabled(false);
          }}
        >
          {TypingText}
        </div>
        <div
          ref={typingDiv}
          className="typing-text"
          tabIndex={0}
          onClick={handleTypingFocus}
          onKeyDown={(event) => handleKeyDown(event)}
        >
          {textArray.map((line: TextProps[], index: number) => {
            return (
              <React.Fragment key={index}>
                {line.map((ch) => {
                  return ch.Char !== "\n" ? (
                    <span className={getValidCharacterClass(ch)} key={ch.Id}>
                      {ch.Char}
                    </span>
                  ) : (
                    <br className={getValidCharacterClass(ch)} />
                  );
                })}
              </React.Fragment>
            );
          })}
          <span key="cursor" id="cursor" className="cursor"></span>
        </div>
      </div>
    </>
  );
};

export default Typing;
