
import pixi.PixiDrawer;


class Main {
    public var pixi:PixiDrawer;
    public var game:Game;

    public function new () {
        game = new Game();
        pixi = new PixiDrawer(game);
        game.start();
        UserControl.init();
    }

    static function main() {
        new Main();
    }
}