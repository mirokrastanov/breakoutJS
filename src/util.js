import {
    ctx, canvasWidth, canvasHeight, brickHeight, brickWidth,
    padHeight, padWidth, mouse, ball,
} from './app.js';


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
    main: function () {
        game.tick();
        game.render();
        requestAnimationFrame(game.main);
    },
    start: function () {
        requestAnimationFrame(game.main);
    },
    drawBall: function (x, y) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    },
    tick: function () {
        ball.x += ball.velocity.x;
        ball.y += ball.velocity.y;
    },

};