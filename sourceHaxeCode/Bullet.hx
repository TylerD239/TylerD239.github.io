import units.Player;
import units.Coordinates;
import units.Unit;
import units.Enemy;


class Bullet extends Unit {

    static private var MAX_DISTANCE:Int = 800;
    static private var MOVE_SPEED:Int = 20;

    public function new(direction:Coordinates, player:Player) {

        super(MOVE_SPEED);

//        trace(player);
        var x = -42;
        var y = 11;
        var x1 = x * Math.cos(player.rotationAngle) - y * Math.sin(player.rotationAngle);
        var y1 = x * Math.sin(player.rotationAngle) + y * Math.cos(player.rotationAngle);


        coords = {x: player.coords.x + x1, y: player.coords.y + y1};
        moveDone = false;

        var dX = direction.x - coords.x;
        var dY = direction.y - coords.y;
        var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
        var coefficient = Bullet.MAX_DISTANCE / distance;

//        trace(distance, coefficient);

        super.turn(direction);
//        setPointToMove(direction);
        setPointToMove({x: coords.x + dX * coefficient, y: coords.y + dY * coefficient});

    }
//
//    public function hitCheck(enemies:Array<Enemy>) {
//
//        var dX = direction.x - coords.x;
////      var dY = direction.y - coords.y;
////      var distance = Math.sqrt(Math.pow(dX, 2) + Math.pow(dY, 2));
//
//    }


}