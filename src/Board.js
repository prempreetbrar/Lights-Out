import './Board.css';
import { useState } from "react";

import Cell from "./Cell";
import RestartButton from './RestartButton';



function Board({numOfRows = 5, numOfCols = 5, probabilityLightStartsOn = 0.45}) {
  const [hasWon, setHasWon] = useState(false);
  const [numOfMoves, setNumOfMoves] = useState(0);
  const [boardLights, setBoardLights] = useState(initializeBoard());


  function restartGame() {
    setHasWon(false);
    setNumOfMoves(0);
    setBoardLights(initializeBoard());
  }


  function initializeBoard() {
    const initialLights = [];

    // set the light configuration; continue setting it until the board is solvable
    do {
      for (let y = 0; y < numOfRows; y++) {
        initialLights[y] = [];
          for (let x = 0; x < numOfCols; x++) {
            initialLights[y][x] = (Math.random() < probabilityLightStartsOn);
          }
      }
    } while (!isBoardGivenValid(initialLights));

    return initialLights;
  }


  function isBoardGivenValid(initialLights) {
    /* we need to try solving the board ourselves to see if it is valid, so we make a 
       deep copy so that we don't affect the initial configuration that will be used to 
       set the state 
    */
    const cloneDeep = require("lodash.clonedeep");
    const initialLightsTest = cloneDeep(initialLights);

    for (let y = 1; y < numOfRows; y++) {
      for (let x = 0; x < numOfCols; x++) {
        /* use the "Chase the Lights Method" (see here: https://help.gnome.org/users/lightsoff/stable/strategy.html.en).
           If the cell above you is on then turn it off by toggling yourself */
        if (y-1 >= 0 && y-1 < numOfRows && initialLightsTest[y-1][x] === true) {
          toggleOwnAndAdjacentLights(y, x, initialLightsTest, true);
        }
      }
    }

    const bottomLightsOn = getBottomLightsThatAreOn(initialLightsTest);
    const isSolvable = doesBottomRowShowSolvability(bottomLightsOn);
    return isSolvable;
  }


  /* You can determine if a board is solvable by looking at the bottom row after you
     finish chasing: https://help.gnome.org/users/lightsoff/stable/strategy.html.en 
  */
  function getBottomLightsThatAreOn(lightBoard) {
    let bottomLightsOn = lightBoard[numOfRows - 1].reduce((bottomLightsOn, light, index) => {
      // add 1 to the index so it is consistent with the above link (since regular humans count from 1 not 0)
      bottomLightsOn += light ? (index + 1).toString() : "";
      return bottomLightsOn;
    }, "");

    return bottomLightsOn;
  }


  /* Only the following configurations mean the board is solvable: 
     https://help.gnome.org/users/lightsoff/stable/strategy.html.en 
  */
  function doesBottomRowShowSolvability(bottomLightsOn) {
    switch (bottomLightsOn) {
      case "123":
      case "1245":
      case "134":
      case "15":
      case "235":
      case "24":
      case "345":
        return true;
    }
    return false;
  }
  

  function toggleOwnAndAdjacentLights(y, x, boardLights, isTestingValidity = false) {
    /* the (potential) surrounding lights are
       above (y-1), right (x+1), below (y+1), left (x-1)
    */
    const lightsToBeToggled = [[y,x], [y-1, x], [y,x+1], [y+1, x], [y, x-1]];
    for (const light of lightsToBeToggled) {
      toggleLight(light[0], light[1], boardLights, isTestingValidity);
    }
    
    // we don't want to say the user has won if we are only testing the board's solvability
    if (!isTestingValidity) {
      setNumOfMoves(oldNumOfMoves => oldNumOfMoves + 1);
      const areAllLightsOff = boardLights.every(rowOfLights => rowOfLights.every(light => !light));
      setHasWon(areAllLightsOff);
    }
  }


  /* take in coordinates as y, x rather than x, y because if you look at a grid
     [z, z, z]
     [z, z, z]
     [z, z, z],
     you access the element at row 2 column 1 by doing grid[1][0], in other words,
     the row is the y-coordinate and column is the x-coordinate.
  */
  function toggleLight(y, x, boardLights, isTestingValidity = false) {
    /* if we are testing then we aren't setting state so we can use the test array as is,
       if we are playing "for real" then we need to make a copy of the array since we're going to set state 
    */
    const newBoardLights = isTestingValidity ? boardLights : [...boardLights];

    if (y >= 0 && y < numOfRows && x >= 0 && x < numOfCols) {
      newBoardLights[y][x] = !newBoardLights[y][x];
    }
    if (!isTestingValidity) {
      setBoardLights(() => newBoardLights);
    }
  }


  function RowOfLights(rowOfLights, y) {
    return (
      <tr key={String(y)}>
        {rowOfLights.map((isLit, x) =>
          <Cell key={String(y) + "-" + String(x)}
                isLit={isLit}
                flipCell={() => toggleOwnAndAdjacentLights(y, x, boardLights)}
          />
        )}
      </tr>
    );
  }


  function LightsDisplay() {
    return (
      <table className="Board">
        <tbody>
          {boardLights && boardLights.map((rowOfLights, y) => RowOfLights(rowOfLights, y))}
        </tbody>
      </table>
    );
  }


  return (
    <div className="container">
      {hasWon && WinnerText()}
      {!hasWon && <>{Title()}{LightsDisplay()}</>}

      <p className="Board-moves">Number of Moves: {numOfMoves}</p>
      <RestartButton restartGame={restartGame} />
    </div>
  );
}



function WinnerText() {
  return (
    <div className="Board-title">
      <div className="winner">
        <span className="neon-orange">YOU</span>
        <span className="neon-blue">WIN!</span>
      </div>
    </div>
  );
}



function Title() {
  return (
    <div className="Board-title">
      <div className="neon-orange">Lights</div>
      <div className="neon-blue">Out</div>
    </div>
  );
}

export default Board;