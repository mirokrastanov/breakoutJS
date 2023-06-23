import { game } from "./util.js";


const canvas = document.querySelector('#canvas');
/** @type {CanvasRenderingContext2D} */
export const ctx = canvas.getContext('2d');

export const canvasWidth = 800;
export const canvasHeight = 600;
export const brickWidth = 50;
export const brickHeight = 15;
export const padWidth = 100;
export const padHeight = 20;
export const mouse = { x: 0, y: 0 };


canvas.addEventListener('mousemove', game.onMouse);

game.start();