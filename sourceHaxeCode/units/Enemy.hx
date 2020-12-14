package units;

import js.Browser;
class Enemy extends Unit {

    private static var MOVE_SPEED = 3;
    public static var RADIUS = 40;
    public var killed:Bool;

    public function new(player) {
        super(MOVE_SPEED);

        var windowHeight = Browser.window.innerHeight;
        var windowWidth = Browser.window.innerWidth;

        var r = Math.floor(Math.random() * windowHeight);
        var r2 = Math.floor(Math.random() * windowWidth);

        if (Math.random() > 0.5) {
            r += windowHeight + 200;
        } else {
            r -= windowHeight + 200;
        }
        if (Math.random() > 0.5) {
            r2 += windowWidth + 50;
        } else {
            r2 -= windowWidth + 50;
        }

        coords = {x: r2, y: r};
        trace(coords);
        moveDone = false;
        killed = false;
        setPointToMove(player.coords);
    }

    public function ungroup(enemies:Array<Enemy>, index:Int) {

        if (index == enemies.length) return;

        for (i in (index + 1)...(enemies.length)){
            var dX = enemies[i].coords.x - coords.x;
            var dY = enemies[i].coords.y - coords.y;
            var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));

            if (distance != 0) {
                coords.x -= dX / Math.pow(distance, 3) * 3000 * speed;
                coords.y -= dY / Math.pow(distance, 3) * 3000 * speed;

            }
        }



    }

}