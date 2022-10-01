import { countPoints } from "../utils/gameFieldUtils";

it("dioganalTest", () => {
  const pointsArr = [{x: 1, y: 1}, {x: 2, y: 2}, {x: 3, y: 3}, {x: 2, y: 1}, {x: 4, y: 3}]
  let result = countPoints(pointsArr, 1, 1, undefined, undefined)
  expect(result === 3)
  result = countPoints(pointsArr, 2, 2, undefined, undefined)
  expect(result === 3)
  result = countPoints(pointsArr, 3, 3, undefined, undefined)
  expect(result === 3)
})

it("horizontalTest", () => {
  const pointsArr = [{x: 1, y: 1}, {x: 2, y: 1}, {x: 3, y: 1}, {x: 2, y: 1}, {x: 4, y: 3}]
  let result = countPoints(pointsArr, 1, 1, undefined, undefined)
  expect(result === 3)
  result = countPoints(pointsArr, 2, 2, undefined, undefined)
  expect(result === 3)
  result = countPoints(pointsArr, 3, 3, undefined, undefined)
  expect(result === 3)
  result = countPoints(pointsArr, 1, 2, undefined, undefined)
  expect(result === 2)
})

it("horizontalTest", () => {
  const pointsArr = [{x: 1, y: 1}, {x: 1, y: 2}, {x: 1, y: 3}, {x: 2, y: 1}, {x: 4, y: 3}]
  let result = countPoints(pointsArr, 1, 1, undefined, undefined)
  expect(result === 3)
  result = countPoints(pointsArr, 2, 2, undefined, undefined)
  expect(result === 3)
  result = countPoints(pointsArr, 3, 3, undefined, undefined)
  expect(result === 3)
  result = countPoints(pointsArr, 1, 2, undefined, undefined)
  expect(result === 2)
})