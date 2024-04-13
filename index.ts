#! /usr/bin/env node
import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";

//generate number between 0 and 99
// const randomNumber = Math.floor(Math.random() * 99);
//generate number between 0 and 9
let randomNumber = 0;
// number of lifes
let lifes = 3;
let score = 0;

// console.log(randomNumber);

const displayStats = () => {
  console.clear();

  console.log(
    gradient.pastel.multiline(
      `Lifes:${lifes}   ........... <= RANDOM NUBMER GUESSING GAME => ...........   Score:${score}\n`
    )
  );
};

const incrementScoreHandler = () => {
  score = +1;
};

const lostLifeHandler = () => {
  lifes -= 1;
};

const generateRandomNumber = () => {
  randomNumber = Math.floor(Math.random() * 9);
};

const scoreAndLifeHandler = (number: number) => {
  if (number === randomNumber) {
    incrementScoreHandler();
    startGameHandler();
  } else {
    lostLifeHandler();

    console.clear();
    if (lifes === 0) {
      const message = `Final Score=${score}`;
      figlet(message, (err, result) => {
        console.log(gradient.pastel.multiline(result));
      });
    } else {
      startGameHandler();
    }
  }
};

const startGameHandler = () => {
  //display the stats of the game
  displayStats();

  //user input handler
  inquirer
    .prompt([
      {
        name: "input",
        message:
          lifes === 3
            ? gradient.pastel.multiline("Please enter a number:")
            : gradient.pastel.multiline("Please enter a number again:"),
        type: "input",
        validate: (value) => {
          if (value > 9 || value < 0 || isNaN(value)) {
            console.log(
              "\n",
              gradient.pastel.multiline(
                "Error::Only numbers between 0 and 9 are allowed"
              )
            );
            return false;
          }
          return true;
        },
      },
    ])
    .then((value) => {
      //Generate Randon Number Handler
      generateRandomNumber();
      //Score and Life Handler
      scoreAndLifeHandler(value.input);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

startGameHandler();
