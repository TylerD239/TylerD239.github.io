
import units.Coordinates;
class Explosion {
    public var coords:Coordinates;
    public static var scales:Array<Float> = [0.2,0.5,0.7,0.85,1,1,0.7,0.6];
    public var done:Bool;
    private var stage:Int;

    public function new(coordinates:Coordinates) {
        coords = coordinates;
        stage = 0;
        done= false;
    }

    public function step() {
        stage++;
        if (stage == Explosion.scales.length - 1) done = true;
    }

    public function getStage() {
       return Explosion.scales[stage];
    }

}