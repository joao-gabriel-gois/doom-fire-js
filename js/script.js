import Fire from './modules/fire.js';
const fireCanvasWidth = Math.round((window.innerWidth / 8  < 1010 ? window.innerHeight / 6: window.innerWidth / 8));
const fire = new Fire(fireCanvasWidth, 40, 'fireCanvas');
fire.init(false, true);
