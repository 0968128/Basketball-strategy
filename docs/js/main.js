"use strict";
class Ball extends HTMLElement {
    constructor(minWidth, maxWidth, behavior, type = "ball") {
        super();
        this.gravity = 0.1;
        this.friction = 0.9;
        this.x = 0;
        this.y = 0;
        this.speedX = 5;
        this.speedY = -3;
        this.minWidth = 0;
        this.maxWidth = 0;
        this.maxHeight = 0;
        console.log("Constructor van ball");
        this.behaviour = behavior;
        if (type == "basketball") {
            console.log("type == basketball check");
            this.classList.add("basketball");
        }
        let content = document.getElementsByTagName("content")[0];
        content.appendChild(this);
        maxWidth -= this.clientWidth;
        this.x = (Math.random() * (maxWidth - minWidth)) + minWidth;
        this.y = 100;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.maxHeight = window.innerHeight - this.clientHeight;
    }
    update() {
        console.log("Ball wordt geüpdatet.");
        this.behaviour.makeUpdate(this);
    }
    setBehavior(behavior) {
        console.log("Gedrag wordt geset.");
        this.behaviour = behavior;
    }
    draw() {
        console.log("Ball wordt getekend.");
        this.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    }
}
window.customElements.define("ball-component", Ball);
class EarthBall {
    makeUpdate(ball) {
        if (ball.x < ball.minWidth) {
            ball.x = ball.minWidth;
            ball.speedX *= -1;
            ball.speedX *= ball.friction;
        }
        if (ball.x > ball.maxWidth) {
            ball.x = ball.maxWidth;
            ball.speedX *= -1;
            ball.speedX *= ball.friction;
        }
        if (ball.y + ball.speedY > ball.maxHeight) {
            ball.y = ball.maxHeight;
            ball.speedY *= -1;
            ball.speedY *= ball.friction;
            ball.speedX *= ball.friction;
        }
        else {
            ball.speedY += ball.gravity;
        }
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        ball.draw();
    }
}
class Main {
    constructor() {
        this.balls = [];
        console.log("Constructor van main.");
        this.balls.push(new Ball(0, window.innerWidth / 2, new EarthBall()));
        console.log("Bal op aarde aangemaakt.");
        this.balls.push(new Ball(window.innerWidth / 2, window.innerWidth, new MoonBall()));
        console.log("Bal op de maan aangemaakt.");
        this.basketBall = new Ball(0, window.innerWidth, new MoonBall(), "basketball");
        console.log("Basketbal aangemaakt.");
        this.gameLoop();
    }
    gameLoop() {
        console.log("Gameloop");
        for (const ball of this.balls) {
            ball.update();
        }
        this.basketBall.update();
        if (this.basketBall.x < window.innerWidth / 2) {
            this.basketBall.setBehavior(new EarthBall());
        }
        else {
            this.basketBall.setBehavior(new MoonBall());
        }
        requestAnimationFrame(() => this.gameLoop());
    }
}
window.addEventListener("load", () => new Main());
class MoonBall {
    makeUpdate(ball) {
        ball.x += ball.speedX;
        ball.y += ball.speedY;
        if (ball.x < ball.minWidth || ball.x > ball.maxWidth) {
            ball.speedX *= -1;
        }
        if (ball.y < 0 || ball.y > ball.maxHeight) {
            ball.speedY *= -1;
        }
        ball.draw();
    }
}
//# sourceMappingURL=main.js.map