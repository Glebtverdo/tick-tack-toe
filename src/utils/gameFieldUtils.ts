import {blockHeigth, blockWidth} from "./blockConstructorUtils"
import {userPointType} from "../types"

const getLengthOfBlocks = (param: number, coefficien: number) => Math.ceil(param * 1.5 / coefficien)

export const gameMapInit = () => {
  const map = [] as string[][]
  const countOfXBlocks = getLengthOfBlocks(window.screen.availWidth, blockWidth)
  const countOfYBlocks = getLengthOfBlocks(window.screen.availHeight, blockHeigth)
  for (let indexY = 0; indexY < countOfYBlocks; indexY++) {
    map[indexY] = [] as string[]
    for (let indexX = 0; indexX < countOfXBlocks; indexX++) {
      map[indexY].push("empty")
    }
  }
  map[0][0] = "cross"
  return map
}

export const countPoints = (pointsArr: userPointType[], y: number, x: number, prevY?: number, prevX?: number): number => {
  if(prevY !== undefined &&  prevX !== undefined && prevX > -1 && prevY > -1 ){
    const xDiff = x - prevX
    const yDiff = y - prevY
    const nextElem = pointsArr.find(el => y + yDiff === el.y && x + xDiff === el.x)
    if (nextElem) {
      return 1 + countPoints(pointsArr, nextElem.y, nextElem.x, y, x)
    }
  }else if(prevY === undefined || prevX === undefined){
    const nextElems = pointsArr.filter(el =>  (el.y === y + 1 || el.y === y - 1 || el.y === y)
      && (el.x === x + 1 || el.x === x - 1 || el.x === x)
      && !(el.x === x && el.y === y) )
    let max = 0;
    if (nextElems.length > 0) {
      for(const i in nextElems){
        let buf = countPoints(pointsArr, nextElems[i].y, nextElems[i].x, y, x)
        const rowToConcat = pointsArr.find(el => el.x === x + x - nextElems[i].x && el.y === y + y - nextElems[i].y)
        if(rowToConcat)
          buf += countPoints(pointsArr, rowToConcat.y, rowToConcat.x, y, x)
        if (buf > max)
          max = buf
      }
      return max + 1
    }
  }
  return 1
}