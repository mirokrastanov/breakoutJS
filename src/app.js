import { game } from "./util.js";


const canvas = document.querySelector('#canvas');
/** @type {CanvasRenderingContext2D} */
export const ctx = canvas.getContext('2d');
ctx.font = '24px Prototype';

export const canvasWidth = canvas.width;
export const canvasHeight = canvas.height;
export const brickWidth = 50;
export const brickHeight = 15;
export const padWidth = 100;
export const padHeight = 20;
export const mouse = { x: 0, y: 0 };
export const stepSize = 20;
export const rate = 1000 / stepSize;
export const ball = { x: 400, y: 300, velocity: {}, radius: 10, speed: 300, };
ball.velocity = game.getVector(ball.speed, Math.PI / 4);
export const limits = {
    left: 0 + ball.radius, right: canvasWidth - ball.radius,
    top: 0 + ball.radius, bottom: canvasHeight - ball.radius
};

canvas.addEventListener('mousemove', game.onMouse);

game.start();