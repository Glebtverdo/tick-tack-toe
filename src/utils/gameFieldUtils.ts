import {blockHeigth, blockWidth} from "./blockConstructorUtils"

export const gameMapInit = () => {
  const map = [] as string[][]
  const countOfXBlocks = Math.ceil(window.screen.availWidth * 1.5 / blockWidth)
  const countOfYBlocks = Math.ceil(window.screen.availHeight * 1.5 / blockHeigth)
  for (let indexY = 0; indexY < countOfYBlocks; indexY++) {
    map[indexY] = [] as string[]
    for (let indexX = 0; indexX < countOfXBlocks; indexX++) {
      map[indexY].push("empty")
    }
  }
  return map
}