import React, {useRef, useState} from 'react';
import {gameMapInit} from "../utils/gameFieldUtils"
import BlockConstructor from "./blockConstructor"
import { blockHeigth } from "../utils/blockConstructorUtils"
function GameField() {
  const [gameMap, setGameMap] = useState(gameMapInit())
  const mapRendering = useRef(false)
  const userType = ["cross", "circle"]
  const activeUser = useRef(1);
  const toggelUserActive = () => {
    activeUser.current = activeUser.current === 0 ? 1 : 0
  }

  const scrollHandler = (e: unknown) => {
    const event = e as Event
    const div = event.target as HTMLDivElement
    if(div.scrollTop + div.offsetHeight + div.scrollHeight * 0.1 > div.scrollHeight && !mapRendering.current){
      mapRendering.current = true
      const newGameMap = gameMap.map(el => [...el])
      for (let i = 10; i > 0; i--) 
        newGameMap.push([...newGameMap[newGameMap.length - 1]])
      setGameMap(newGameMap)
    } else if (div.scrollLeft + div.offsetWidth + div.scrollWidth * 0.1 > div.scrollWidth && !mapRendering.current){
      mapRendering.current = true
      const newGameMap = gameMap.map(el => [...el].concat(["empty", "empty", "empty", "empty"]))
      setGameMap(newGameMap)
    }
    return setTimeout(() => {mapRendering.current = false} , 100)
  }

  const btnClick = (y:number, x: number) => {
    const newGameMap = gameMap.map(el => [...el])
    newGameMap[y][x] = userType[activeUser.current]
    setGameMap(newGameMap)
    toggelUserActive()
  }

  const renderRow = (row: string[], rowIndex: number) => row.map(
    (el, i) => <BlockConstructor type={el}
      key={"child_row" + rowIndex + "_ceilIndex" + i}
      callback={() => btnClick(rowIndex, i)}
      /> ) 

  return (
    <>
      <div className='game-description'>
        <span className='user-description-container'><span className='user-name'>User1</span> <BlockConstructor type="cross"/></span>
        <span className='user-description-container'><span className='user-name'>User2</span> <BlockConstructor type="circle"/></span>
      </div>
      {/* добавить модалку для выбора длины ряда для победы */}
      <div className="game-field" onScroll={scrollHandler}>
        {/* I should try to use component to render row maybe it will be more opimized */}
        {gameMap && 
          gameMap.map((row, i) => <span style={{height: blockHeigth}}
              key={"parent_row_" + i} className='row'>
              { renderRow(row, i)}
            </span>)}
      </div>
    </>
  );
}

export default GameField;