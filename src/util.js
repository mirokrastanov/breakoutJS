import {
    ctx, canvasWidth, canvasHeight, brickHeight, brickWidth,
    padHeight, padWidth, mouse, ball, stepSize, rate, limits,
    bricks,
} from './app.js';

let lastTime = 0;
let delta = 0;
const colors = ['black', '#00ff6e', '#00c3ff'];

export const game = {
    brick: function (x, y, color) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x, y, brickWidth, brickHeight);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, brickWidth, brickHeight);
    },
    pad: function (x) {
        ctx.strokeStyle = 'black';
        ctx.strokeRect(x - padWidth / 2, canvasHeight - 50, padWidth - 5, padHeight - 5);
        ctx.fillStyle = '#0077ff';
        ctx.fillRect(x - padWidth / 2, canvasHeight - 50, padWidth - 5, padHeight - 5);
    },
    genColor: function () {
        let generator = Math.floor(Math.random() * 2 ** 24).toString(16).padStart(6, '0');
        return `#${generator}`;
    },
    genBricks: function () {
        bricks.length = 0;
        for (let row = 0; row < 5; row++) {
            for (let col = 0; col < 13; col++) {
                bricks.push({
                    x: col * brickWidth * 1.2 + 15,
                    y: row * brickHeight * 2 + 100,
                    color: colors[2],
                    live: true,
                    hits: 2,
                });
            }
        }
    },
    checkBrick: function (b) {
        if ((ball.x + ball.radius > b.x)
            && (ball.x - ball.radius < b.x + brickWidth)
            && (ball.y + ball.radius > b.y)
            && (ball.y - ball.radius < b.y + brickHeight)) {
            b.hits--;
            if (b.hits == 0) b.live = false;
            if (ball.x < b.x && ball.velocity.x > 0) {
                ball.velocity.x *= -1;
            } else if (ball.x > b.x + brickWidth && ball.velocity.x < 0) {
                ball.velocity.x *= -1;
            }
            if (ball.y < b.y && ball.velocity.y > 0) {
                ball.velocity.y *= -1;
            } else if (ball.y > b.y + brickHeight && ball.velocity.y < 0) {
                ball.velocity.y *= -1;
            }
        }
    },
    render: function () {
        game.clear();
        bricks.forEach(b => {
            if (b.live) game.brick(b.x, b.y, colors[b.hits]);
        });
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
        if (delta > 1000) delta = stepSize;
        while (delta >= stepSize) {
            delta -= stepSize;
            game.tick();
        }
        game.render();
        // ctx.fillText(time, 20, 20);
        requestAnimationFrame(game.main);
    },
    start: function () {
        game.genBricks();

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
        game.updateScore();
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
            && (ball.y <= limits.bottom + ball.radius)
            && (ball.x >= mouse.x - padWidth / 2 - ball.radius)
            && (ball.x <= mouse.x + padWidth / 2 + ball.radius)) {
            ball.velocity.y *= -1;

            const x = ball.velocity.x + 100 * (ball.x - mouse.x) / padWidth;
            const y = Math.sqrt(ball.speed ** 2 - x ** 2);
            ball.velocity.x = x;
            ball.velocity.y = -y;
        }
        bricks.forEach(b => {
            if (b.live) game.checkBrick(b);
        });
    },
    getVector: function (speed, dir) {
        return {
            x: Math.cos(dir) * speed,
            y: Math.sin(dir) * speed,
        };
    },
    updateScore: function () {
        let score = bricks.slice().filter(x => x.hits == 0).length * 1000;
        document.querySelector('#score').textContent = `Score: ${score}`;
    },

};