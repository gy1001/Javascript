import { Application } from 'pixi.js'
//setup canvas
const game = new Application({
  width: 750,
  height: 1080,
})
document.body.appendChild(game.view)

export function getGameContainer() {
  return game.stage
}
