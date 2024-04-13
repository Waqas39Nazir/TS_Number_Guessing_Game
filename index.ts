#! /usr/bin/env node
import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";

//generate number between 0 and 99
// const randomNumber = Math.floor(Math.random() * 99);
//generate number between 0 and 9
let randomNumber = 0;
// number of lifes
let lifes = 6;
let score = 0;

const displayStats = () => {
  console.clear();

  const heading = `Lifes:${lifes} <= RANDOM NUBMER GUESSING GAME => Score:${score}\n`;
  console.log(gradient.pastel.multiline(heading));
};

const incrementScoreHandler = () => {
  score += 1;
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
    if (lifes === 0) {
      console.clear();
      const message = `Score = ${score}`;
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
  //Generate Randon Number Handler
  generateRandomNumber();

  //user input handler
  inquirer
    .prompt([
      {
        name: "input",
        message:
          lifes === 6
            ? gradient.pastel.multiline(`Please enter a number:`)
            : gradient.pastel.multiline(`Please enter a number again:`),
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
      //Score and Life Handler
      const userInput = parseInt(value.input);

      scoreAndLifeHandler(userInput);
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};

startGameHandler();
