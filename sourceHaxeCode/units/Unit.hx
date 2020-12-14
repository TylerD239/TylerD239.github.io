package units;


class Unit {

    public var coords: Coordinates;
    public var rotationAngle: Float;
    private var moveAngle: Float;
    public var targetToMove: Coordinates;
    public var speed: Float;
    public var moveDone: Bool;


    public function new(speed) {
        rotationAngle = 0;
        moveAngle = 0;
        this.speed = speed;
    }

    public function turn(target:Coordinates) {
        if (target == null) return;

        var dX = coords.x - target.x;
        var dY = coords.y - target.y;

        if (dX == 0) {
            if (dY != 0) {
                rotationAngle = (dY/Math.abs(dY)) * Math.PI / 2;
            }
        } else {
            rotationAngle = Math.atan2(dY , dX);

        }


    }

    public function setPointToMove(target:Coordinates) {

        var dX = coords.x - target.x;
        var dY = coords.y - target.y;

        if (dX == 0) {
            if (dY != 0) {
                moveAngle = (dY/Math.abs(dY)) * Math.PI / 2;
            }
        } else {
            moveAngle = Math.atan2(dY, dX);

        }
        targetToMove = target;
    }

    public function move() {

        if (Math.abs(coords.x - targetToMove.x) < speed * 2 && Math.abs(coords.y - targetToMove.y) < speed * 2 ) {
            moveDone = true;
        } else {
            moveDone = false;
        }
        if (!moveDone) {
            coords.x -= Math.cos(moveAngle) * speed;
            coords.y -= Math.sin(moveAngle) * speed;
        }

    }

}
