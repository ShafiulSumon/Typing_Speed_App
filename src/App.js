import { useState, useEffect, useRef } from "react";
import { generate, count } from "random-words";
import "bulma/css/bulma.min.css";

const NUMB_OF_WORDS = 200;
const SECONDS = 30;

function App() {
  const [words, setWords] = useState([]);
  const [countDown, setCountDown] = useState(SECONDS);
  const [currInput, setCurrInput] = useState("");
  const [currWordIndex, setCurrWordIndex] = useState(0);
  const [currChar, setCurrChar] = useState("");
  const [currCharIndex, setCurrCharIndex] = useState(-1);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [status, setStatus] = useState("waiting");
  const [btnHidden, setBtnHidden] = useState(false);
  const textInput = useRef(null);


  useEffect(() => {
    if(status === "started") {
      textInput.current.focus();
    }
  }, [status]);
  
  useEffect(() => {
    setWords(generateWords());
  }, []);

  function generateWords() {
    return new Array(NUMB_OF_WORDS).fill(null).map(() => generate());
  }

  function startTimer() {
    setBtnHidden(true);
    if(status === "finished") {
      setWords(generateWords());
      setCurrWordIndex(0);
      setCorrect(0);
      setIncorrect(0);
      setCurrCharIndex(-1);
      setCurrChar("");
    }
    if(status !== "started") {
      setStatus("started");
      const interval = setInterval(
        () =>
          setCountDown((prev) => {
            if (prev === 0) {
              clearInterval(interval);
              setBtnHidden(false);
              setCurrInput("");
              setStatus("finished");
              return SECONDS;
            } else {
              return prev - 1;
            }
          }),
        1000
      );
    }

  }

  function checkMatch() {
    const wordToCompare = words[currWordIndex];
    const doesItMatch = wordToCompare === currInput.trim();
    if(doesItMatch) {
      setCorrect(correct + 1);
    }
    else {
      setIncorrect(incorrect + 1);
    }
  }

  function handleKeyDown({keyCode, key}) {
    if(keyCode === 32) {
      checkMatch();
      setCurrInput("");
      setCurrWordIndex(currWordIndex + 1);
      setCurrCharIndex(-1);
    }
    else if(keyCode ===  8) {
      setCurrCharIndex(currCharIndex==-1 ? -1 : currCharIndex - 1);
      setCurrChar("");
    }
    else {
      setCurrCharIndex(currCharIndex + 1);
      setCurrChar(key);
    }
  }

  function getCharClass(wordIdx, charIdx, char) {
    if(wordIdx === currWordIndex && charIdx === currCharIndex && currChar && status !== "finished") {
      if(char === currChar) {
        return "has-background-success";
      }
      else {
        return "has-background-danger";
      }
    }
    else if(wordIdx === currWordIndex && currCharIndex >= words[currWordIndex].length) {
      return "has-background-danger";
    }
    else {
      return "";
    }
  }

  return (
    <div className="App">
      <div className="section">
        <div className="is-size-1 has-text-centered has-text-primary">
          <h2>{countDown}</h2>
        </div>
      </div>

      <div className="control is-expanded section">
        <input
          ref={textInput}
          disabled={status !== "started"}
          type="text"
          className="input"
          onKeyDown={handleKeyDown}
          value={currInput}
          onChange={(e) => setCurrInput(e.target.value)}
        />
      </div>

      <div hidden={btnHidden} className="section">
        <button className="button is-info is-fullwidth" onClick={startTimer}>
          Start
        </button>
      </div>

      {status === "started" && (
        <div className="section">
          <div className="card">
            <div className="card-content">
              <div className="content">
                {words.map((word, index) => (
                  <span key={index}>
                    <span>
                      {word.split("").map((char, i) => (
                        <span className={getCharClass(index, i, char)} key={i}>{char}</span>
                      ))}
                    </span>
                    <span> </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {status === "finished" && (
        <div className="section">
          <div className="columns">
            <div className="column has-text-centered">
              <p className="is-size-5">Words per minute:</p>
              <p className="has-text-primary is-size-1">{correct}</p>
            </div>
            <div className="column has-text-centered">
              <p className="is-size-5">Accuracy:</p>
              <p className="has-text-info is-size-1">{Math.round((correct / (correct + incorrect)) * 100)}%</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
