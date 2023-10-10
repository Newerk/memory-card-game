import { useRef, useState } from "react";
import Gameboard from "./components/gameboard";
import Scoreboard from "./components/scoreboard";
import "./styling/index.css";

function App() {
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameResult, setGameResult] = useState("");
  const playAgainRef = useRef();
  const gameboardRef = useRef();

  function handleScoreBoard() {
    let score = currentScore;
    setCurrentScore(score + 1);
    if (currentScore === 9) {
      setGameResult("winner");
      playAgainRef.current.style.visibility = "visible";
      gameboardRef.current.style.visibility = "hidden";
    }

    if (currentScore >= highScore) {
      setHighScore(score + 1);
    }
  }

  function handleGameOver() {
    setCurrentScore(0);
    setGameResult("loser");
    playAgainRef.current.style.visibility = "visible";
    gameboardRef.current.style.visibility = "hidden";
  }

  return (
    <>
      <h1>Memory Card Game</h1>
      <Scoreboard highScore={highScore} currentScore={currentScore} />
      <Gameboard
        gameboardRef={gameboardRef}
        playAgainRef={playAgainRef}
        gameResult={gameResult}
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
