import { ctx, canvasWidth, canvasHeight, brickHeight, brickWidth, padHeight, padWidth, mouse, } from './app.js';


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
    },
    onMouse: function (e) {
        mouse.x = e.offsetX;
        mouse.y = e.offsetY;
    },
    clear: function () {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    },
    main: function () {
        game.render();
        requestAnimationFrame(game.main);
    },
    start: function () {
        requestAnimationFrame(game.main);
    },

};