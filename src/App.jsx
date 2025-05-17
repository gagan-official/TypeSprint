import { useEffect, useState } from "react";
import "./App.css";
import { words } from "./data/words";
import shuffleArray from "./utils/shuffle";

const green = "#05df7250";
const red = "#ff646750";

const shuffledWordsArray = shuffleArray(words);
const shuffleWordsString = shuffledWordsArray.join(" ");

function App() {
  const [text, setText] = useState("");
  const [wholeText, setWholeText] = useState("");
  const [currentWord, setCurrentWord] = useState(0);

  const handleChange = (e) => {
    setText(e.target.value);
    setWholeText(e.target.value);
  };

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setText("");
  //   });
  //   return () => clearTimeout(timerId);
  // }, [currentWord]);

  return (
    <>
      <div className="topHeading text-center">
        <h1 className="text-[#fff] mb-[10px]">Welcome to TypeSprint!</h1>
        <p>Let's see how fast can you type.</p>
      </div>

      {/* Text display area */}
      <div className="paraCard mt-[40px] mb-[20px] py-[5px] px-[10px] rounded-[10px] bg-[#fff2]">
        {shuffledWordsArray.map((word, i) => {
          const matchCurrentWord = word.includes(text);
          return (
            <span
            className="pl-[3px] pr-[1px] -mx-[2px] py-[1px] rounded-[5px]"
              key={`word-${i}`}
              style={
                currentWord === i && text.length
                  ? {
                      backgroundColor: matchCurrentWord ? green : red,
                    }
                  : {}
              }
            >
              {word}{" "}
            </span>
          );
        })}
      </div>

      {/* Typing area */}
      <input
        className="border border-gray-400 rounded-[5px] w-full text-[25px] py-[2px] px-[6px]"
        type="text"
        value={text.trimEnd()}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === " ") {
            setText("");
            setCurrentWord(currentWord + 1);
          }
        }}
      />
    </>
  );
}

export default App;
