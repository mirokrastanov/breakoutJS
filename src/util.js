import { ctx, brickHeight, brickWidth } from './app.js';


export const game = {
    brick: function (x, y, color) {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, brickWidth, brickHeight);
    },
    pad: function (x, y) {
        ctx.fillStyle = game.genColor();
        ctx.fillRect(x, y, padWidth, padHeight);
    },
    genColor: function () {
        const colors = ['blue', 'purple', 'velvet', 'green', 'orange', 'yellow']
        let rng = Math.floor(Math.random() * 5);
        return colors[rng];
    },

};