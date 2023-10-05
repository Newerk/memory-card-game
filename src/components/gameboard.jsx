import { v4 } from "uuid";
import "../styling/cards.css";
import "../styling/gameboard.css";
import { useEffect, useState } from "react";

function GenerateCards({ arr, setArr, scoreHandler, gameoverHandler }) {
  let count = 0;
  let list = [];

  useEffect(() => {
    let randomIndex;

    while (count < 10) {
      fetch(
        `https://gateway.marvel.com:443/v1/public/characters?limit=100&offset=${randomOffset()}&apikey=412bd8b1e579c4f5f4139cc8ea699d61`,
        { mode: "cors" }
      ).then((result) => {
        result.json().then((info) => {
          info.data.total - info.data.offset < 100
            ? (randomIndex = Math.floor(
                Math.random() * (info.data.total - info.data.offset)
              ))
            : (randomIndex = Math.floor(Math.random() * 100));

          list.push({
            value: info.data.results[randomIndex].name,
            selected: false,
          });

          setArr([...list]);
        });
      });

      count++;
    }
  }, [count]);

  function shuffleCards(array) {
    let copy = [...array];
    let shuffledDeck = [];

    while (copy.length > 0) {
      let randomIndex = Math.floor(Math.random() * copy.length);
      shuffledDeck.push(...copy.splice(randomIndex, 1));
    }

    return shuffledDeck;
  }

  function randomOffset() {
    let array = [];
    for (let i = 0; i <= 1500; i += 100) {
      array.push(i);
    }

    const randomNum = Math.floor(Math.random() * array.length);

    console.log("random offset: " + array[randomNum]);

    return array[randomNum];
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
    // { value: "1", selected: false },
    // { value: "2", selected: false },
    // { value: "3", selected: false },
    // { value: "4", selected: false },
    // { value: "5", selected: false },
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
