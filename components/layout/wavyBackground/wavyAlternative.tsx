import React, { Component } from "react"
import { sleep } from "../../../lib/func"
import { Ball } from "./constants"
import styles from "./styles.module.css"
import { Coordinates } from "./types"

type WavyBackgroundProps = {
  useColorMatrix?: boolean
}

type WavyBackgroundState = {
  isTouchDevice: boolean
  isUsingFirefox: boolean
  isUsingSafari: boolean
}

class WavyBackground extends Component<
  WavyBackgroundProps,
  WavyBackgroundState
> {
  canvasRef: HTMLCanvasElement | null = null
  canvasContext: CanvasRenderingContext2D | null = null
  width: number = 0
  height: number = 0
  center: Coordinates = { x: 0, y: 0 }
  balls: Ball[] = []
  halt: boolean = false
  isPlaying: boolean = false
  resizeTimer: number = 0
  screenAspectRatio: number = 0

  state: WavyBackgroundState = {
    // optional second annotation for better type inference
    isTouchDevice: false,
    isUsingFirefox: false,
    isUsingSafari: false,
  }

  componentDidMount() {
    if (this.halt) {
      this.halt = false
    }
    if (this.canvasRef) {
      if (!this.canvasContext) {
        this.canvasContext = this.canvasRef.getContext("2d")
      }
      this.resizeCanvas()
      this.loop()
    }
    const isTouchDevice = Boolean(
      "ontouchstart" in window || navigator.maxTouchPoints > 0
    )
    const isUsingFirefox = Boolean(navigator.userAgent.match(/firefox|fxios/i))
    const isUsingSafari = navigator.userAgent.indexOf("Safari") > -1
    this.setState({
      isTouchDevice: isTouchDevice,
      isUsingFirefox: isUsingFirefox,
      isUsingSafari: isUsingSafari,
    })
    if (!isTouchDevice) {
      //Resize listener for the canvas to fill browser window dynamically
      window.addEventListener("resize", () => this.resizeCanvas())
    }
  }

  componentWillUnmount() {
    this.halt = true
    this.balls = []
    if (!this.state.isTouchDevice) {
      window.removeEventListener("resize", () => this.resizeCanvas())
    }
  }

  /**
   * Simple resize function. Reinitializes everything on the canvas while changing the width/height
   */
  resizeCanvas() {
    if (!this.canvasRef) return
    const triggeredTime = Date.now()
    this.resizeTimer = triggeredTime
    const dimension = [window.innerWidth, window.innerHeight]
    this.screenAspectRatio = dimension[0] / dimension[1]
    const self = this
    sleep(125).then(() => {
      if (this.resizeTimer === triggeredTime && self.canvasRef) {
        self.width = dimension[0]
        self.height = dimension[1]
        self.canvasRef.width = dimension[0]
        self.canvasRef.height = dimension[1]
        self.center = {
          x: dimension[0] / 2,
          y: dimension[1] / 2,
        }
        //Empty the previous container
        self.balls = []
        self.initializeCircleContainers()
      }
    })
  }

  initializeCircleContainers() {
    if (!this.canvasContext) return
    const createBall = () => {
      let ball = new Ball({
        centerPoint: { x: this.center.x, y: this.center.y },
        xRadius: this.width / 2.5,
        yRadius: this.height / 2.5,
        size: this.state.isTouchDevice ? 5 : 15,
      })
      this.balls.push(ball)
    }
    const screenLimit = Math.max(this.width, this.height)
    for (let i = 0; i < screenLimit; i += this.state.isTouchDevice ? 16 : 32) {
      createBall()
    }
  }

  update() {
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].update()
    }
  }

  draw() {
    if (!this.canvasContext?.clearRect) return
    //Clear the entire canvas every render
    this.canvasContext.clearRect(0, 0, this.width, this.height)

    //Trigger the render function on every child element
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].render(this.canvasContext)
    }
  }

  /**
   * Update and render the application at least 60 times a second
   * @return void
   */
  loop() {
    if (this.halt) {
      this.isPlaying = false
      return
    } else if (!this.isPlaying) {
      this.isPlaying = true
    }
    this.update()
    this.draw()
    window.requestAnimationFrame(() => this.loop())
  }

  render() {
    return (
      <div
        className="absolute-fill fade-in-2"
        style={{ overflow: "hidden", zIndex: -5 }}
      >
        <canvas
          id={styles.canvas}
          ref={(el) => {
            this.canvasRef = el
          }}
          style={
            !this.state.isUsingFirefox &&
            !this.state.isUsingSafari &&
            !this.state.isTouchDevice
              ? { filter: "url('#shadowed-goo')" }
              : {}
          }
        />
        <svg
          id={styles.svg}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          pointerEvents={"none"}
        >
          <defs>
            <filter id="shadowed-goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="3"
              />
              {this.props.useColorMatrix ? (
                <>
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                    result="goo"
                  />
                  <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
                  <feColorMatrix
                    in="shadow"
                    mode="matrix"
                    values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
                    result="shadow"
                  />
                </>
              ) : (
                <></>
              )}
              <feOffset in="shadow" dx="1" dy="1" result="shadow" />
              <feBlend in2="shadow" in="goo" result="goo" />
              <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                result="blur"
                stdDeviation="10"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
                result="goo"
              />
              <feBlend in2="goo" in="SourceGraphic" result="mix" />
            </filter>
          </defs>
        </svg>
      </div>
    )
  }
}

export default WavyBackground
