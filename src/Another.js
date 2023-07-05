import { useState, useEffect } from 'react';
import { generate, count } from 'random-words';
import "bulma/css/bulma.min.css";

const NUMBER_OF_WORDS = 200;
const SECONDS = 30;

function Another() {

    const [words, setWords] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [currWordIndex, setCurrWordIndex] = useState(0);

    const [correctWords, setCorrectWords] = useState(0);
    const [incorrectWords, setIncorrectWords] = useState(0);

    useEffect(() => {
        setWords(generateWords());
    }, []);

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

    return (
        <div>
            {/* Header Text */}
            <div className="is-size-1 has-text-centered">
                <h1>Typing-Test</h1>
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

            <div>
                <h2 className="subtitle">{correctWords}</h2>
                <h2 className="subtitle">{incorrectWords}</h2>
            </div>

        </div>
    );
}

export default Another;