import { useState, useEffect, useRef } from 'react';
import { generate, count } from 'random-words';
import "bulma/css/bulma.min.css";

const NUMBER_OF_WORDS = 200;
const SECONDS = 30;

function Another() {

    const [countDown, setCountDown] = useState(SECONDS);
    const [words, setWords] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [currWordIndex, setCurrWordIndex] = useState(0);

    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState(0);

    const startTimer = useRef(false);

    useEffect(() => {
        setWords(generateWords());
    }, []);

    const runTimer = () => {
        const interval = setInterval((value) => {
            if(value > 0) {
                return setCountDown(value - 1);
            }
            else {
                clearInterval(interval);
                return SECONDS;
            }
        }, 1000);
    };

    const generateWords = () => {
        return new Array(NUMBER_OF_WORDS).fill(null).map(() => generate());
    };

    const checkMatch = () => {
        if(userInput.trim() === words[currWordIndex]) {
            setCorrectWords(correctWords + 1);
        }
        else {
            setIncorrectWords(incorrectWords + 1);
        }
    };

    const handleKeyDown = ({keyCode, key}) => {
        if(keyCode === 32) {
            checkMatch();
            setCurrWordIndex(currWordIndex + 1);
            setUserInput("");
        }
    };

    const wordBoldClass = (idx) => {
        if(idx === currWordIndex) {
            return "is-size-5 has-text-weight-bold";
        }
        else {
            return "";
        }
    };

    const refreshPage = () => {
        window.location.reload();
    };

    return (
        <div>
            {/* Header Text */}
            <div className="is-size-1 has-text-centered">
                <h1>Typing Test</h1>
            </div>

            {/* Timer Section */}
            <div className="is-size-2 has-text-centered has-text-danger">
                <h2>{countDown}</h2>
            </div>


            <div className="section">
                <p>{words.map( (word, idx) => (
                    <span key={idx}>
                        <span className={wordBoldClass(idx)}>{word} </span>
                    </span>
                ))}</p>
            </div>

            {/* Input Field */}
            <div className="control is-expanded section">
                <input 
                    className="input"
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </div>
            
            {/* Output Section */}
            <div className="section has-text-centered">
                <div className="columns">
                    <div className="column">
                        <p className="subtitle">Correct Words</p>
                        <p className="is-size-3 subtitle">{correctWords}</p>
                    </div>
                    <div className="column">
                        <p className="subtitle">Incorrect Words</p>
                        <p className="is-size-3 subtitle">{incorrectWords}</p>
                    </div>
                    <div className="column">
                        <p className="subtitle">Words per minute</p>
                        <p className="is-size-3 subtitle">{correctWords*2}</p>
                    </div>

                    <div className="column">
                        <p className="subtitle">Accuracy</p>
                        <p className="is-size-3 subtitle">{Math.round((correctWords / (correctWords+incorrectWords)) * 100)}%</p>
                    </div>
                </div>

            </div>


            <div className="has-text-centered">
                <button 
                    className="button has-background-warning" 
                    onClick={refreshPage}
                >
                    Refresh
                </button>
            </div>

        </div>
    );
}

export default Another;