import Fire from './modules/fire.js';
const fireCanvasWidth = Math.round((window.innerWidth / 3));
const fire = new Fire(fireCanvasWidth, 40, 'fireCanvas');
fire.init(false, true);
