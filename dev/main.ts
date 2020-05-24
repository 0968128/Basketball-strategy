class Main {

    private balls:Ball[] = []
    private basketBall:Ball

    constructor() {
        console.log("Constructor van main.")
        
        this.balls.push(new Ball(0, window.innerWidth/2, new EarthBall()))
        console.log("Bal op aarde aangemaakt.")
        this.balls.push(new Ball(window.innerWidth/2, window.innerWidth, new MoonBall()))
        console.log("Bal op de maan aangemaakt.")
        this.basketBall = new Ball(0, window.innerWidth, new MoonBall(), "basketball")
        console.log("Basketbal aangemaakt.")
        this.gameLoop()
    }

    gameLoop() {
        console.log("Gameloop")
        for (const ball of this.balls) {
            ball.update()
        }

        this.basketBall.update()
        if(this.basketBall.x < window.innerWidth / 2) {
            this.basketBall.setBehavior(new EarthBall())
        } else {
            this.basketBall.setBehavior(new MoonBall())
        }

        requestAnimationFrame(() => this.gameLoop())
    }
}

window.addEventListener("load", () => new Main())