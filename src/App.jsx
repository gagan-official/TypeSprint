import { useEffect, useRef, useState } from "react";
import "./App.css";
import { words } from "./data/words";
import shuffleArray from "./utils/shuffle";
import { GrPowerReset } from "react-icons/gr";
import Modal from "./components/Modal";

const green = "#05df7250";
const red = "#ff646750";

// const shuffledWordsArray = shuffleArray(words);
// const shuffleWordsString = shuffledWordsArray.join(" ");

function App() {
  // Shuffled words array
  const [shuffledWordsArray, setShuffledWordsArray] = useState(
    shuffleArray(words)
  );
  // Text States
  const [text, setText] = useState("");
  const [wholeText, setWholeText] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [timerStarted, setTimerStarted] = useState("");
  const [wpmScore, setWpmScore] = useState(0);
  const [detailedScore, setDetailedScore] = useState({
    totalWords: 0,
    wrongWords: 0,
  });

  // Modal States
  const [openModal, setOpenModal] = useState(false);
  const timerId = useRef(null);
  const inputRef = useRef(null);

  const handleReset = () => {
    setTimerStarted("");
    clearTimeout(timerId.current);
    setText("");
    setCurrentWordIndex(0);
    setWholeText([]);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    if (timerStarted === "stopped") {
      const correctWords = wholeText.filter(
        (word, i) => shuffledWordsArray[i] === word
      );
      setWpmScore(correctWords.length);
      setDetailedScore((prev) => {
        prev.totalWords = wholeText.length;
        prev.wrongWords = wholeText.length - correctWords.length;
        return prev;
      });
      handleReset();
      setOpenModal(true);
      inputRef.current.blur();
      console.log("Correct words count:", correctWords.length);
    }
  }, [timerStarted, wholeText, shuffledWordsArray]);

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
          // const matchcurrentWordIndex = word.includes(text);
          return (
            <span
              className="pl-[3px] pr-[1px] -mx-[2px] py-[1px] rounded-[5px]"
              key={`word-${i}`}
              style={
                currentWordIndex === i
                  ? {
                      border: "1px solid",
                      backgroundColor:
                        text.length && word.includes(text) ? green : red,
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
          ref={inputRef}
          autoFocus
          className="border border-gray-400 rounded-[5px] w-full text-[25px] py-[2px] px-[6px]"
          type="text"
          value={text.trimEnd()}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (!timerStarted && e.key.length === 1) {
              console.log("if hitted, timer started");
              setTimerStarted("started");
              timerId.current = setTimeout(
                () => setTimerStarted("stopped"),
                1000 * 60
              );
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

      {/* Result Modal */}
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        className="text-center"
      >
        <div className="scoreContainer mb-[1rem] p-5 rounded-lg bg-gray-100 border border-gray-300">
          <h3 className="text-2xl">
            <strong className="font-semibold">WPM Score:</strong> {wpmScore}
          </h3>
          <h4 className="font-semibold mt-[1rem] text-md">
            <strong className="font-semibold">Total Words Count:</strong>{" "}
            <span className="text-green-700">{detailedScore.totalWords}</span>
            <br />
            <strong className="font-semibold">Wrong Words:</strong>{" "}
            <span className="text-red-700">{detailedScore.wrongWords}</span>
          </h4>
        </div>
        <button
          title="Replay"
          className="replay inline-flex items-center justify-center w-full gap-[0.5rem] bg-green-500 border border-green-500 active:scale-95 transition-transform text-[20px] text-[#fff] py-[.5rem] px-[1rem] shrink-0 cursor-pointer rounded-[7px]"
          onClick={() => (
            setShuffledWordsArray((prev) => shuffleArray(prev)),
            setWpmScore(0),
            setDetailedScore(0),
            setOpenModal(false),
            inputRef.current.focus()
          )}
        >
          Replay <GrPowerReset />
        </button>
      </Modal>
    </>
  );
}

export default App;
