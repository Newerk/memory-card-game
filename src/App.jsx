import { useState } from "react";
import Gameboard from "./components/gameboard";
import Scoreboard from "./components/scoreboard";
import "./styling/index.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  function handleScoreBoard() {
    let score = currentScore;
    setCurrentScore(score + 1);

    if (currentScore >= highScore) {
      setHighScore(score + 1);
    }
  }

  function handleGameOver() {
    setCurrentScore(0);
    console.log("already selected, you lose!");
  }

  return (
    <>
      <h1>Memory Card Game</h1>
      <Scoreboard highScore={highScore} currentScore={currentScore} />
      <Gameboard
        scoreBoardHandler={handleScoreBoard}
        gameoverHandler={handleGameOver}
      />
      <footer>
        <span>Made with Marvel's API</span>
        <a href="http://marvel.com">http://marvel.com</a>
      </footer>
    </>
  );
}

export default App;
