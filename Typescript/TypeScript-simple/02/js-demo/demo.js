function getDistance(point1, point2) {
  return [point2.x - point1.x, point2.y - point1.y]
}

getDistance({ x: 1, y: 1 }, { x: 2, y: 2 })
