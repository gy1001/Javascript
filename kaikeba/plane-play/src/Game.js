import { Application } from 'pixi.js'
//setup canvas
export const game = new Application({
  width: 750,
  height: 1000,
})
document.body.appendChild(game.view)

export function getGameContainer() {
  return game.stage
}
