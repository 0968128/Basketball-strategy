class EarthBall implements Behavior {
    public makeUpdate(ball:Ball) {
        if (ball.x < ball.minWidth)
        {
            ball.x = ball.minWidth
            ball.speedX *= -1
            ball.speedX *= ball.friction
        }
        if(ball.x > ball.maxWidth) {
            ball.x = ball.maxWidth
            ball.speedX *= -1
            ball.speedX *= ball.friction
        }
        if (ball.y + ball.speedY > ball.maxHeight)
        {
            ball.y = ball.maxHeight;
            ball.speedY *= -1
            // Weerstand
            ball.speedY *= ball.friction
            ball.speedX *= ball.friction
        }
        else {
            ball.speedY += ball.gravity
        }

        ball.x += ball.speedX
        ball.y += ball.speedY
        
        ball.draw()
    }
}