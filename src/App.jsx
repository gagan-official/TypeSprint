import { useEffect, useRef, useState } from "react";
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
  const [currentWord, setCurrentWord] = useState(0);
  const [wpmScore, setWpmScore] = useState(0);
  const minuteTimer = useRef(null);
  const timerStarted = useRef(false);

  const handleReset = () => {
    setText("");
    setCurrentWord(0);
    clearTimeout(minuteTimer.current);
    timerStarted.current = false;
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleScore = () => {
    const correctWords = wholeText.filter((word, i) => {
      return shuffledWordsArray[i] === word;
    });
    setWpmScore(correctWords.length); // Optional: show it
    console.log("Correct words count:", correctWords.length);
  };

  // useEffect(() => {
  //   console.log("useeffect hit");
  //   console.log(wholeText, wholeText.length === 1, minuteTimer.current);
  //   if (wholeText.length === 1) {
  //     console.log("useeffect iff hit");
  //     minuteTimer.current = setTimeout(() => {
  //       console.log("useeffect setTimeout hit");
  //       handleScore();
  //       handleReset();
  //       console.log("timer hit");
  //     }, 1000 * 6);
  //   }
  // }, [wholeText]);

  console.log(wholeText);

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
      <div className="typingWrapper flex gap-[5px]">
        <input
          className="border border-gray-400 rounded-[5px] w-full text-[25px] py-[2px] px-[6px]"
          type="text"
          value={text.trimEnd()}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (!timerStarted.current && e.key.length === 1) {
              timerStarted.current = true;
              minuteTimer.current = setTimeout(() => {
                handleScore();
                handleReset();
                setWholeText([]);
                timerStarted.current = false;
              }, 1000 * 6);
            }

            if (e.key === " ") {
              e.preventDefault();
              setWholeText((prev) => [...prev, text.trim()]);
              setCurrentWord((prev) => prev + 1);
              setText("");
            }
          }}
        />
        <button
          title="Reset"
          className="bg-blue-500 border border-blue-500 active:scale-95 transition-transform text-[20px] text-[#fff] p-[12px] shrink-0 cursor-pointer rounded-[7px]"
          onClick={() => (handleReset(), setWholeText([]))}
        >
          <GrPowerReset />
        </button>
      </div>
    </>
  );
}

export default App;
