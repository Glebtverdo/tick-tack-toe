import {blockHeigth, blockWidth} from "./blockConstructorUtils"

const getLengthOfXBlocks = () => Math.ceil(window.screen.availWidth * 1.5 / blockWidth)
const getLengthOfYBlocks = () => Math.ceil(window.screen.availHeight * 1.5 / blockHeigth)

export const gameMapInit = () => {
  const map = [] as string[][]
  const countOfXBlocks = getLengthOfXBlocks()
  const countOfYBlocks = getLengthOfYBlocks()
  for (let indexY = 0; indexY < countOfYBlocks; indexY++) {
    map[indexY] = [] as string[]
    for (let indexX = 0; indexX < countOfXBlocks; indexX++) {
      map[indexY].push("empty")
    }
  }
  map[0][0] = "cross"
  return map
}