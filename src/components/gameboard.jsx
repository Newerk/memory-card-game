import { v4 } from "uuid";
import "../styling/cards.css";
import "../styling/gameboard.css";
import { useEffect, useState } from "react";

function GenerateCards({ arr, setArr, scoreHandler, gameoverHandler }) {
  function shuffleCards(array) {
    let copy = [...array];
    let shuffledDeck = [];

    while (copy.length > 0) {
      let randomIndex = Math.floor(Math.random() * copy.length);
      shuffledDeck.push(...copy.splice(randomIndex, 1));
    }

    return shuffledDeck;
  }

  return (
    <>
      {shuffleCards(arr).map((card) => (
        <div
          key={v4()}
          className="card"
          onClick={() => {
            if (card.selected) {
              setArr(shuffleCards(arr));
              arr.forEach((card) => (card.selected = false));
              gameoverHandler();
            } else {
              card.selected = true;
              scoreHandler();
              console.log(arr);
            }
          }}
        >
          {card.value}
        </div>
      ))}
    </>
  );
}

export default function Gameboard({ scoreBoardHandler, gameoverHandler }) {
  const [cardArray, setCardArray] = useState([
    { value: "1", selected: false },
    { value: "2", selected: false },
    { value: "3", selected: false },
    { value: "4", selected: false },
    { value: "5", selected: false },
  ]);
  return (
    <div id="gameboard">
      <GenerateCards
        arr={cardArray}
        setArr={setCardArray}
        scoreHandler={scoreBoardHandler}
        gameoverHandler={gameoverHandler}
      />
    </div>
  );
}
