import { randBool } from "../../../lib/func"
import { clamp } from "../../../lib/func"
import { Coordinates } from "./types"

const DOUBLE_PI = Math.PI * 2

export type BallConstructor = {
  centerPoint: Coordinates
  xRadius: number
  yRadius: number
  size: number
}

export class Ball {
  baseSpeed: number = 0.006
  baseSize: number = 10

  speed: number = this.baseSpeed
  size: number = this.baseSize

  centerPoint: Coordinates = { x: 0, y: 0 }
  position: Coordinates = { x: 0, y: 0 }
  xRadius: number = 0
  yRadius: number = 0
  angle: number = 0
  globalAngle: number = 0

  inverseSign: boolean = false
  inverseSize: boolean = false
  xRadiusRatio: number = 1
  yRadiusRatio: number = 1
  sizeRadius: number = 1

  constructor(options: BallConstructor) {
    const { centerPoint, xRadius, yRadius, size } = options
    this.centerPoint = { x: centerPoint.x, y: centerPoint.y } // deepCopy(centerPoint)
    this.position = { x: centerPoint.x, y: centerPoint.y } // deepCopy(centerPoint)
    this.xRadius = xRadius
    this.yRadius = yRadius
    this.baseSize = size
    this.inverseSign = randBool()
    this.inverseSize = randBool()
    this.xRadiusRatio = Math.random() / 2 + 0.75
    this.yRadiusRatio = Math.random() / 2 + 0.75
    this.speed *= Math.random() + 0.5
    this.sizeRadius = Math.random() + 0.4
  }

  update() {
    const sin = Math.sin(this.angle)
    const cos = Math.cos(this.angle)
    const xRadius = this.xRadius * this.xRadiusRatio
    const yRadius = this.yRadius * this.yRadiusRatio
    this.size =
      this.baseSize +
      ((this.inverseSize ? sin : cos) * this.baseSize * this.sizeRadius) / 2
    this.position.x =
      this.centerPoint.x + sin * xRadius * (this.inverseSign ? -1 : 1)
    this.position.y =
      this.centerPoint.y - cos * yRadius * (this.inverseSign ? -1 : 1)
    if (this.angle > 100000) {
      this.angle = 0
    } else {
      this.globalAngle += this.baseSpeed
      this.angle += this.speed + Math.abs(Math.sin(this.globalAngle)) * 0.006
    }
  }

  render(context: CanvasRenderingContext2D) {
    const sizeRatio =
      this.size / (this.baseSize + (this.baseSize * this.sizeRadius) / 1.25)

    context.fillStyle = `hsl(${160 + sizeRatio * 40}, 100%, ${
      80 + sizeRatio * 10
    }%, ${clamp(0, 1, sizeRatio) * 100}%)`
    context.beginPath()
    context.arc(
      this.position.x,
      this.position.y,
      Math.max(this.size, 1),
      0,
      DOUBLE_PI
    )
    context.fill()
  }
}
