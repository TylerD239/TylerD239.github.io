import units.Coordinates;
import js.Browser;


class UserControl {

    static public var mouseCoordinates:Coordinates;

    static private function mouseMove(evt){
        mouseCoordinates = {x: evt.offsetX, y: evt.offsetY};
    }
    static private function leftClick(evt){
        Game.instance.player.shoot({x: evt.offsetX, y: evt.offsetY},  Game.instance.bullets);
    }

    static private function rightClick(evt){
        evt.preventDefault();
        Game.instance.player.setPointToMove({x: evt.offsetX, y: evt.offsetY});
    }

    static public function init() {
        var canvas = Browser.document.querySelector('canvas');

        canvas.onmousemove = mouseMove;
        canvas.onclick = leftClick;
        canvas.oncontextmenu = rightClick;

    }


}