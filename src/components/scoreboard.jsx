export default function Scoreboard({ highScore, currentScore }) {
  return (
    <div id="scoreboard">
      <h2>High Score: {highScore}</h2>
      <h2>Current Score: {currentScore}</h2>
    </div>
  );
}
