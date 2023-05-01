type Point = { x: number; y: number }
function tsGetDistance(point1: Point, point2: Point) {
  return [point2.x - point1.x, point2.y - point1.y]
}

tsGetDistance({ x: 1, y: 1 }, { x: 2, y: 2 })

tsGetDistance({ x: 1 }, { x: 2, y: 2 })

tsGetDistance({ x: 1, y: 1 }, { y: 2 })

tsGetDistance({ x: '21', y: 1 }, { y: 2 })
