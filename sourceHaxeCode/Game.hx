import units.Enemy;
import units.Player;
class Game {

    public var player:Player;
    public var enemies:Array<Enemy>;
    public var bullets:Array<Bullet>;
    public var expslosions:Array<Exp>;


    static private var COUNT_OF_ENEMIES = 20;
    static private var DELAY:Int = 30;
    public static var instance(get, never):Game;
    private static var _instance:Game;

    private static function get_instance():Game {
        if (_instance == null) {
        }
        return _instance;
    }

    public function new() {
        _instance = this;
        player = new Player();
        enemies = [];
        bullets = [];
        expslosions = [];
        for(i in 0...COUNT_OF_ENEMIES) {
            enemies.push(new Enemy(player));
        }

    }

    public function start() {
        var timer = new haxe.Timer(DELAY);
        timer.run = function() {
            
        player.turn(UserControl.mouseCoordinates);
        player.move();

        if (Math.random() < 0.05) enemies.push(new Enemy(player));




        for (i in 0...(enemies.length)) {
            enemies[i].turn(player.coords);
            enemies[i].setPointToMove(player.coords);
            enemies[i].move();
            enemies[i].ungroup(enemies, i);
        }

        bullets = bullets.filter((bullet) -> {
            bullet.move();
            return !bullet.moveDone;
        });


            enemies = enemies.filter((enemy) -> {
                !enemy.killed;
            });

         bullets = bullets.filter((bullet) -> {
             var hit = false;
                enemies.map((enemy) -> {
                    var dX = enemy.coords.x - bullet.coords.x;
                    var dY = enemy.coords.y - bullet.coords.y;
                    if (Math.abs(dX) < 50 && Math.abs(dY) < 50) {
                        enemy.killed = true;
                        expslosions.push(new Explosion(enemy.coords));
                        hit = true;
                    }
                });
             return !hit;
            });

            expslosions.filter((expslosion) -> {
                expslosion.step();
                !expslosion.done;
            });

        }
    }




}