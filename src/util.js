import {
    ctx, canvasWidth, canvasHeight, brickHeight, brickWidth,
    padHeight, padWidth, mouse, ball, stepSize, rate, limits,
} from './app.js';

let lastTime = 0;
let delta = 0;

export const game = {
    brick: function (x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, brickWidth, brickHeight);
    },
    pad: function (x) {
        ctx.fillStyle = 'blue';
        ctx.fillRect(x - padWidth / 2, canvasHeight - 50, padWidth, padHeight);
    },
    genColor: function () {
        const colors = ['blue', 'purple', 'velvet', 'lightgreen', 'orange', 'yellow']
        let rng = Math.floor(Math.random() * 5);
        return colors[rng];
    },
    render: function () {
        game.clear();
        game.pad(mouse.x);
        game.drawBall(ball.x, ball.y);
    },
    onMouse: function (e) {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    },
    clear: function () {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    },
    main: function (time) {
        delta += time - lastTime;
        lastTime = time;
        if (delta > 1000) delta = 20;
        while (delta >= 20) {
            delta -= 20;
            game.tick();
        }
        game.render();
        // ctx.fillText(time, 20, 20);
        requestAnimationFrame(game.main);
    },
    start: function () {
        requestAnimationFrame(game.main);
    },
    drawBall: function (x, y) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, ball.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    },
    tick: function () {
        ball.x += ball.velocity.x / rate;
        ball.y += ball.velocity.y / rate;
        if ((ball.x > limits.right && ball.velocity.x > 0)
            || (ball.x < limits.left && ball.velocity.x < 0)) {
            ball.velocity.x *= -1;
        }
        if (ball.y < limits.top && ball.velocity.y < 0) {
            ball.velocity.y *= -1;
        }
        if ((ball.y > limits.bottom && ball.velocity.y > 0)
            && (ball.x >= mouse.x - padWidth / 2 - ball.radius)
            && (ball.x <= mouse.x + padWidth / 2 + ball.radius)) {
            ball.velocity.y *= -1;
        }

    },
    getVector: function (speed, dir) {
        return {
            x: Math.cos(dir) * speed,
            y: Math.sin(dir) * speed,
        };
    },

};