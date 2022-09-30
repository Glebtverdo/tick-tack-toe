import React, {useRef, useState} from 'react';
import {gameMapInit} from "../utils/gameFieldUtils"
import BlockConstructor from "./blockConstructor"
import { blockHeigth } from "../utils/blockConstructorUtils"
import {userPointType} from "../types"

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
  const bufferForInput = useRef<number>()
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

  const countPoints = (y: number, x: number, prevY?: number, prevX?: number): number => {
    if(prevY !== undefined &&  prevX !== undefined && prevX > -1 && prevY > -1 ){
      const xDiff = x - prevX
      const yDiff = y - prevY
      const nextElem = userPoints.current[activeUser.current].find(el => y + yDiff === el.y && x + xDiff === el.x)
      if (nextElem) {
        return 1 + countPoints(nextElem.y, nextElem.x, y, x)
      }
    }else if(prevY === undefined || prevX === undefined){
      const nextElems = userPoints.current[activeUser.current].filter(el =>  (el.y === y + 1 || el.y === y - 1 || el.y === y)
        && (el.x === x + 1 || el.x === x - 1 || el.x === x)
        && !(el.x === x && el.y === y) )
      let max = 0;
      if (nextElems.length > 0) {
        for(const i in nextElems){
          let buf = countPoints(nextElems[i].y, nextElems[i].x, y, x)
          const rowToConcat = userPoints.current[activeUser.current].find(el => el.x === x + x - nextElems[i].x && el.y === y + y - nextElems[i].y)
          if(rowToConcat)
            buf += countPoints(rowToConcat.y, rowToConcat.x, y, x)
          if (buf > max)
            max = buf
        }
        return max + 1
      }
    }
    return 1
  }

  const btnClick = (y:number, x: number) => {
    const newGameMap = gameMap.map(el => [...el])
    newGameMap[y][x] = userType[activeUser.current]
    userPoints.current[activeUser.current].push({y, x})
    setGameMap(newGameMap)
    const points = countPoints(y, x, undefined, undefined)
    if(points >= pointsToWin)
    {
      looser.current = "User " + (activeUser.current === 0 ? "2" : "1")
      setWinner("User " + (activeUser.current + 1))
    }
    else
      toggelUserActive()
  }

  const setBufferForInput = (e: unknown) => {
    const input = (e as Event).target as HTMLInputElement
    bufferForInput.current = parseInt(input.value ?? "0")
  }

  const renderRow = (row: string[], rowIndex: number) => row.map(
    (el, i) => <BlockConstructor type={el}
      key={"child_row" + rowIndex + "_ceilIndex" + i}
      callback={() => btnClick(rowIndex, i)}
      /> ) 

  const submit = () => {
    console.log(1);
    
    if(bufferForInput.current && bufferForInput.current > 2 && bufferForInput.current < 100)
      setPointsToWin(bufferForInput.current)
  }
  return (
    <>
      <div className='game-description'>
        <span className='user-description-container'><span className='user-name'>User1</span> <BlockConstructor type="cross"/></span>
        <span className='user-description-container'><span className='user-name'>User2</span> <BlockConstructor type="circle"/></span>
      </div>
      {/* добавить модалку для выбора длины ряда для победы */}
      <div className="game-field" onScroll={scrollHandler}>
        {/* I should try to use component to render row maybe it will be more opimized */}
        {!pointsToWin &&  <div className='input-container'>
            <h3 className="input-title">Write how musch point you need to  min = 3 max = 100 </h3>
            <span>
              <input className='input-for-points' onChange={setBufferForInput} /> 
              <button className='btn-submit'
                onClick={submit}>Submit 
              </button>
            </span>
          </div>
          }
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