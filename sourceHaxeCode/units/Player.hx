package units;

class Player extends Unit {

    static private var MOVE_SPEED = 7;

    public function new() {
        super(MOVE_SPEED);
        coords = {x: 300, y: 300};
        targetToMove = coords;
        moveDone = true;

    }
//
    public function shoot(direction:Coordinates, bullets:Array<Bullet>) {
//        trace(bullets);
        bullets.push(new Bullet(direction, this));
//        trace(this);
    }


    public function test() {
        trace('tested');
    }

}