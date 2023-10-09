import { v4 } from "uuid";
import "../styling/cards.css";
import "../styling/gameboard.css";
import { useEffect, useState } from "react";

function GenerateCards({ arr, setArr, scoreHandler, gameoverHandler }) {
  let [nameStorage, setNameStorage] = useState([]);

  useEffect(() => {
    const getRandomIndex = (limit, offset, total) => {
      return total - limit < 20
        ? Math.floor(Math.random() * (total - offset))
        : Math.floor(Math.random() * 20);
    };

    if (arr.length < 10) {
      fetch(
        `https://gateway.marvel.com:443/v1/public/characters?limit=20&offset=${randomOffset()}&apikey=412bd8b1e579c4f5f4139cc8ea699d61`,
        { mode: "cors" }
      ).then((result) => {
        result.json().then((info) => {
          for (let i = 0; i < 5; i++) {
            // let randomIndex = getRandomIndex(
            //   info.data.limit,
            //   info.data.offset,
            //   info.data.total
            // );

            const obj = {
              name: info.data.results[i].name,
              path: info.data.results[i].thumbnail.path,
              selected: false,
            };
            console.log(obj.name);

            //if picture if avaliable, created a card, else dont
            if (
              !info.data.results[i].thumbnail.path.endsWith(
                "image_not_available"
              )
            ) {
              setArr([...arr, obj]);
            }
          }
        });
      });
    }
  }, [arr]);

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
    for (let i = 0; i <= 1500; i += 20) {
      array.push(i);
    }

    const randomNum = Math.floor(Math.random() * array.length);

    console.log("random offset: " + array[randomNum]);

    return array[randomNum];
  }

  return (
    <>
      {/* <p id="will-delete">Length: {arr.length}</p> */}
      {shuffleCards(arr).map((card) => (
        <div key={v4()}>
          <img
            className="card"
            src={`${card.path}/portrait_incredible.jpg`}
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
          ></img>
        </div>
      ))}
    </>
  );
}

export default function Gameboard({ scoreBoardHandler, gameoverHandler }) {
  const [cardArray, setCardArray] = useState([
    // { name: "", path: "", selected: false },
    // { name: "", path: "", selected: false },
    // { name: "", path: "", selected: false },
    // { name: "", path: "", selected: false },
    // { name: "", path: "", selected: false },
    // { name: "", path: "", selected: false },
    // { name: "", path: "", selected: false },
    // { name: "", path: "", selected: false },
    // { name: "", path: "", selected: false },
    // { name: "", path: "", selected: false },
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
