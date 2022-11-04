import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import ResultBox from './components/ResultBox';
import Row from './components/Table';
import { Grid } from '@mui/material';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

function App() {
  const [solution, setSolution] = useState([]);
  const [guesses, setGuesses] = useState(
    new Array(6).fill().map(() => new Array(5).fill(null))
  );
  const [gameStatus, setGameStatus] = useState('playing');
  const [notWord, setNotword] = useState(false);
  const compass = { row: 0, column: 0 };
  const handleClose = () => {
    setGameStatus('finished');
  };

  const keydownHandle = async (e) => {
    setNotword(false);
    if (
      compass.column < 5 &&
      e.keyCode > 64 &&
      e.keyCode < 91 &&
      gameStatus === 'playing'
    ) {
      const newGuesses = [...guesses];
      const newValue = { value: e.key };
      newGuesses[compass.row][compass.column] = newValue;
      setGuesses([...newGuesses]);
      compass.column++;
    } else if (
      compass.column === 5 &&
      e.keyCode === 13 &&
      gameStatus === 'playing'
    ) {
      let guessedWord = '';
      guesses[compass.row].forEach(
        (letterInfo) => (guessedWord = guessedWord + letterInfo.value)
      );
      const isLegitWord = await wordCheck(guessedWord);

      if (isLegitWord) {
        let correctLetters = 0;
        let newGuesses = [...guesses];
        guesses[compass.row].forEach((guessedLetter, guessedLetterIndex) => {
          let letterIndex = solution.findIndex(
            (letter) => letter === guessedLetter.value
          );
          if (letterIndex === -1) {
            newGuesses[compass.row][guessedLetterIndex].class = 'not-solution';
          } else if (
            guesses[compass.row][letterIndex].value === guessedLetter.value
          ) {
            newGuesses[compass.row][guessedLetterIndex].class = 'right-order';
            correctLetters++;
          } else {
            newGuesses[compass.row][guessedLetterIndex].class = 'wrong-order';
          }
        });
        if (correctLetters === 5 && gameStatus === 'playing')
          setGameStatus('win');
        else if (correctLetters !== 5 && compass.row === 5)
          setGameStatus('lose');
        setGuesses([...newGuesses]);
        compass.row++;
        compass.column = 0;
      } else if (!isLegitWord) {
        setNotword(true);
      }
    } else if (
      e.keyCode === 8 &&
      compass.column < 6 &&
      compass.column > 0 &&
      gameStatus === 'playing'
    ) {
      const newGuesses = [...guesses];
      newGuesses[compass.row][compass.column - 1]['value'] = '';
      setGuesses([...newGuesses]);
      compass.column--;
    }
  };

  const wordCheck = async (candidateWord) => {
    let wordCheckResponse = await axios.get(
      `https://thatwordleapi.azurewebsites.net/ask/?word=${candidateWord}`
    );
    return wordCheckResponse.data.Response;
  };
  useEffect(() => {
    const fetchWords = async () => {
      const {
        data: { Response },
      } = await axios.get('https://thatwordleapi.azurewebsites.net/daily/');
      setSolution([...Response.split('')]);
    };
    try {
      fetchWords();
    } catch (error) {
      console.error('error', error);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', keydownHandle);
    return () => window.removeEventListener('keydown', keydownHandle);
    // eslint-disable-next-line
  }, [solution, gameStatus]);

  return (
    <Grid className="App">
      <Header />
      <Row guesses={guesses} />
      <Snackbar
        open={notWord}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        message={`Not in the words list`}
      />
      <ResultBox
        gameStatus={gameStatus}
        handleClose={handleClose}
        solution={solution}
      />
      <Footer />
    </Grid>
  );
}

export default App;
