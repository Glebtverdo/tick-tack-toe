import React, {useRef, useState} from 'react';
import {gameMapInit, countPoints} from "../utils/gameFieldUtils"
import BlockConstructor from "./blockConstructor"
import { blockHeigth } from "../utils/blockConstructorUtils"
import {userPointType} from "../types"
import InputForPointsLimit from './inputForPointsLimit';

function GameField() {
  const [gameMap, setGameMap] = useState(gameMapInit())
  const mapRendering = useRef(false)
  const userType = ["cross", "circle"]
  const userPoints = useRef<Array<userPointType[]>>([[{y:0, x: 0}],[]])
  const activeUser = useRef(1);
  const toggelUserActive = () => {
    activeUser.current = activeUser.current === 0 ? 1 : 0
  }
  const [pointsToWin, setPointsToWin] = useState<number>(0)
  const [winner, setWinner] = useState<string | undefined>(undefined)
  const looser = useRef<string | undefined>(undefined)

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
    userPoints.current[activeUser.current].push({y, x})
    setGameMap(newGameMap)
    const points = countPoints(userPoints.current[activeUser.current], y, x, undefined, undefined)
    if(points >= pointsToWin)
    {
      looser.current = "User " + (activeUser.current === 0 ? "2" : "1ф")
      setWinner("User " + (activeUser.current + 1))
    }
    else
      toggelUserActive()
  }

  const renderRow = (row: string[], rowIndex: number) => row.map(
    (el, i) => <BlockConstructor type={el}
      key={"child_row" + rowIndex + "_ceilIndex" + i}
      callback={() => btnClick(rowIndex, i)}
      /> ) 

    const submit = (pointsToWin: number) => {
      setPointsToWin(pointsToWin)
    }

  return (
    <>
      <div className='game-description'>
        <span className='user-description-container'><span className='user-name'>User1</span> <BlockConstructor type="cross"/></span>
        <span className='user-description-container'><span className='user-name'>User2</span> <BlockConstructor type="circle"/></span>
      </div>
      <div className="game-field" onScroll={scrollHandler}>
        {!pointsToWin && <InputForPointsLimit callback={submit} />}
        {pointsToWin !== 0 && !winner && gameMap && gameMap.map((row, i) =>
            <span style={{height: blockHeigth}}
              key={"parent_row_" + i} className='row'>
              { renderRow(row, i)}
            </span>
            )}
        {winner && <>
          <h3>Winner is {winner}</h3>
          <h3>Looser is {looser.current}</h3>
        </>
        }
      </div>

    </>
  );
}

export default GameField;