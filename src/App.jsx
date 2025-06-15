import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { words } from "./data/words";
import shuffleArray from "./utils/shuffle";
import { GrPowerReset } from "react-icons/gr";

const green = "#05df7250";
const red = "#ff646750";

const shuffledWordsArray = shuffleArray(words);
const shuffleWordsString = shuffledWordsArray.join(" ");

function App() {
  const [text, setText] = useState("");
  const [wholeText, setWholeText] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);
  const [wpmScore, setWpmScore] = useState(0);
  const timerId = useRef(null);

  const handleReset = () => {
    setTimerStarted(false);
    setText("");
    setCurrentWordIndex(0);
    setWholeText([]);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleScore = useCallback(() => {
    const correctWords = wholeText.filter((word, i) => {
      return shuffledWordsArray[i] === word;
    });
    setWpmScore(correctWords.length); // Optional: show it
    handleReset();
    console.log("Correct words count:", correctWords.length);
  }, [wholeText]);
  // Checkpoint ⛳: This is wrong as this handleScore will be recreated that means will hit useffect everytime wholeText is changed.
  // So have to continue to change the logic from here.

  useEffect(() => {
    if (timerStarted) timerId.current = setTimeout(handleScore, 1000 * 6);

    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
        console.log("timer stopped, flushed out");
      }
    };
  }, [timerStarted, handleScore]);

  console.log(wholeText);

  return (
    <>
      <div className="topHeading text-center">
        <h1 className="text-[#fff] mb-[10px]">Welcome to TypeSprint!</h1>
        <p>Let's see how fast can you type.</p>
        <h3>
          <strong className="font-semibold">WPM Score:</strong> {wpmScore}
        </h3>
      </div>

      {/* Text display area */}
      <div className="paraCard mt-[40px] mb-[20px] py-[5px] px-[10px] rounded-[10px] bg-[#fff2]">
        {shuffledWordsArray.map((word, i) => {
          // const matchcurrentWordIndex = word.includes(text);
          return (
            <span
              className="pl-[3px] pr-[1px] -mx-[2px] py-[1px] rounded-[5px]"
              key={`word-${i}`}
              style={
                currentWordIndex === i
                  ? {
                      border: "1px solid",
                      backgroundColor: text.length && word.includes(text) ? green : red,
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
      <div className="typingWrapper flex gap-[5px]">
        <input
          className="border border-gray-400 rounded-[5px] w-full text-[25px] py-[2px] px-[6px]"
          type="text"
          value={text.trimEnd()}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (!timerStarted && e.key.length === 1) {
              console.log("if hitted, timer started");
              setTimerStarted(true);
            }
            if (e.key === " ") {
              e.preventDefault();
              setWholeText((prev) => [...prev, text.trim()]);
              setCurrentWordIndex((prev) => prev + 1);
              setText("");
            }
          }}
        />
        <button
          title="Reset"
          className="bg-blue-500 border border-blue-500 active:scale-95 transition-transform text-[20px] text-[#fff] p-[12px] shrink-0 cursor-pointer rounded-[7px]"
          onClick={() => (handleReset(), setWpmScore(0))}
        >
          <GrPowerReset />
        </button>
      </div>
    </>
  );
}

export default App;
