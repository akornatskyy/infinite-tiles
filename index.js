import Game from './app/game';
import Screen from './app/screens/demo';

const canvas = document.body.appendChild(document.createElement('canvas'));
const game = new Game(canvas);

game.screen = new Screen(game);
game.start();
