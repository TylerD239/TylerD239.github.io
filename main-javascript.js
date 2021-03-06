// Generated by Haxe 4.0.0-rc.3+e3df7a448
(function ($global) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); },$hxEnums = $hxEnums || {};
function $extend(from, fields) {
	var proto = Object.create(from);
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var units_Unit = function(speed) {
	this.rotationAngle = 0;
	this.moveAngle = 0;
	this.speed = speed;
};
units_Unit.__name__ = true;
units_Unit.prototype = {
	turn: function(target) {
		if(target == null) {
			return;
		}
		var dX = this.coords.x - target.x;
		var dY = this.coords.y - target.y;
		if(dX == 0) {
			if(dY != 0) {
				this.rotationAngle = dY / Math.abs(dY) * Math.PI / 2;
			}
		} else {
			this.rotationAngle = Math.atan2(dY,dX);
		}
	}
	,setPointToMove: function(target) {
		var dX = this.coords.x - target.x;
		var dY = this.coords.y - target.y;
		if(dX == 0) {
			if(dY != 0) {
				this.moveAngle = dY / Math.abs(dY) * Math.PI / 2;
			}
		} else {
			this.moveAngle = Math.atan2(dY,dX);
		}
		this.targetToMove = target;
	}
	,move: function() {
		if(Math.abs(this.coords.x - this.targetToMove.x) < this.speed * 2 && Math.abs(this.coords.y - this.targetToMove.y) < this.speed * 2) {
			this.moveDone = true;
		} else {
			this.moveDone = false;
		}
		if(!this.moveDone) {
			this.coords.x -= Math.cos(this.moveAngle) * this.speed;
			this.coords.y -= Math.sin(this.moveAngle) * this.speed;
		}
	}
};
var Bullet = function(direction,player) {
	units_Unit.call(this,Bullet.MOVE_SPEED);
	var x = -42;
	var y = 11;
	var x1 = x * Math.cos(player.rotationAngle) - y * Math.sin(player.rotationAngle);
	var y1 = x * Math.sin(player.rotationAngle) + y * Math.cos(player.rotationAngle);
	this.coords = { x : player.coords.x + x1, y : player.coords.y + y1};
	this.moveDone = false;
	var dX = direction.x - this.coords.x;
	var dY = direction.y - this.coords.y;
	var distance = Math.sqrt(Math.pow(dX,2) + Math.pow(dY,2));
	var coefficient = Bullet.MAX_DISTANCE / distance;
	units_Unit.prototype.turn.call(this,direction);
	this.setPointToMove({ x : this.coords.x + dX * coefficient, y : this.coords.y + dY * coefficient});
};
Bullet.__name__ = true;
Bullet.__super__ = units_Unit;
Bullet.prototype = $extend(units_Unit.prototype,{
});
var Exp = function(c) {
	this.coords = c;
	this.st = 0;
	this.done = false;
};
Exp.__name__ = true;
Exp.prototype = {
	step: function() {
		this.st++;
		if(this.st == Exp.scales.length - 1) {
			this.done = true;
		}
	}
	,getst: function() {
		return Exp.scales[this.st];
	}
};
var Game = function() {
	Game._instance = this;
	this.player = new units_Player();
	this.enemies = [];
	this.bullets = [];
	this.exps = [];
	var _g = 0;
	var _g1 = Game.COUNT_OF_ENEMIES;
	while(_g < _g1) {
		var i = _g++;
		this.enemies.push(new units_Enemy(this.player));
	}
};
Game.__name__ = true;
Game.get_instance = function() {
	var tmp = Game._instance == null;
	return Game._instance;
};
Game.prototype = {
	start: function() {
		var _gthis = this;
		var timer = new haxe_Timer(Game.DELAY);
		timer.run = function() {
			_gthis.player.turn(UserControl.mouseCoordinates);
			_gthis.player.move();
			if(Math.random() < 0.05) {
				_gthis.enemies.push(new units_Enemy(_gthis.player));
			}
			var _g = 0;
			var _g1 = _gthis.enemies.length;
			while(_g < _g1) {
				var i = _g++;
				_gthis.enemies[i].turn(_gthis.player.coords);
				_gthis.enemies[i].setPointToMove(_gthis.player.coords);
				_gthis.enemies[i].move();
				_gthis.enemies[i].ungroup(_gthis.enemies,i);
			}
			_gthis.bullets = _gthis.bullets.filter(function(bullet) {
				bullet.move();
				return !bullet.moveDone;
			});
			_gthis.enemies = _gthis.enemies.filter(function(enemy) {
				return !enemy.killed;
			});
			_gthis.bullets = _gthis.bullets.filter(function(bullet1) {
				var x = false;
				_gthis.enemies.map(function(enemy1) {
					var dX = enemy1.coords.x - bullet1.coords.x;
					var dY = enemy1.coords.y - bullet1.coords.y;
					if(Math.abs(dX) < 50 && Math.abs(dY) < 50) {
						enemy1.killed = true;
						_gthis.exps.push(new Exp(enemy1.coords));
						x = true;
					}
					return;
				});
				return !x;
			});
			_gthis.exps.filter(function(e) {
				e.step();
				return !e.done;
			});
		};
	}
};
var Main = function() {
	this.game = new Game();
	this.pixi = new pixi_PixiDrawer(this.game);
	this.game.start();
	UserControl.init();
};
Main.__name__ = true;
Main.main = function() {
	new Main();
};
Math.__name__ = true;
var UserControl = function() { };
UserControl.__name__ = true;
UserControl.mouseMove = function(evt) {
	UserControl.mouseCoordinates = { x : evt.offsetX, y : evt.offsetY};
};
UserControl.leftClick = function(evt) {
	Game.get_instance().player.shoot({ x : evt.offsetX, y : evt.offsetY},Game.get_instance().bullets);
};
UserControl.rightClick = function(evt) {
	evt.preventDefault();
	Game.get_instance().player.setPointToMove({ x : evt.offsetX, y : evt.offsetY});
};
UserControl.init = function() {
	var canvas = window.document.querySelector("canvas");
	canvas.onmousemove = UserControl.mouseMove;
	canvas.onclick = UserControl.leftClick;
	canvas.oncontextmenu = UserControl.rightClick;
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.prototype = {
	run: function() {
	}
};
var haxe_io_Bytes = function() { };
haxe_io_Bytes.__name__ = true;
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	if(Error.captureStackTrace) {
		Error.captureStackTrace(this,js__$Boot_HaxeError);
	}
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) {
		return "null";
	}
	if(s.length >= 5) {
		return "<...>";
	}
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) {
		t = "object";
	}
	switch(t) {
	case "function":
		return "<function>";
	case "object":
		if(o.__enum__) {
			var e = $hxEnums[o.__enum__];
			var n = e.__constructs__[o._hx_index];
			var con = e[n];
			if(con.__params__) {
				s += "\t";
				var tmp = n + "(";
				var _g = [];
				var _g1 = 0;
				var _g2 = con.__params__;
				while(_g1 < _g2.length) {
					var p = _g2[_g1];
					++_g1;
					_g.push(js_Boot.__string_rec(o[p],s));
				}
				return tmp + _g.join(",") + ")";
			} else {
				return n;
			}
		}
		if(((o) instanceof Array)) {
			var str = "[";
			s += "\t";
			var _g3 = 0;
			var _g11 = o.length;
			while(_g3 < _g11) {
				var i = _g3++;
				str += (i > 0 ? "," : "") + js_Boot.__string_rec(o[i],s);
			}
			str += "]";
			return str;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e1 ) {
			var e2 = ((e1) instanceof js__$Boot_HaxeError) ? e1.val : e1;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") {
				return s2;
			}
		}
		var str1 = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		var k = null;
		for( k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str1.length != 2) {
			str1 += ", \n";
		}
		str1 += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str1 += "\n" + s + "}";
		return str1;
	case "string":
		return o;
	default:
		return String(o);
	}
};
var pixi_PixiDrawer = function(game) {
	var _gthis = this;
	var options = { width : window.innerWidth, height : window.innerHeight, transparent : true, antialias : false};
	PIXI.Application.call(this,options);
	this.game = game;
	var playerTexture = PIXI.Texture.from("sources/player.png");
	this.playerSprite = new PIXI.Sprite(playerTexture);
	this.playerSprite.anchor.set(0.5);
	this.playerSprite.position.set(game.player.coords.x,game.player.coords.y);
	this.enemyTexture = PIXI.Texture.from("sources/enemy.png");
	this.bulletTexture = PIXI.Texture.from("sources/bullet.png");
	this.explosionTexture = PIXI.Texture.from("sources/explosion.png");
	this.stage.addChild(this.playerSprite);
	var container = new PIXI.Container();
	this.stage.addChild(container);
	this.ticker.add(function(delta) {
		_gthis.playerSprite.rotation = game.player.rotationAngle;
		_gthis.playerSprite.position.set(game.player.coords.x,game.player.coords.y);
		container.removeChildren();
		var _g = 0;
		var _g1 = game.enemies;
		while(_g < _g1.length) {
			var enemy = _g1[_g];
			++_g;
			var sprite = new PIXI.Sprite(_gthis.enemyTexture);
			sprite.anchor.set(0.5);
			sprite.rotation = enemy.rotationAngle;
			sprite.position.set(enemy.coords.x,enemy.coords.y);
			container.addChild(sprite);
		}
		var _g2 = 0;
		var _g3 = game.exps;
		while(_g2 < _g3.length) {
			var e = _g3[_g2];
			++_g2;
			var exp = new PIXI.Sprite(_gthis.explosionTexture);
			exp.position.set(e.coords.x,e.coords.y);
			exp.anchor.set(0.5);
			exp.scale.set(e.getst());
			exp.rotation = Math.random();
			container.addChild(exp);
		}
		game.bullets.map(function(bullet) {
			var sprite1 = new PIXI.Sprite(_gthis.bulletTexture);
			sprite1.anchor.set(0.5);
			sprite1.rotation = bullet.rotationAngle;
			sprite1.position.set(bullet.coords.x,bullet.coords.y);
			return container.addChild(sprite1);
		});
	});
	window.document.body.appendChild(this.view);
};
pixi_PixiDrawer.__name__ = true;
pixi_PixiDrawer.__super__ = PIXI.Application;
pixi_PixiDrawer.prototype = $extend(PIXI.Application.prototype,{
});
var units_Enemy = function(player) {
	units_Unit.call(this,units_Enemy.MOVE_SPEED);
	var windowHeight = window.innerHeight;
	var windowWidth = window.innerWidth;
	var r = Math.floor(Math.random() * windowHeight);
	var r2 = Math.floor(Math.random() * windowWidth);
	if(Math.random() > 0.5) {
		r += windowHeight + 200;
	} else {
		r -= windowHeight + 200;
	}
	if(Math.random() > 0.5) {
		r2 += windowWidth + 50;
	} else {
		r2 -= windowWidth + 50;
	}
	this.coords = { x : r2, y : r};
	console.log("units/Enemy.hx:31:",this.coords);
	this.moveDone = false;
	this.killed = false;
	this.setPointToMove(player.coords);
};
units_Enemy.__name__ = true;
units_Enemy.__super__ = units_Unit;
units_Enemy.prototype = $extend(units_Unit.prototype,{
	ungroup: function(enemies,index) {
		if(index == enemies.length) {
			return;
		}
		var _g = index + 1;
		var _g1 = enemies.length;
		while(_g < _g1) {
			var i = _g++;
			var dX = enemies[i].coords.x - this.coords.x;
			var dY = enemies[i].coords.y - this.coords.y;
			var distance = Math.sqrt(Math.pow(dX,2) + Math.pow(dY,2));
			if(distance != 0) {
				this.coords.x -= dX / Math.pow(distance,3) * 3000 * this.speed;
				this.coords.y -= dY / Math.pow(distance,3) * 3000 * this.speed;
			}
		}
	}
});
var units_Player = function() {
	units_Unit.call(this,units_Player.MOVE_SPEED);
	this.coords = { x : 300, y : 300};
	this.targetToMove = this.coords;
	this.moveDone = true;
};
units_Player.__name__ = true;
units_Player.__super__ = units_Unit;
units_Player.prototype = $extend(units_Unit.prototype,{
	shoot: function(direction,bullets) {
		bullets.push(new Bullet(direction,this));
	}
	,test: function() {
		console.log("units/Player.hx:23:","tested");
	}
});
String.__name__ = true;
Array.__name__ = true;
Object.defineProperty(js__$Boot_HaxeError.prototype,"message",{ get : function() {
	return String(this.val);
}});
js_Boot.__toStr = ({ }).toString;
Bullet.MAX_DISTANCE = 800;
Bullet.MOVE_SPEED = 20;
Exp.scales = [0.2,0.5,0.7,0.85,1,1,0.7,0.6];
Game.COUNT_OF_ENEMIES = 20;
Game.DELAY = 30;
units_Enemy.MOVE_SPEED = 3;
units_Enemy.RADIUS = 40;
units_Player.MOVE_SPEED = 7;
Main.main();
})({});
