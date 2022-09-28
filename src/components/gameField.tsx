import React, {useRef} from 'react';
import {gameMapInit} from "../utils/gameFieldUtils"
import BlockConstructor from "./blockConstructor"
import "../styles/main.css"
import { blockHeigth } from "../utils/blockConstructorUtils"
function GameField() {
  const gameMap = useRef<Array<string[]>>()
  if(!gameMap.current)
    gameMap.current = gameMapInit()
  const renderRow = (row: string[], rowIndex: number) => row.map((el, i) => <BlockConstructor type={el} key={"child_row" + rowIndex + "_ceilIndex" + i} /> ) 
  return (
    <>
      <div className='game-description'>
        <h3>User1</h3> {/* <BlockConstructor type="cross"> */}
        <h3>User2</h3> {/* <BlockConstructor type="circle"> */}
      </div>
      {/* добавить модалку для выбора длины ряда для победы */}
      <div className="game-field">
        {gameMap.current && gameMap.current.map((row, i) => <span style={{height: blockHeigth}} key={"parent_row_" + i} className='row'>{ renderRow(row, i)} </span>)}
      </div>
    </>
  );
}

export default GameField;